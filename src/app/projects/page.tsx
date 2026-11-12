import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/common/PageHeader";
import SectionHeading from "@/components/common/SectionHeading";
import { PropertyVisual } from "@/components/common/PropertyVisual";
import CTASection from "@/components/common/CTASection";
import ProjectFilters from "@/components/projects/ProjectFilters";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { CATEGORIES } from "@/data/site";
import { builders, buildersForCategory, locations, projects, projectsByCategory } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects in Gurgaon",
  description: "Browse commercial, residential and pre-rented projects in Gurgaon by builder, location, budget and status.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        seed="projects-index"
        title="Projects in Gurgaon"
        intro="Start with a category to browse builders, or search every project at once."
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      />

      <section className="section-padding bg-ivory">
        <div className="container-width">
          <SectionHeading title="Choose a category" />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/projects/${c.slug}`} className="group block h-full border border-mist bg-white transition-shadow hover:shadow-xl">
                  <div className="relative aspect-[16/9] overflow-hidden bg-ink">
                    <PropertyVisual seed={`category-${c.slug}`} label="" className="transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl text-ink">{c.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate">{c.description}</p>
                    <p className="mt-4 text-sm font-medium text-gold-deep">
                      {buildersForCategory(c.slug).length} builders · {projectsByCategory(c.slug).length} projects
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="all-projects" className="section-padding scroll-mt-24 bg-white">
        <div className="container-width">
          <SectionHeading title="Search all projects" intro="Filter by category, location, budget, property type, builder and status." />
          <div className="mt-10">
            <Suspense fallback={<ProjectGrid projects={projects} />}>
              <ProjectFilters projects={projects} builders={builders} locations={locations} />
            </Suspense>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
