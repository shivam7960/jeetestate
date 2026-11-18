import { NextResponse } from "next/server";
import { INTERESTS, UTM_KEYS, validateLeadFields, type Interest } from "@/lib/lead";
import { isCountryCode, toE164 } from "@/lib/phone";

/** Where leads go. Set at least one of these in .env.local (and on Vercel):
 *  1) LEAD_WEBHOOK_URL (+ optional LEAD_WEBHOOK_SECRET): a Google Sheet or CRM webhook.
 *  2) RESEND_API_KEY + LEAD_TO_EMAIL (+ optional LEAD_FROM_EMAIL): an email for every lead. */

const hits = new Map<string, number[]>();
/** Best effort: 5 submissions per 10 minutes per IP (per server instance). */
function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

type Lead = {
  submittedAt: string;
  name: string;
  phone: string;
  country: string;
  email: string;
  message: string;
  interest: Interest;
  project: string;
  page: string;
  referrer: string;
  utm: Record<string, string>;
};

async function sendToWebhook(lead: Lead) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return null;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ ...lead, secret: process.env.LEAD_WEBHOOK_SECRET ?? "" }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`webhook ${res.status}`);
  // The Google Sheet script answers {"ok":false} (still HTTP 200) when the secret is wrong.
  const text = await res.text();
  try {
    if (JSON.parse(text)?.ok === false) throw new Error("webhook rejected the lead (check LEAD_WEBHOOK_SECRET)");
  } catch (e) {
    if (e instanceof Error && e.message.startsWith("webhook rejected")) throw e;
  }
  return true;
}

async function sendEmail(lead: Lead) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  if (!key || !to) return null;
  const lines = [
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email || "-"}`,
    `Interested in: ${lead.interest}`,
    `Message: ${lead.message || "-"}`,
    `Project: ${lead.project || "-"}`,
    `Page: ${lead.page}`,
    `Came from: ${lead.referrer || "-"}`,
    ...Object.entries(lead.utm).map(([k, v]) => `${k}: ${v}`),
    `Time (IST): ${lead.submittedAt}`,
  ];
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL ?? "Website Leads <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      subject: `New lead: ${lead.name} (${lead.interest})`,
      text: lines.join("\n"),
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`resend ${res.status}`);
  return true;
}

export async function POST(req: Request) {
  // Only accept submissions that come from this website.
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Bots fill the hidden field or submit instantly. Pretend it worked and drop it.
  if (clip(body.company_website, 200) || Number(body.elapsedMs) < 1200) {
    return NextResponse.json({ ok: true });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (tooMany(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const name = clip(body.name, 80);
  const email = clip(body.email, 120);
  const phoneRaw = clip(body.phone, 30);
  const country = body.country;
  if (!isCountryCode(country)) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const errors = validateLeadFields({ name, phone: phoneRaw, country, email });
  const e164 = toE164(phoneRaw, country);
  if (Object.keys(errors).length > 0 || !e164) {
    return NextResponse.json({ error: "invalid", fields: errors }, { status: 400 });
  }

  const interest = INTERESTS.includes(body.interest as Interest) ? (body.interest as Interest) : "Not sure";
  const utmIn = (body.utm && typeof body.utm === "object" ? body.utm : {}) as Record<string, unknown>;
  const utm: Record<string, string> = {};
  for (const k of UTM_KEYS) if (clip(utmIn[k], 100)) utm[k] = clip(utmIn[k], 100);

  const lead: Lead = {
    submittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    name,
    phone: e164,
    country,
    email,
    message: clip(body.message, 500),
    interest,
    project: clip(body.project, 120),
    page: clip(body.page, 200),
    referrer: clip(body.referrer, 300),
    utm,
  };

  const configured = Boolean(process.env.LEAD_WEBHOOK_URL) || Boolean(process.env.RESEND_API_KEY && process.env.LEAD_TO_EMAIL);
  if (!configured) {
    console.error("[lead] No destination set. Add LEAD_WEBHOOK_URL or RESEND_API_KEY + LEAD_TO_EMAIL.");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const results = await Promise.allSettled([sendToWebhook(lead), sendEmail(lead)]);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value === true);
  if (!delivered) {
    console.error("[lead] Delivery failed", results.map((r) => (r.status === "rejected" ? String(r.reason) : "skipped")));
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
