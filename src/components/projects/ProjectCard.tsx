import Link from "next/link";
import { MapPin } from "lucide-react";
import { Media } from "@/components/common/PropertyVisual";
import { SITE, CATEGORIES } from "@/data/site";
import { getBuilder, getLocation } from "@/lib/data";
import type { Project } from "@/types";

export default function ProjectCard({ project }: { project: Project }) {
  const builder = getBuilder(project.builderSlug);
  const location = getLocation(project.locationSlug);
  const category = CATEGORIES.find((c) => c.slug === project.category);

  return (
    <article className="group flex h-full flex-col border border-mist bg-white transition-shadow hover:shadow-xl">
      <Link href={`/projects/${project.slug}`} className="flex h-full flex-col" aria-label={`${project.name}, view details`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-ink">
          <Media
            image={project.gallery[0]}
            seed={project.slug}
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 bg-white px-3 py-1 text-xs font-semibold text-ink">
            {project.status}
          </span>
          <span className="absolute right-3 top-3 bg-ink/85 px-3 py-1 text-xs text-white">
            {category?.name}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl leading-snug text-ink">{project.name}</h3>
          <p className="mt-1 text-sm text-slate">by {builder?.name}</p>
          <p className="mt-3 flex items-center gap-1.5 text-sm text-slate">
            <MapPin size={15} className="text-gold-deep" aria-hidden="true" />
            {location?.name}, Gurgaon
          </p>
          <p className="mt-2 text-sm text-charcoal">
            {project.propertyType} · {project.configuration.join(", ")}
          </p>
          <div className="mt-auto flex items-end justify-between gap-3 pt-5">
            <p className="font-display text-lg text-ink">{project.priceLabel}</p>
            {SITE.sampleData && <span className="text-[11px] text-slate">Sample listing</span>}
          </div>
        </div>
      </Link>
    </article>
  );
}
