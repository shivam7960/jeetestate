import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import SectionHeading from "@/components/common/SectionHeading";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "JEET ESTATE CONSULTANT is a real estate consultancy for Gurgaon, Delhi NCR.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  { title: "Compare before you commit", text: "Every builder page shows every project they offer so options sit side by side." },
  { title: "Check the paperwork", text: "We point you to the approvals, agreements and lease terms worth verifying." },
  { title: "Stay with you", text: "One advisor from the first shortlist through documentation." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader seed="about" title="About JEET ESTATE CONSULTANT" intro={`A real estate consultancy serving buyers and investors in ${SITE.market}.`} crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
      <section className="section-padding bg-white">
        <div className="container-width grid gap-12 lg:grid-cols-2">
          <SectionHeading title="Who we are" />
          <div className="space-y-4 leading-relaxed text-charcoal">
            <p>We help people choose properties across residential, commercial and pre-rented categories, and we organise our work around builders so you can see everything a builder offers before you decide.</p>
            <p className="text-slate">Placeholder: add your founding story, years in business, team and registrations here. This site does not state any of these until you provide verified details.</p>
          </div>
        </div>
      </section>
      <section className="section-padding bg-ivory">
        <div className="container-width">
          <SectionHeading title="How we work" />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <li key={p.title} className="border border-mist bg-white p-7">
                <h3 className="font-display text-xl text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{p.text}</p>
              </li>
            ))}
          </ul>
          <Link href="/services" className="btn btn-ink mt-10">See our services</Link>
        </div>
      </section>
      <CTASection />
    </>
  );
}
