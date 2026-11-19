import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { CATEGORIES, SITE } from "@/data/site";
import { mailtoHref, telHref, whatsappHref } from "@/lib/contact";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/75">
      <div className="container-width grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center" aria-label="JEET ESTATE CONSULTANT home">
  <Image
    src="/logo-v2.png"
    alt="JEET ESTATE CONSULTANT"
    width={200}
    height={64}
    priority
    className="h-12 w-auto sm:h-14"
  />
</Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Property advisory for residential, commercial and pre-rented real estate in {SITE.market}.
          </p>
        </div>

        <div>
          <h2 className="font-display text-lg text-white">Projects</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}><Link href={`/projects/${c.slug}`} className="hover:text-gold">{c.name}</Link></li>
            ))}
            <li><Link href="/builders" className="hover:text-gold">Builders</Link></li>
            <li><Link href="/locations" className="hover:text-gold">Locations</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg text-white">Company</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link href="/services" className="hover:text-gold">Services</Link></li>
            <li><Link href="/insights" className="hover:text-gold">Insights</Link></li>
            <li><Link href="/contact" className="hover:text-gold">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg text-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href={telHref} className="flex items-center gap-2 hover:text-gold"><Phone size={15} aria-hidden="true" />{SITE.phoneDisplay}</a></li>
            <li><a href={whatsappHref("Hello, I would like to know more about your properties.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold"><MessageCircle size={15} aria-hidden="true" />WhatsApp</a></li>
            <li><a href={mailtoHref("Enquiry", "")} className="flex items-center gap-2 hover:text-gold"><Mail size={15} aria-hidden="true" />{SITE.email}</a></li>
          </ul>
        </div>
      </div>

        <div className="border-t border-white/10">
        <div className="container-width flex flex-col gap-3 py-6 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p>© 2026 {SITE.name}. All rights reserved.</p>
            {process.env.NEXT_PUBLIC_RERA_NUMBER && (
              <p>Haryana RERA registration no.: {process.env.NEXT_PUBLIC_RERA_NUMBER}</p>
            )}
            {SITE.sampleData && (
              <p className="max-w-xl">
                Builders, projects, prices, testimonials and contact details on this site are sample placeholders and
                are not real offers. Replace them before launch.
              </p>
            )}
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link href="/privacy-policy" className="hover:text-gold">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-gold">Terms of Use</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}