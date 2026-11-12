import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import SectionHeading from "@/components/common/SectionHeading";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { getLocation, locations, projectsByLocation } from "@/lib/data";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata(props: PageProps<"/locations/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const l = getLocation(slug);
  if (!l) return {};
  return { title: `Properties in ${l.name}, Gurgaon`, description: l.description, alternates: { canonical: `/locations/${slug}` } };
}

export default async function LocationPage(props: PageProps<"/locations/[slug]">) {
  const { slug } = await props.params;
  const location = getLocation(slug);
  if (!location) notFound();
  const list = projectsByLocation(slug);

  return (
    <>
      <PageHeader
        seed={`loc-${slug}`}
        title={location.name}
        intro={location.description}
        crumbs={[{ label: "Home", href: "/" }, { label: "Locations", href: "/locations" }, { label: location.name }]}
      />
      <section className="section-padding bg-ivory">
        <div className="container-width">
          <SectionHeading title={`Projects in ${location.name}`} />
          <div className="mt-10">
            {list.length > 0 ? (
              <ProjectGrid projects={list} />
            ) : (
              <p className="border border-dashed border-mist py-14 text-center text-slate">No projects listed here yet. Send us an enquiry and we will share what is available.</p>
            )}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
