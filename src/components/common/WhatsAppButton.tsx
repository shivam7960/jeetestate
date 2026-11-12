import { MessageCircle, Phone } from "lucide-react";
import { telHref, whatsappHref } from "@/lib/contact";

/** Floating contact buttons: WhatsApp and click-to-call. */
export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={telHref}
        aria-label="Call JEET ESTATE CONSULTANT"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-gold shadow-lg ring-1 ring-gold/50 transition hover:bg-navy"
      >
        <Phone size={20} aria-hidden="true" />
      </a>
      <a
        href={whatsappHref("Hello, I would like to know more about your properties.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1fa855] text-white shadow-lg transition hover:bg-[#188a45]"
      >
        <MessageCircle size={26} aria-hidden="true" />
      </a>
    </div>
  );
}
