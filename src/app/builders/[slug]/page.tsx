import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import BuilderLogo from "@/components/common/BuilderLogo";
import CTASection from "@/components/common/CTASection";
import { Media } from "@/components/common/PropertyVisual";
import SectionHeading from "@/components/common/SectionHeading";
import EnquiryForm from "@/components/projects/EnquiryForm";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { CATEGORIES } from "@/data/site";
import { builders, getBuilder, projectsByBuilder } from "@/lib/data";

export function generateStaticParams() {
  return builders.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata(props: PageProps<"/builders/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const b = getBuilder(slug);
  if (!b) return {};
  return { title: `${b.name}: projects in Gurgaon`, description: b.description, alternates: { canonical: `/builders/${slug}` } };
}

/** Steps 2 and 3 of the flow: Builder details → all of the builder's projects. */
export default async function BuilderPage(props: PageProps<"/builders/[slug]">) {
  const { slug } = await props.params;
  const builder = getBuilder(slug);
  if (!builder) notFound();
  const all = projectsByBuilder(slug);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 -z-10 opacity-60"><Media image={builder.cover} seed={`cover-${slug}`} sizes="100vw" priority /></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/30" aria-hidden="true" />
        <div className="container-width pb-12 pt-14 sm:pt-24">
          <Breadcrumbs tone="light" items={[{ label: "Home", href: "/" }, { label: "Builders", href: "/builders" }, { label: builder.name }]} />
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <BuilderLogo name={builder.name} size={88} />
            <div>
              <h1 className="font-display text-4xl leading-tight sm:text-5xl">{builder.name}</h1>
              <p className="mt-2 text-lg text-white/80">{builder.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-width grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <SectionHeading title={`About ${builder.name}`} />
            <p className="mt-6 max-w-3xl leading-relaxed text-charcoal">{builder.description}</p>
            <p className="mt-4 max-w-3xl leading-relaxed text-slate">{builder.overview}</p>
          </div>
          <dl className="h-fit space-y-4 border border-mist bg-ivory p-6 text-sm">
            <div><dt className="text-slate">Based in</dt><dd className="mt-1 flex items-center gap-1.5 text-ink"><MapPin size={15} aria-hidden="true" />{builder.location}</dd></div>
            <div><dt className="text-slate">Total projects</dt><dd className="mt-1 text-ink">{all.length}</dd></div>
            <div><dt className="text-slate">Categories</dt><dd className="mt-1 text-ink">{CATEGORIES.filter((c) => all.some((p) => p.category === c.slug)).map((c) => c.name).join(", ")}</dd></div>
          </dl>
        </div>
      </section>

      {CATEGORIES.map((c) => {
        const list = all.filter((p) => p.category === c.slug);
        if (list.length === 0) return null;
        return (
          <section key={c.slug} id={c.slug} className="section-padding scroll-mt-20 even:bg-white odd:bg-ivory">
            <div className="container-width">
              <SectionHeading title={`${c.name} projects by ${builder.name}`} intro={`${list.length} ${list.length === 1 ? "project" : "projects"}`} />
              <div className="mt-10"><ProjectGrid projects={list} /></div>
            </div>
          </section>
        );
      })}

      <section className="section-padding bg-navy">
        <div className="container-width grid items-start gap-12 lg:grid-cols-2">
          <SectionHeading tone="light" title={`Interested in ${builder.name}?`} intro="Tell us which project you are considering and we will follow up on the details you send." />
          <EnquiryForm title="Enquire now" tone="dark" />
        </div>
      </section>
      <CTASection />
    </>
  );
}
