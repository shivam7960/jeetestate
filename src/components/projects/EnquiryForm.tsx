"use client";

import { useId, useRef, useState } from "react";
import { CheckCircle2, Mail, MessageCircle, AlertCircle } from "lucide-react";
import { projects } from "@/data/projects";
import { SITE } from "@/data/site";
import { mailtoHref, whatsappHref } from "@/lib/contact";
import { submitEnquiry, validateEnquiry, type EnquiryErrors } from "@/lib/enquiries";
import type { EnquiryInput } from "@/types";

type Status = "idle" | "submitting" | "ready" | "error";

const EMPTY: EnquiryInput = { name: "", phone: "", email: "", project: "", message: "" };

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
  const [values, setValues] = useState<EnquiryInput>({ ...EMPTY, project: defaultProject });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [prepared, setPrepared] = useState("");

  const set = (key: keyof EnquiryInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const result = await submitEnquiry(values);
      setPrepared(result.text);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }

  const dark = tone === "dark";
  const box = dark ? "bg-white/5 text-white border border-white/15" : "bg-white text-ink border border-mist";
  const label = `mb-1.5 block text-sm font-medium ${dark ? "text-white/90" : "text-charcoal"}`;
  const errorText = "mt-1.5 flex items-center gap-1.5 text-sm text-[#b42318]";

  if (status === "ready") {
    return (
      <div className={`p-6 sm:p-8 ${box}`} role="status">
        <CheckCircle2 className="text-gold" size={32} aria-hidden="true" />
        <h3 className="font-display mt-3 text-2xl">Your enquiry is ready to send</h3>
        <p className={`mt-3 text-sm leading-relaxed ${dark ? "text-white/80" : "text-slate"}`}>
          This website is not connected to a database yet, so your details have{" "}
          <strong>not been sent or saved</strong>. Send them to our team with one tap below.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a href={whatsappHref(prepared)} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
            <MessageCircle size={16} aria-hidden="true" /> Send on WhatsApp
          </a>
          <a href={mailtoHref(`Enquiry: ${values.project || "General"}`, prepared)} className={`btn ${dark ? "btn-outline" : "btn-outline-dark"}`}>
            <Mail size={16} aria-hidden="true" /> Send by email
          </a>
        </div>
        <button
          type="button"
          onClick={() => { setStatus("idle"); setValues({ ...EMPTY, project: defaultProject }); }}
          className="mt-5 text-sm underline underline-offset-4"
        >
          Start a new enquiry
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={`p-6 sm:p-8 ${box}`} aria-labelledby={`${uid}-title`}>
      <h3 id={`${uid}-title`} className="font-display text-2xl">{title}</h3>
      <p className={`mt-1 text-sm ${dark ? "text-white/70" : "text-slate"}`}>
        All fields except the project are required. Contact details: {SITE.phoneDisplay}.
      </p>

      {status === "error" && (
        <p role="alert" className="mt-4 flex items-start gap-2 border border-[#b42318] bg-[#fef3f2] p-3 text-sm text-[#b42318]">
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          Something went wrong while preparing your enquiry. Please try again, or call or WhatsApp us directly.
        </p>
      )}

      <div className="mt-5 space-y-4">
        {([
          ["name", "Full name", "text", "name"],
          ["phone", "Phone number", "tel", "tel"],
          ["email", "Email address", "email", "email"],
        ] as const).map(([key, text, type, ac]) => (
          <div key={key}>
            <label htmlFor={`${uid}-${key}`} className={label}>{text}</label>
            <input
              id={`${uid}-${key}`} name={key} type={type} autoComplete={ac}
              value={values[key]} onChange={set(key)}
              aria-invalid={Boolean(errors[key])}
              aria-describedby={errors[key] ? `${uid}-${key}-err` : undefined}
              className="field"
            />
            {errors[key] && <p id={`${uid}-${key}-err`} className={errorText}><AlertCircle size={14} aria-hidden="true" />{errors[key]}</p>}
          </div>
        ))}

        <div>
          <label htmlFor={`${uid}-project`} className={label}>Interested project (optional)</label>
          <select id={`${uid}-project`} name="project" value={values.project} onChange={set("project")} className="field">
            <option value="">General enquiry</option>
            {projects.map((p) => (<option key={p.slug} value={p.name}>{p.name}</option>))}
          </select>
        </div>

        <div>
          <label htmlFor={`${uid}-message`} className={label}>Message</label>
          <textarea
            id={`${uid}-message`} name="message" rows={4}
            value={values.message} onChange={set("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${uid}-message-err` : undefined}
            className="field"
          />
          {errors.message && <p id={`${uid}-message-err`} className={errorText}><AlertCircle size={14} aria-hidden="true" />{errors.message}</p>}
        </div>
      </div>

      <button type="submit" disabled={status === "submitting"} className="btn btn-gold mt-6 w-full disabled:opacity-60">
        {status === "submitting" ? "Preparing..." : "Prepare my enquiry"}
      </button>
    </form>
  );
}
