import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/data/site";
import { telHref, whatsappHref } from "@/lib/contact";

export default function CTASection({
  title = "Talk to an expert about your next property",
  text = "Share your budget, preferred location and purpose. We will suggest suitable projects and arrange visits.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-navy text-white">
      <div className="container-width flex flex-col items-start justify-between gap-8 py-16 lg:flex-row lg:items-center">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">{title}</h2>
          <p className="mt-3 text-white/75">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-gold">Send an enquiry</Link>
          <a href={telHref} className="btn btn-outline">
            <Phone size={16} aria-hidden="true" /> {SITE.phoneDisplay}
          </a>
          <a href={whatsappHref("Hello, I would like to talk to an expert.")} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <MessageCircle size={16} aria-hidden="true" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
