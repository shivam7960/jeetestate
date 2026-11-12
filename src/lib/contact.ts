import { SITE } from "@/data/site";

export const telHref = `tel:${SITE.phoneTel}`;

export function whatsappHref(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${SITE.whatsapp}${text}`;
}

export function mailtoHref(subject: string, body: string) {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
