import Link from "next/link";
import { MapPin } from "lucide-react";
import BuilderLogo from "@/components/common/BuilderLogo";
import { Media } from "@/components/common/PropertyVisual";
import { CATEGORIES } from "@/data/site";
import { builderCategories, projectsByBuilder } from "@/lib/data";
import type { Builder, CategorySlug } from "@/types";

export default function BuilderCard({
  builder,
  category,
  count,
}: {
  builder: Builder;
  /** When shown inside a category, the builder page opens at that category's projects. */
  category?: CategorySlug;
  count?: number;
}) {
  const total = projectsByBuilder(builder.slug).length;
  const cats = builderCategories(builder.slug);
  const href = `/builders/${builder.slug}${category ? `#${category}` : ""}`;
  const shown = count ?? total;

  return (
    <article className="flex h-full flex-col border border-mist bg-white transition-shadow hover:shadow-xl">
      <div className="relative">
        <div className="relative h-36 overflow-hidden bg-ink">
          <Media image={builder.cover} seed={builder.slug} sizes="(min-width: 1024px) 33vw, 100vw" />
        </div>
        <div className="absolute bottom-0 left-6 translate-y-1/2">
          <BuilderLogo name={builder.name} size={64} />
        </div>
      </div>
      <div className="flex flex-1 flex-col px-6 pb-6 pt-12">
        <h3 className="font-display text-2xl text-ink">{builder.name}</h3>
        <p className="mt-1 text-sm text-gold-deep">{builder.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-charcoal">{builder.description}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate">{builder.overview}</p>
        <p className="mt-4 flex items-center gap-1.5 text-sm text-slate">
          <MapPin size={15} className="text-gold-deep" aria-hidden="true" />
          {builder.location}
        </p>
        {!category && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {cats.map((slug) => (
              <li key={slug} className="bg-ivory px-2.5 py-1 text-xs text-charcoal">
                {CATEGORIES.find((c) => c.slug === slug)?.name}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="text-sm text-slate">
            {shown} {shown === 1 ? "project" : "projects"}
          </span>
          <Link href={href} className="btn btn-gold !min-h-11 !px-5 !py-2.5">
            View Projects
          </Link>
        </div>
      </div>
    </article>
  );
}
