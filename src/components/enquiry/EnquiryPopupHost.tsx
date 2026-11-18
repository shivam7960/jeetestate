"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import EnquiryModal from "./EnquiryModal";
import { projects } from "@/data/projects";
import { UTM_KEYS, type Interest } from "@/lib/lead";
import { POPUP_KEY as KEY } from "@/lib/attribution";

const DAY = 24 * 60 * 60 * 1000;

type Ctx = { interest?: Interest; project?: string; image?: string };

const store = {
  get: () => { try { return Number(localStorage.getItem(KEY) ?? 0); } catch { return 0; } },
  set: (ms: number) => { try { localStorage.setItem(KEY, String(Date.now() + ms)); } catch {} },
};

/** Works out what the visitor is looking at, so the lead says which project or category they were on. */
function contextFor(pathname: string): Ctx {
  const cat = pathname.match(/^\/projects\/(residential|commercial|pre-rented)\/?$/)?.[1];
  if (cat) return { interest: cat === "pre-rented" ? "Pre-rented" : cat === "commercial" ? "Commercial" : "Residential" };
  const slug = pathname.match(/^\/projects\/([^/]+)\/?$/)?.[1];
  const p = slug ? projects.find((x) => x.slug === slug) : undefined;
  if (p) return { project: p.name, image: p.gallery[0]?.src, interest: p.category === "pre-rented" ? "Pre-rented" : p.category === "commercial" ? "Commercial" : "Residential" };
  return {};
}

/** Mounted once in the layout. Opens the enquiry popup:
 *  - automatically, once per visit, after about 15 seconds, after scrolling half the page,
 *    or when a desktop visitor moves to leave the page;
 *  - any time a button calls openEnquiry() (see OpenEnquiryButton).
 *  Closing it keeps it away for a day. A submitted enquiry keeps it away for 30 days. */
export default function EnquiryPopupHost() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [ctx, setCtx] = useState<Ctx>({});

  const show = useCallback((extra?: Ctx) => {
    const next = { ...contextFor(window.location.pathname), ...extra };
    if (next.project && !next.image) next.image = projects.find((x) => x.name === next.project)?.gallery[0]?.src;
    setCtx(next);
    setOpen(true);
  }, []);

  // Remember campaign tags (utm_*, gclid, fbclid) for the whole visit.
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      const found: Record<string, string> = {};
      for (const k of UTM_KEYS) { const v = q.get(k); if (v) found[k] = v.slice(0, 100); }
      if (Object.keys(found).length) {
        const old = JSON.parse(sessionStorage.getItem("jec_utm") ?? "{}");
        sessionStorage.setItem("jec_utm", JSON.stringify({ ...old, ...found }));
      }
    } catch {}
  }, [pathname]);

  // Manual trigger from any button.
  useEffect(() => {
    const handler = (e: Event) => show((e as CustomEvent<Ctx>).detail ?? {});
    window.addEventListener("open-enquiry", handler);
    return () => window.removeEventListener("open-enquiry", handler);
  }, [show]);

  // Automatic trigger.
  useEffect(() => {
    if (pathname.startsWith("/contact")) return;
    if (Date.now() < store.get()) return;
    const start = Date.now();
    let fired = false;

    const cleanup = () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onLeave);
    };
    const fire = () => {
      if (fired) return;
      const a = document.activeElement;
      if (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) return; // never interrupt typing
      if (document.querySelector("dialog[open]")) return;
      fired = true;
      cleanup();
      show();
    };
    const onScroll = () => {
      const h = document.documentElement;
      if ((window.scrollY + window.innerHeight) / h.scrollHeight > 0.5) fire();
    };
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget && Date.now() - start > 8000) fire();
    };
    const timer = setTimeout(fire, 15000);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onLeave);
    return cleanup;
  }, [pathname, show]);

  if (!open) return null;
  return (
    <EnquiryModal
      defaultInterest={ctx.interest}
      project={ctx.project}
      image={ctx.image}
      onClose={(reason) => {
        store.set(reason === "submitted" ? 30 * DAY : DAY);
        setOpen(false);
      }}
    />
  );
}
