import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/common/PageHeader";
import SectionHeading from "@/components/common/SectionHeading";
import CTASection from "@/components/common/CTASection";
import BuilderCard from "./BuilderCard";
import ProjectFilters from "./ProjectFilters";
import ProjectGrid from "./ProjectGrid";
import { builders, buildersForCategory, getCategory, locations, projectsByCategory } from "@/lib/data";
import type { CategorySlug } from "@/types";

export function categoryMetadata(slug: CategorySlug): Metadata {
  const c = getCategory(slug);
  return { title: c?.headline, description: c?.description, alternates: { canonical: `/projects/${slug}` } };
}

/** One shared template for Commercial, Residential and Pre-Rented.
 *  Step 1 of the flow: Category → Builder listing. */
export default function CategoryPage({ slug }: { slug: CategorySlug }) {
  const category = getCategory(slug);
  if (!category) notFound();
  const entries = buildersForCategory(slug);
  const all = projectsByCategory(slug);

  return (
    <>
      <PageHeader
        seed={`category-${slug}`}
        image={category.banner}
        title={category.headline}
        intro={category.description}
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: category.name }]}
      />

      <section className="section-padding bg-ivory">
        <div className="container-width">
          <SectionHeading title={`${category.name} builders`} intro={`${entries.length} builders with ${category.name.toLowerCase()} projects. Select one to see all of their projects.`} />
          <ul className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {entries.map(({ builder, count }) => (
              <li key={builder.slug}><BuilderCard builder={builder} category={slug} count={count} /></li>
            ))}
          </ul>
        </div>
      </section>

      <section id="all-projects" className="section-padding scroll-mt-24 bg-white">
        <div className="container-width">
          <SectionHeading title={`All ${category.name.toLowerCase()} projects`} intro="Prefer to search directly? Filter by location, budget, type, builder and status." />
          <div className="mt-10">
            <Suspense fallback={<ProjectGrid projects={all} />}>
              <ProjectFilters projects={all} builders={builders} locations={locations} lockedCategory={slug} />
            </Suspense>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
