import Link from "next/link";
import SectionHeading from "@/components/common/SectionHeading";
import { Media } from "@/components/common/PropertyVisual";
import { locations, projectsByLocation } from "@/lib/data";

export default function PopularLocations() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <SectionHeading title="Popular locations in Gurgaon" intro="Explore corridors and see which projects are available in each." />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((l) => {
            const n = projectsByLocation(l.slug).length;
            return (
              <li key={l.slug}>
                <Link href={`/locations/${l.slug}`} className="group relative block aspect-[16/10] overflow-hidden bg-ink">
                  <Media image={l.cover} seed={`loc-${l.slug}`} className="transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" aria-hidden="true" />
                  <span className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <span className="font-display block text-2xl">{l.name}</span>
                    <span className="text-sm text-white/80">{l.tagline} · {n} {n === 1 ? "project" : "projects"}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
