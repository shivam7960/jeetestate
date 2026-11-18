import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import { InsightCard } from "@/components/home/LatestInsights";
import { insights } from "@/lib/data";

export const metadata: Metadata = {
  title: "Insights",
  description: "Guides for buyers and investors in Gurgaon real estate.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <PageHeader seed="insights-index" title="Insights" intro="Plain-language guides for buyers and investors." crumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]} />
      <section className="section-padding bg-ivory">
        <div className="container-width">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {insights.map((i) => (<li key={i.slug}><InsightCard insight={i} /></li>))}
          </ul>
        </div>
      </section>
      <CTASection />
    </>
  );
}