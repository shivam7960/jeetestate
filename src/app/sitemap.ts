import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { builders, insights, locations, projects } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = ["", "/privacy-policy", "/terms", "/about", "/services", "/contact", "/projects", "/projects/commercial", "/projects/residential", "/projects/pre-rented", "/builders", "/locations", "/insights"];
  const dynamic = [
    ...builders.map((b) => `/builders/${b.slug}`),
    ...projects.map((p) => `/projects/${p.slug}`),
    ...locations.map((l) => `/locations/${l.slug}`),
    ...insights.map((i) => `/insights/${i.slug}`),
  ];
  return [...fixed, ...dynamic].map((path) => ({ url: `${SITE.url}${path}` }));
}
