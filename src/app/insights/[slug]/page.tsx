import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import CTASection from "@/components/common/CTASection";
import { getInsight, insights } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(props: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const i = getInsight(slug);
  if (!i) return {};
  return { title: i.title, description: i.excerpt, alternates: { canonical: `/insights/${slug}` } };
}

export default async function InsightPage(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  return (
    <>
      <article className="container-width max-w-3xl py-14">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }, { label: insight.title }]} />
        <p className="mt-8 text-sm text-gold-deep">{insight.category}</p>
        <h1 className="font-display mt-2 text-4xl leading-tight text-ink sm:text-5xl">{insight.title}</h1>
        <p className="mt-4 text-sm text-slate">{formatDate(insight.date)} · {insight.readMinutes} min read · Sample article</p>
        <div className="mt-10 space-y-6 text-lg leading-[1.8] text-charcoal">
          {insight.body.map((para) => (<p key={para.slice(0, 24)}>{para}</p>))}
        </div>
        <p className="mt-10 border-t border-mist pt-6 text-sm text-slate">
          General guidance only. It is not legal or financial advice. <Link href="/contact" className="text-gold-deep underline underline-offset-4">Talk to an expert</Link> about your situation.
        </p>
      </article>
      <CTASection />
    </>
  );
}
