import Link from "next/link";
import { Check } from "lucide-react";
import Hero from "@/components/home/Hero";
import PropertySearch from "@/components/home/PropertySearch";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import FeaturedBuilders from "@/components/home/FeaturedBuilders";
import PopularLocations from "@/components/home/PopularLocations";
import Testimonials from "@/components/home/Testimonials";
import LatestInsights from "@/components/home/LatestInsights";
import SectionHeading from "@/components/common/SectionHeading";
import ServiceIcon from "@/components/common/ServiceIcon";
import { PropertyVisual } from "@/components/common/PropertyVisual";
import EnquiryForm from "@/components/projects/EnquiryForm";
import { CATEGORIES, SERVICES } from "@/data/site";
import { projectsByCategory } from "@/lib/data";

const WHY = [
  "One place to compare builders and their full project lists",
  "Advice on approvals, payment plans and lease terms before you commit",
  "Residential, commercial and pre-rented options under one roof",
  "A named advisor who stays with you from shortlist to possession",
];

export default function Home() {
  return (
    <>
      <Hero />
      <PropertySearch />
      <FeaturedProjects />

      <section className="bg-ivory section-padding">
        <div className="container-width">
          <SectionHeading title="Start with a category" intro="Choose a category, pick a builder, then see every project they offer." />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/projects/${c.slug}`} className="group relative block aspect-[4/5] overflow-hidden bg-ink text-white">
                  <PropertyVisual seed={`category-${c.slug}`} label="" className="transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" aria-hidden="true" />
                  <span className="absolute inset-x-0 bottom-0 p-7">
                    <span className="font-display block text-3xl">{c.name}</span>
                    <span className="mt-1 block text-sm text-white/80">{projectsByCategory(c.slug).length} sample projects</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FeaturedBuilders />
      <PopularLocations />

      <section className="section-padding bg-ivory">
        <div className="container-width grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden bg-ink">
            <PropertyVisual seed="about-jeet" label="Illustration of a Gurgaon skyline" />
          </div>
          <div>
            <SectionHeading as="h2" title="Property advice you can check" />
            <p className="mt-6 max-w-xl leading-relaxed text-charcoal">
              JEET ESTATE CONSULTANT helps buyers and investors in Gurgaon, Delhi NCR compare builders, shortlist projects and understand the paperwork before they pay anything.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-slate">
              Replace this paragraph with your verified company story, years in business and team details.
            </p>
            <Link href="/about" className="btn btn-ink mt-8">About us</Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-width grid gap-12 lg:grid-cols-2">
          <SectionHeading title="Why choose us" intro="What working with us looks like." />
          <ul className="space-y-5">
            {WHY.map((w) => (
              <li key={w} className="flex gap-4 border-b border-mist pb-5">
                <Check className="mt-1 shrink-0 text-gold-deep" size={20} aria-hidden="true" />
                <span className="text-lg leading-snug text-charcoal">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="container-width">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading title="Services" intro="From the first shortlist to the final signature." />
            <Link href="/services" className="btn btn-outline-dark self-start sm:self-auto">All services</Link>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 3).map((s) => (
              <li key={s.title} className="border border-mist bg-white p-7">
                <ServiceIcon name={s.icon} />
                <h3 className="font-display mt-4 text-xl text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{s.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Testimonials />
      <LatestInsights />

      <section className="section-padding bg-navy">
        <div className="container-width grid items-start gap-12 lg:grid-cols-2">
          <SectionHeading tone="light" title="Tell us what you are looking for" intro="Share your budget, preferred location and purpose. An advisor will follow up on the details you send." />
          <EnquiryForm title="Send an enquiry" tone="dark" />
        </div>
      </section>
    </>
  );
}
