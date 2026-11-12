import type { EnquiryInput } from "@/types";

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (input.name.trim().length < 2) errors.name = "Enter your full name.";

  const digits = input.phone.replace(/[\s\-()]/g, "").replace(/^(\+91|91|0)/, "");
  if (!/^[6-9]\d{9}$/.test(digits)) {
    errors.phone = "Enter a valid 10-digit Indian mobile number.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (input.message.trim().length < 10) {
    errors.message = "Tell us a little more (at least 10 characters).";
  }
  return errors;
}

export function enquiryToText(input: EnquiryInput) {
  return [
    "New enquiry for JEET ESTATE CONSULTANT",
    `Name: ${input.name.trim()}`,
    `Phone: ${input.phone.trim()}`,
    `Email: ${input.email.trim()}`,
    `Interested in: ${input.project || "General enquiry"}`,
    `Message: ${input.message.trim()}`,
  ].join("\n");
}

/**
 * Integration point for a backend.
 * There is NO server storage yet, so this only prepares the enquiry for the
 * visitor to send themselves (WhatsApp / email). To store enquiries later, replace
 * the body with a Supabase insert, e.g.
 *   await supabase.from("enquiries").insert(input)
 * and return { delivered: true }.
 */
export async function submitEnquiry(
  input: EnquiryInput,
): Promise<{ delivered: false; text: string }> {
  return { delivered: false, text: enquiryToText(input) };
}
