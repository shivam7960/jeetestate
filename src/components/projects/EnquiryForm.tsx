"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Lock, MessageCircle, Phone } from "lucide-react";
import type { CountryCode } from "libphonenumber-js/min";
import PhoneField from "@/components/enquiry/PhoneField";
import { projects } from "@/data/projects";
import { SITE } from "@/data/site";
import { telHref, whatsappHref } from "@/lib/contact";
import { readAttribution, snoozePopup } from "@/lib/attribution";
import { validateLeadFields, type Interest, type LeadErrors } from "@/lib/lead";
import { COUNTRIES } from "@/lib/phone";

type Status = "idle" | "sending" | "done" | "failed";

function interestFor(projectName: string): Interest {
  const p = projects.find((x) => x.name === projectName);
  if (!p) return "Not sure";
  return p.category === "pre-rented" ? "Pre-rented" : p.category === "commercial" ? "Commercial" : "Residential";
}

/** Sidebar / section enquiry form. Sends the lead to /api/lead, the same place the popup does. */
export default function EnquiryForm({
  defaultProject = "",
  title = "Enquire about this property",
  tone = "light",
}: {
  defaultProject?: string;
  title?: string;
  tone?: "light" | "dark";
}) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const mountedAt = useRef(0);
  const [name, setName] = useState("");
  const [country, setCountry] = useState<CountryCode>("IN");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateLeadFields({ name, phone, country });
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone,
          country,
          message: message.trim() || undefined,
          interest: interestFor(defaultProject),
          project: defaultProject || undefined,
          page: window.location.pathname,
          referrer: document.referrer || undefined,
          utm: readAttribution(),
          elapsedMs: Date.now() - mountedAt.current,
          company_website: honeypot,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      snoozePopup(30 * 24 * 60 * 60 * 1000); // they already enquired, so no popup for 30 days
      setStatus("done");
    } catch {
      setStatus("failed");
    }
  }

  const dark = tone === "dark";
  const dial = COUNTRIES.find((c) => c.code === country)?.dial ?? "91";
  const firstName = name.trim().split(/\s+/)[0] ?? "";
  const waMessage = `Hello, I’m ${name.trim() || "interested"}.${defaultProject ? ` I would like details for ${defaultProject}.` : ""} Please call me on +${dial} ${phone}.`;
  const box = dark ? "bg-white/5 text-white border border-white/15" : "bg-white text-ink border border-mist";
  const label = `mb-1.5 block text-[13px] font-medium tracking-wide ${dark ? "text-white/90" : "text-charcoal"}`;
  const errorText = `mt-1.5 flex items-center gap-1.5 text-[13px] ${dark ? "text-[#fda29b]" : "text-[#b42318]"}`;
  const soft = dark ? "text-white/75" : "text-slate";

  if (status === "done") {
    return (
      <div className={`p-6 sm:p-8 ${box}`} role="status">
        <CheckCircle2 className="text-gold" size={40} aria-hidden="true" />
        <h3 className="font-display mt-3 text-2xl">Thank you{firstName ? `, ${firstName}` : ""}!</h3>
        <p className={`mt-2 text-sm leading-relaxed ${soft}`}>
          We have your details and will call you on +{dial} {phone} shortly.
        </p>
        <a href={whatsappHref(waMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-5 w-full">
          <MessageCircle size={16} aria-hidden="true" /> Chat on WhatsApp now
        </a>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={`relative p-6 sm:p-8 ${box}`} aria-labelledby={`${uid}-title`}>
      <h2 id={`${uid}-title`} className="font-display text-2xl">{title}</h2>
      <p className={`mt-1.5 text-sm ${soft}`}>Leave your number and our advisor will call you.</p>

      {status === "failed" && (
        <div role="alert" className="mt-4 border border-[#b42318] bg-[#fef3f2] p-3 text-sm text-[#b42318]">
          <p className="flex items-start gap-2">
            <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            We could not send your details just now. Please try again, or reach us directly:
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a href={whatsappHref(waMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-gold !py-2 !text-sm">
              <MessageCircle size={15} aria-hidden="true" /> WhatsApp
            </a>
            <a href={telHref} className="btn btn-outline-dark !py-2 !text-sm">
              <Phone size={15} aria-hidden="true" /> {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      )}

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor={`${uid}-name`} className={label}>Full name <span className="text-[#f04438]">*</span></label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((x) => ({ ...x, name: undefined })); }}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${uid}-name-err` : undefined}
            className="field text-base !text-ink"
          />
          {errors.name && <p id={`${uid}-name-err`} className={errorText}><AlertCircle size={14} aria-hidden="true" />{errors.name}</p>}
        </div>

        <div>
          <label htmlFor={`${uid}-phone`} className={label}>Mobile number <span className="text-[#f04438]">*</span></label>
          <PhoneField
            id={`${uid}-phone`}
            country={country}
            onCountryChange={setCountry}
            value={phone}
            onValueChange={(v) => { setPhone(v); if (errors.phone) setErrors((x) => ({ ...x, phone: undefined })); }}
            invalid={Boolean(errors.phone)}
            describedBy={errors.phone ? `${uid}-phone-err` : undefined}
          />
          {errors.phone && <p id={`${uid}-phone-err`} className={errorText}><AlertCircle size={14} aria-hidden="true" />{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor={`${uid}-message`} className={label}>Message <span className={`font-normal ${soft}`}>(optional)</span></label>
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={3}
            maxLength={500}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Budget, preferred location, anything you want us to know"
            className="field resize-y text-base !text-ink"
          />
        </div>
      </div>

      <button type="submit" disabled={status === "sending"} className="btn btn-gold group mt-6 w-full !min-h-14 text-[15px] disabled:opacity-70">
        {status === "sending" ? (
          <><Loader2 size={18} className="animate-spin" aria-hidden="true" /> Sending...</>
        ) : (
          <>Request a call back <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" /></>
        )}
      </button>
      <p className={`mt-3 flex items-start gap-2 text-xs leading-relaxed ${soft}`}>
        <Lock size={13} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
        <span>Your details stay private. By submitting, you agree that {SITE.name} may contact you about your enquiry.</span>
      </p>
    </form>
  );
}
