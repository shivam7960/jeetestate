import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import EnquiryForm from "@/components/projects/EnquiryForm";
import { SITE } from "@/data/site";
import { mailtoHref, telHref, whatsappHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Call, WhatsApp or send an enquiry to JEET ESTATE CONSULTANT.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader seed="contact" title="Contact Us" intro="Call, message or send an enquiry." crumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />
      <section className="section-padding bg-ivory">
        <div className="container-width grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-ink">Reach us directly</h2>
            <ul className="mt-8 space-y-4">
              <li><a href={telHref} className="btn btn-gold w-full justify-start sm:w-auto"><Phone size={18} aria-hidden="true" />Call {SITE.phoneDisplay}</a></li>
              <li><a href={whatsappHref("Hello, I would like to know more about your properties.")} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark w-full justify-start sm:w-auto"><MessageCircle size={18} aria-hidden="true" />WhatsApp us</a></li>
              <li><a href={mailtoHref("Enquiry", "")} className="btn btn-outline-dark w-full justify-start sm:w-auto"><Mail size={18} aria-hidden="true" />{SITE.email}</a></li>
            </ul>
            <p className="mt-8 text-sm text-slate">Office: {SITE.market}. Full address to be added.</p>
            {SITE.contactIsPlaceholder && (
              <p className="mt-4 border-l-2 border-gold pl-4 text-sm text-slate">
                The phone, WhatsApp and email shown are placeholders until real details are set in the environment variables.
              </p>
            )}
          </div>
          <EnquiryForm title="Send an enquiry" />
        </div>
      </section>
    </>
  );
}
