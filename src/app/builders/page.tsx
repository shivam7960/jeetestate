import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import BuilderCard from "@/components/projects/BuilderCard";
import { builders } from "@/lib/data";

export const metadata: Metadata = {
  title: "Builders in Gurgaon",
  description: "Browse builders and developers active in Gurgaon and see every project each one offers.",
  alternates: { canonical: "/builders" },
};

export default function BuildersPage() {
  return (
    <>
      <PageHeader
        seed="builders-index"
        title="Builders"
        intro="Each builder page lists all of their projects across residential, commercial and pre-rented."
        crumbs={[{ label: "Home", href: "/" }, { label: "Builders" }]}
      />
      <section className="section-padding bg-ivory">
        <div className="container-width">
          <ul className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {builders.map((b) => (<li key={b.slug}><BuilderCard builder={b} /></li>))}
          </ul>
        </div>
      </section>
      <CTASection />
    </>
  );
}
