import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import { Media } from "@/components/common/PropertyVisual";
import { locations, projectsByLocation } from "@/lib/data";

export const metadata: Metadata = {
  title: "Locations in Gurgaon",
  description: "Explore Gurgaon corridors and the residential, commercial and pre-rented projects available in each.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <PageHeader seed="locations-index" title="Locations" intro="Explore Gurgaon corridors and the projects in each." crumbs={[{ label: "Home", href: "/" }, { label: "Locations" }]} />
      <section className="section-padding bg-ivory">
        <div className="container-width">
          <ul className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {locations.map((l) => {
              const n = projectsByLocation(l.slug).length;
              return (
                <li key={l.slug}>
                  <Link href={`/locations/${l.slug}`} className="group block h-full border border-mist bg-white transition-shadow hover:shadow-xl">
                    <div className="relative aspect-[16/9] overflow-hidden bg-ink"><Media image={l.cover} seed={`loc-${l.slug}`} className="transition-transform duration-500 group-hover:scale-105" /></div>
                    <div className="p-6">
                      <h2 className="font-display text-2xl text-ink">{l.name}</h2>
                      <p className="mt-1 text-sm text-gold-deep">{l.tagline}</p>
                      <p className="mt-3 text-sm leading-relaxed text-slate">{l.description}</p>
                      <p className="mt-4 text-sm font-medium text-ink">{n} {n === 1 ? "project" : "projects"}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <CTASection />
    </>
  );
}
