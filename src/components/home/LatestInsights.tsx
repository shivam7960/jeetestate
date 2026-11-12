import Link from "next/link";
import SectionHeading from "@/components/common/SectionHeading";
import { insights } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export function InsightCard({ insight }: { insight: (typeof insights)[number] }) {
  return (
    <article className="flex h-full flex-col border border-mist bg-white p-6 transition-shadow hover:shadow-xl">
      <p className="text-sm text-gold-deep">{insight.category}</p>
      <h3 className="font-display mt-2 text-xl leading-snug text-ink">
        <Link href={`/insights/${insight.slug}`} className="hover:text-gold-deep">{insight.title}</Link>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate">{insight.excerpt}</p>
      <p className="mt-auto pt-5 text-xs text-slate">{formatDate(insight.date)} · {insight.readMinutes} min read</p>
    </article>
  );
}

export default function LatestInsights() {
  return (
    <section className="section-padding bg-ivory">
      <div className="container-width">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading title="Insights" intro="Plain-language guides for buyers and investors." />
          <Link href="/insights" className="btn btn-outline-dark self-start sm:self-auto">All insights</Link>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {insights.slice(0, 3).map((i) => (<li key={i.slug}><InsightCard insight={i} /></li>))}
        </ul>
      </div>
    </section>
  );
}
