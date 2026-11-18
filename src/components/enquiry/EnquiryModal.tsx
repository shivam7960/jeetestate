"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AlertCircle, ArrowRight, Building2, Check, CheckCircle2, Loader2, Lock, MessageCircle, Phone, ShieldCheck, X } from "lucide-react";
import type { CountryCode } from "libphonenumber-js/min";
import PhoneField from "./PhoneField";
import { builders } from "@/data/builders";
import { SITE } from "@/data/site";
import { telHref, whatsappHref } from "@/lib/contact";
import { readAttribution } from "@/lib/attribution";
import { INTERESTS, validateLeadFields, type Interest, type LeadErrors } from "@/lib/lead";
import { COUNTRIES } from "@/lib/phone";

type Status = "idle" | "sending" | "done" | "failed";

export default function EnquiryModal({
  defaultInterest = "Not sure",
  project,
  image,
  onClose,
}: {
  defaultInterest?: Interest;
  project?: string;
  /** Photo of the project the visitor is viewing (shown on the left panel). */
  image?: string;
  onClose: (reason: "dismissed" | "submitted") => void;
}) {
  const uid = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const tickRef = useRef<HTMLDivElement>(null);
  const openedAt = useRef(0);
  const submitted = useRef(false);

  const [name, setName] = useState("");
  const [country, setCountry] = useState<CountryCode>("IN");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState<Interest>(defaultInterest);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  // Native modal dialog: focus trap, Esc to close and an inert background come built in.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    openedAt.current = Date.now();
    if (!dialog.open) dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      // Phones: slides up like a bottom sheet. Desktop: rises and fades in.
      dialog.animate?.(
        [
          { opacity: desktop ? 0 : 1, transform: desktop ? "translateY(18px) scale(.97)" : "translateY(100%)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: desktop ? 380 : 420, easing: "cubic-bezier(.2,.8,.2,1)" },
      );
      try {
        dialog.animate?.([{ opacity: 0 }, { opacity: 1 }], { duration: 300, pseudoElement: "::backdrop" });
      } catch {}
    }
    // Only pop the keyboard up automatically on desktop. On phones it would hide the form.
    if (window.matchMedia("(pointer: fine)").matches) nameRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  // A small "pop" on the tick when the enquiry goes through.
  useEffect(() => {
    if (status !== "done" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    tickRef.current?.animate?.(
      [
        { transform: "scale(.4)", opacity: 0 },
        { transform: "scale(1.12)", opacity: 1, offset: 0.65 },
        { transform: "scale(1)", opacity: 1 },
      ],
      { duration: 520, easing: "cubic-bezier(.2,.8,.2,1)" },
    );
  }, [status]);

  const close = () => onClose(submitted.current ? "submitted" : "dismissed");

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
          interest,
          project,
          page: window.location.pathname,
          referrer: document.referrer || undefined,
          utm: readAttribution(),
          elapsedMs: Date.now() - openedAt.current,
          company_website: honeypot,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      submitted.current = true;
      setStatus("done");
    } catch {
      setStatus("failed");
    }
  }

  const dial = COUNTRIES.find((c) => c.code === country)?.dial ?? "91";
  const firstName = name.trim().split(/\s+/)[0] ?? "";
  const interestText = interest === "Not sure" ? "a property" : `${interest.toLowerCase()} properties`;
  const waMessage = project
    ? `Hello, I’m ${name.trim() || "interested"}. I would like price details for ${project}. Please call me on +${dial} ${phone}.`
    : `Hello, I’m ${name.trim() || "interested in a property"}. Please call me on +${dial} ${phone}. I’m looking for ${interestText}.`;

  const heading = project
    ? `Price & details for ${project}`
    : defaultInterest !== "Not sure"
      ? `Find your ${defaultInterest.toLowerCase()} property`
      : "Find your property";
  const intro = project
    ? "Share your number and our advisor will call you with price, availability and site visit options."
    : "Tell us what you are looking for. Our advisor will call you with options that fit.";
  const cta = project ? "Get price details" : "Request a call back";

  const errorText = "mt-1.5 flex items-center gap-1.5 text-[13px] text-[#b42318]";
  const label = "mb-1.5 block text-[13px] font-medium tracking-wide text-charcoal";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${uid}-title`}
      onClose={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) dialogRef.current?.close();
      }}
      className="m-0 mt-auto w-full max-w-none border-0 bg-transparent p-0 text-ink backdrop:bg-ink/70 backdrop:backdrop-blur-[3px] md:m-auto md:w-[calc(100%-2rem)] md:max-w-[56rem]"
    >
      <div className="relative flex max-h-[92dvh] flex-col overflow-hidden bg-white shadow-[0_30px_80px_-20px_rgba(15,27,42,0.55)] max-md:rounded-t-2xl md:max-h-[90dvh] md:flex-row">
        {/* gold hairline on top */}
        <div className="absolute inset-x-0 top-0 z-20 h-[3px] bg-gradient-to-r from-gold via-[#ead7a8] to-gold" aria-hidden="true" />
        {/* grab handle (phones) */}
        <div className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-mist md:hidden" aria-hidden="true" />

        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close"
          className="absolute right-3 top-3.5 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate shadow-sm transition hover:bg-ivory hover:text-ink md:right-4 md:top-4"
        >
          <X size={20} aria-hidden="true" />
        </button>

        {/* ---------- Left panel (tablet and desktop) ---------- */}
        <aside className="relative hidden w-[40%] shrink-0 flex-col justify-between overflow-hidden bg-ink p-9 text-white md:flex">
          {image ? (
            <>
              <Image src={image} alt="" fill sizes="340px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/45" aria-hidden="true" />
            </>
          ) : (
            <>
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-gold/30" aria-hidden="true" />
              <div className="absolute -bottom-28 -left-12 h-72 w-72 rounded-full border border-gold/20" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-br from-navy/60 via-ink to-ink" aria-hidden="true" />
            </>
          )}
          <div className="relative">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">{project ? "You are viewing" : SITE.shortName}</p>
            <p className="font-display mt-4 text-[1.9rem] leading-[1.15]">{project ?? "Your next address in Gurgaon starts here."}</p>
            <span className="mt-5 block h-px w-12 bg-gold" aria-hidden="true" />
          </div>
          <ul className="relative mt-10 space-y-4 text-sm text-white/90">
            <li className="flex gap-3">
              <ShieldCheck size={19} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              Free, no-obligation guidance
            </li>
            <li className="flex gap-3">
              <Building2 size={19} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              {builders.length} builders, one conversation
            </li>
            <li className="flex gap-3">
              <Phone size={19} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              Call or WhatsApp, whichever you prefer
            </li>
          </ul>
        </aside>

        {/* ---------- Right panel ---------- */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          {status === "done" ? (
            <div role="status" className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-10 text-center sm:px-10">
              <div ref={tickRef} className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/15">
                <CheckCircle2 size={46} className="text-gold-deep" aria-hidden="true" />
              </div>
              <h2 id={`${uid}-title`} className="font-display mt-5 text-3xl leading-tight">
                Thank you{firstName ? `, ${firstName}` : ""}!
              </h2>
              <p className="mt-2 max-w-sm text-slate">We have your details and will call you on +{dial} {phone} shortly.</p>
              <ol className="mt-6 w-full max-w-sm space-y-3 text-left text-sm text-charcoal">
                {["Our advisor calls you to understand what you need", "We share projects that fit your budget and location", "We arrange visits for the ones you like"].map((t, i) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-gold">{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ol>
              <a href={whatsappHref(waMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-7 w-full max-w-sm">
                <MessageCircle size={16} aria-hidden="true" /> Chat on WhatsApp now
              </a>
              <button type="button" onClick={() => dialogRef.current?.close()} className="mt-4 text-sm text-slate underline underline-offset-4">
                Close
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate className="relative flex min-h-0 flex-1 flex-col">
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-4 pt-4 sm:px-9 md:px-10 md:pt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-deep">Free callback</p>
                <h2 id={`${uid}-title`} className="font-display mt-2 pr-10 text-[1.6rem] leading-tight sm:text-3xl md:pr-8">
                  {project ? (
                    <>
                      <span className="md:hidden">{heading}</span>
                      <span className="hidden md:inline">Get price & details</span>
                    </>
                  ) : (
                    heading
                  )}
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{intro}</p>

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
                        <Phone size={15} aria-hidden="true" /> Call us
                      </a>
                    </div>
                  </div>
                )}

                {/* Honeypot: hidden from people, bots fill it in. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Company website
                    <input type="text" name="company_website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                  </label>
                </div>

                <div className="mt-5 space-y-3.5">
                  <div>
                    <label htmlFor={`${uid}-name`} className={label}>Full name <span className="text-[#b42318]">*</span></label>
                    <input
                      ref={nameRef}
                      id={`${uid}-name`}
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((x) => ({ ...x, name: undefined })); }}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                      className="field text-base"
                    />
                    {errors.name && <p id={`${uid}-name-err`} className={errorText}><AlertCircle size={14} aria-hidden="true" />{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor={`${uid}-phone`} className={label}>Mobile number <span className="text-[#b42318]">*</span></label>
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


                  <div role="radiogroup" aria-label="I am looking for">
                    <p className={label}>I am looking for</p>
                    <div className="flex flex-wrap gap-2">
                      {INTERESTS.map((opt) => {
                        const on = interest === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            role="radio"
                            aria-checked={on}
                            onClick={() => setInterest(opt)}
                            className={`flex items-center gap-1.5 rounded-sm border px-3.5 py-2.5 text-sm transition-all duration-200 ${
                              on ? "border-ink bg-ink text-white shadow-sm" : "border-mist bg-white text-charcoal hover:border-gold"
                            }`}
                          >
                            {on && <Check size={14} className="text-gold" aria-hidden="true" />}
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action bar stays visible while the keyboard is open on phones */}
              <div className="shrink-0 border-t border-mist bg-white px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3.5 sm:px-9 md:px-10 md:pb-6">
                <button type="submit" disabled={status === "sending"} className="btn btn-gold group w-full !min-h-14 text-[15px] disabled:opacity-70">
                  {status === "sending" ? (
                    <><Loader2 size={18} className="animate-spin" aria-hidden="true" /> Sending...</>
                  ) : (
                    <>{cta} <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" /></>
                  )}
                </button>
                <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-slate">
                  <Lock size={13} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
                  <span>
                    Your details stay private. By submitting, you agree that {SITE.name} may contact you by call, SMS or WhatsApp about your enquiry.
                  </span>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
}
