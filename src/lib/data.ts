import { builders } from "@/data/builders";
import { locations } from "@/data/locations";
import { projects } from "@/data/projects";
import { insights } from "@/data/insights";
import { CATEGORIES } from "@/data/site";
import type { Builder, CategorySlug, Location, Project } from "@/types";

export { builders, locations, projects, insights };

export const BUDGETS = [
  { value: "under-2", label: "Under ₹2 Cr", min: 0, max: 2 },
  { value: "2-5", label: "₹2 – 5 Cr", min: 2, max: 5 },
  { value: "5-10", label: "₹5 – 10 Cr", min: 5, max: 10 },
  { value: "above-10", label: "Above ₹10 Cr", min: 10, max: Infinity },
] as const;

/** The budget filter only works once projects have prices. While none do, it is hidden. */
export const HAS_PRICES = projects.some(
  (p) => p.priceMinCr !== undefined && p.priceMaxCr !== undefined,
);

export const STATUSES = [
  "New Launch",
  "Under Construction",
  "Ready to Move",
  "Pre-Leased",
] as const;

export const PROPERTY_TYPES = Array.from(
  new Set(projects.map((p) => p.propertyType)),
).sort();

export const getCategory = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);
export const getBuilder = (slug: string): Builder | undefined =>
  builders.find((b) => b.slug === slug);
export const getLocation = (slug: string): Location | undefined =>
  locations.find((l) => l.slug === slug);
export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
export const getInsight = (slug: string) =>
  insights.find((i) => i.slug === slug);

export const projectsByBuilder = (builderSlug: string) =>
  projects.filter((p) => p.builderSlug === builderSlug);
export const projectsByCategory = (category: CategorySlug) =>
  projects.filter((p) => p.category === category);
export const projectsByLocation = (locationSlug: string) =>
  projects.filter((p) => p.locationSlug === locationSlug);

export const builderCategories = (builderSlug: string): CategorySlug[] =>
  CATEGORIES.map((c) => c.slug).filter((slug) =>
    projects.some((p) => p.builderSlug === builderSlug && p.category === slug),
  );

/** Builders with at least one project in a category, with that category's project count. */
export function buildersForCategory(category: CategorySlug) {
  return builders
    .map((builder) => ({
      builder,
      count: projects.filter(
        (p) => p.builderSlug === builder.slug && p.category === category,
      ).length,
    }))
    .filter((entry) => entry.count > 0);
}

export function matchesBudget(project: Project, budgetValue: string) {
  const budget = BUDGETS.find((b) => b.value === budgetValue);
  if (!budget) return true;
  if (project.priceMinCr === undefined || project.priceMaxCr === undefined) {
    return false; // price not supplied: cannot be matched to a budget
  }
  return project.priceMinCr < budget.max && project.priceMaxCr >= budget.min;
}
