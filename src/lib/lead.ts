import type { CountryCode } from "libphonenumber-js/min";
import { toE164 } from "./phone";

export const INTERESTS = ["Residential", "Commercial", "Pre-rented", "Not sure"] as const;
export type Interest = (typeof INTERESTS)[number];

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;

export type LeadPayload = {
  name: string;
  phone: string;
  country: CountryCode;
  email?: string;
  /** Optional note from the visitor (sidebar form). */
  message?: string;
  interest: Interest;
  project?: string;
  page: string;
  referrer?: string;
  utm?: Record<string, string>;
  /** Milliseconds between the popup opening and the submit (bots are instant). */
  elapsedMs: number;
  /** Honeypot: real people never fill this in. */
  company_website?: string;
};

export type LeadErrors = { name?: string; phone?: string; email?: string };

const NAME_RE = /^[\p{L}][\p{L}\p{M}\s.'’-]{1,79}$/u;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Runs in the browser (instant feedback) and again on the server (the real check). */
export function validateLeadFields(v: { name: string; phone: string; country: CountryCode; email?: string }): LeadErrors {
  const errors: LeadErrors = {};
  if (!NAME_RE.test(v.name.trim())) errors.name = "Please enter your full name";
  if (!toE164(v.phone, v.country)) errors.phone = "Please enter a valid mobile number";
  const email = (v.email ?? "").trim();
  if (email && (email.length > 120 || !EMAIL_RE.test(email))) errors.email = "Please enter a valid email address";
  return errors;
}
