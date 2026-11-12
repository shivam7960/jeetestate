import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import ServiceIcon from "@/components/common/ServiceIcon";
import { SERVICES } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Property search, due diligence, pre-rented advisory, investment guidance and closing support in Gurgaon.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader seed="services" title="Services" intro="Support from the first shortlist to possession." crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]} />
      <section className="section-padding bg-ivory">
        <div className="container-width">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <li key={s.title} className="border border-mist bg-white p-7">
                <ServiceIcon name={s.icon} />
                <h2 className="font-display mt-4 text-xl text-ink">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate">{s.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTASection />
    </>
  );
}
