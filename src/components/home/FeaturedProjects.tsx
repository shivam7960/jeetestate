import Link from "next/link";
import SectionHeading from "@/components/common/SectionHeading";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { projects } from "@/lib/data";

export default function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 6);
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading title="Featured projects" intro="A selection across residential, commercial and pre-rented." />
          <Link href="/projects#all-projects" className="btn btn-outline-dark self-start sm:self-auto">Browse all projects</Link>
        </div>
        <div className="mt-12"><ProjectGrid projects={featured} /></div>
      </div>
    </section>
  );
}