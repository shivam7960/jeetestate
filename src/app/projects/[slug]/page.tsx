import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, MapPin } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import BuilderLogo from "@/components/common/BuilderLogo";
import CTASection from "@/components/common/CTASection";
import SectionHeading from "@/components/common/SectionHeading";
import EnquiryForm from "@/components/projects/EnquiryForm";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { SITE } from "@/data/site";
import { getBuilder, getCategory, getLocation, getProject, projects, projectsByBuilder } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  const builder = getBuilder(project.builderSlug);
  return {
    title: `${project.name} by ${builder?.name}`,
    description: project.overview.slice(0, 155),
    alternates: { canonical: `/projects/${slug}` },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();
  const builder = getBuilder(project.builderSlug)!;
  const location = getLocation(project.locationSlug);
  const category = getCategory(project.category)!;
  const more = projectsByBuilder(builder.slug).filter((p) => p.slug !== project.slug);

  return (
    <>
      <div className="border-b border-mist bg-ivory py-5">
        <div className="container-width">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: category.name, href: `/projects/${category.slug}` },
              { label: builder.name, href: `/builders/${builder.slug}#${category.slug}` },
              { label: project.name },
            ]}
          />
        </div>
      </div>

      <div className="container-width grid gap-12 py-12 lg:grid-cols-[1fr_400px]">
        <div className="min-w-0 space-y-14">
          <header>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-ink px-3 py-1 text-white">{category.name}</span>
              <span className="bg-ivory px-3 py-1 text-charcoal">{project.status}</span>
              <span className="bg-ivory px-3 py-1 text-charcoal">{project.propertyType}</span>
              {SITE.sampleData && <span className="border border-gold px-3 py-1 text-gold-deep">Sample listing</span>}
            </div>
            <h1 className="font-display mt-4 text-4xl leading-tight text-ink sm:text-5xl">{project.name}</h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-slate">
              <Link href={`/builders/${builder.slug}`} className="hover:text-gold-deep">by <span className="underline underline-offset-4">{builder.name}</span></Link>
              {location && (
                <Link href={`/locations/${location.slug}`} className="flex items-center gap-1.5 hover:text-gold-deep">
                  <MapPin size={16} aria-hidden="true" /> {location.name}, Gurgaon
                </Link>
              )}
            </p>
            <p className="font-display mt-5 text-3xl text-ink">{project.priceLabel}</p>
          </header>

          <ProjectGallery images={project.gallery} seed={project.slug} />

          <section aria-labelledby="overview">
            <h2 id="overview" className="font-display text-2xl text-ink">Overview</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-charcoal">{project.overview}</p>
            <dl className="mt-6 grid max-w-xl grid-cols-2 gap-y-3 text-sm">
              <dt className="text-slate">Builder</dt><dd className="text-ink">{builder.name}</dd>
              <dt className="text-slate">Location</dt><dd className="text-ink">{location?.name}, Gurgaon</dd>
              <dt className="text-slate">Type</dt><dd className="text-ink">{project.propertyType}</dd>
              <dt className="text-slate">Status</dt><dd className="text-ink">{project.status}</dd>
              {project.reraId && (<><dt className="text-slate">RERA ID</dt><dd className="text-ink">{project.reraId}</dd></>)}
            </dl>
          </section>

          <section aria-labelledby="configuration">
            <h2 id="configuration" className="font-display text-2xl text-ink">Configuration</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {project.configuration.map((c) => (<li key={c} className="border border-mist px-4 py-2 text-charcoal">{c}</li>))}
            </ul>
          </section>

          <section aria-labelledby="amenities">
            <h2 id="amenities" className="font-display text-2xl text-ink">Amenities</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {project.amenities.map((a) => (
                <li key={a} className="flex items-center gap-3 text-charcoal"><Check size={18} className="text-gold-deep" aria-hidden="true" />{a}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="specs">
            <h2 id="specs" className="font-display text-2xl text-ink">Specifications</h2>
            <dl className="mt-4 divide-y divide-mist border-y border-mist">
              {project.specifications.map((s) => (
                <div key={s.label} className="grid grid-cols-2 gap-4 py-3 text-sm">
                  <dt className="text-slate">{s.label}</dt><dd className="text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {project.floorPlans && project.floorPlans.length > 0 && (
            <section aria-labelledby="plans">
              <h2 id="plans" className="font-display text-2xl text-ink">Floor plans</h2>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {project.floorPlans.map((f) => (
                  <li key={f.name} className="border border-mist p-5">
                    <p className="font-display text-lg text-ink">{f.name}</p>
                    <p className="mt-1 text-sm text-slate">{f.areaSqFt}</p>
                    {f.note && <p className="mt-1 text-sm text-slate">{f.note}</p>}
                    <p className="mt-3 text-xs text-slate">Plan drawing to be added.</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="builder" className="border border-mist bg-ivory p-6">
            <h2 id="builder" className="sr-only">About the builder</h2>
            <div className="flex items-center gap-4">
              <BuilderLogo name={builder.name} />
              <div>
                <p className="font-display text-xl text-ink">{builder.name}</p>
                <p className="text-sm text-slate">{builder.tagline}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-charcoal">{builder.description}</p>
            <Link href={`/builders/${builder.slug}`} className="btn btn-outline-dark mt-5">View all projects by {builder.name}</Link>
          </section>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="Enquiry">
          <EnquiryForm defaultProject={project.name} />
        </aside>
      </div>

      {more.length > 0 && (
        <section className="section-padding bg-ivory">
          <div className="container-width">
            <SectionHeading title={`More from ${builder.name}`} />
            <div className="mt-10"><ProjectGrid projects={more} /></div>
          </div>
        </section>
      )}
      <CTASection />
    </>
  );
}
