"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { SearchX } from "lucide-react";
import { CATEGORIES } from "@/data/site";
import { BUDGETS, HAS_PRICES, PROPERTY_TYPES, STATUSES, matchesBudget } from "@/lib/data";
import type { Builder, CategorySlug, Location, Project } from "@/types";
import ProjectGrid from "./ProjectGrid";

function FilterSelect({ id, label, value, options, onChange }: { id: string; label: string; value: string; options: { value: string; label: string }[]; onChange: (key: string, value: string) => void }) {
  return (
    <div>
      <label htmlFor={`f-${id}`} className="mb-1.5 block text-sm font-medium text-charcoal">{label}</label>
      <select id={`f-${id}`} value={value} onChange={(e) => onChange(id, e.target.value)} className="field">
        <option value="">All</option>
        {options.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
      </select>
    </div>
  );
}

/** Searchable, filterable project list. Filters live in the URL
 *  (?category=&location=&budget=&type=&builder=&status=&q=) so results are shareable
 *  and the homepage search can deep-link here. */
export default function ProjectFilters({
  projects,
  builders,
  locations,
  lockedCategory,
}: {
  projects: Project[];
  builders: Builder[];
  locations: Location[];
  lockedCategory?: CategorySlug;
}) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const get = (key: string) => params.get(key) ?? "";
  const category = lockedCategory ?? get("category");
  const location = get("location");
  const budget = HAS_PRICES ? get("budget") : "";
  const type = get("type");
  const builder = get("builder");
  const status = get("status");
  const q = get("q");

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return projects.filter((p) => {
      if (category && p.category !== category) return false;
      if (location && p.locationSlug !== location) return false;
      if (type && p.propertyType !== type) return false;
      if (builder && p.builderSlug !== builder) return false;
      if (status && p.status !== status) return false;
      if (budget && !matchesBudget(p, budget)) return false;
      if (term) {
        const b = builders.find((x) => x.slug === p.builderSlug)?.name ?? "";
        const l = locations.find((x) => x.slug === p.locationSlug)?.name ?? "";
        if (!`${p.name} ${b} ${l} ${p.propertyType}`.toLowerCase().includes(term)) return false;
      }
      return true;
    });
  }, [projects, builders, locations, category, location, type, builder, status, budget, q]);

  const hasFilters = Boolean(location || budget || type || builder || status || q || (!lockedCategory && category));

  return (
    <div>
      <form role="search" aria-label="Filter projects" onSubmit={(e) => e.preventDefault()} className="border border-mist bg-ivory p-5 sm:p-6">
        <div className="mb-4">
          <label htmlFor="f-q" className="mb-1.5 block text-sm font-medium text-charcoal">Search by project, builder or location</label>
          <input id="f-q" type="search" value={q} onChange={(e) => update("q", e.target.value)} placeholder="For example: Golf Course Road" className="field" />
        </div>
        <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${HAS_PRICES ? "xl:grid-cols-6" : "xl:grid-cols-5"}`}>
          {!lockedCategory && (
            <FilterSelect onChange={update} id="category" label="Category" value={category} options={CATEGORIES.map((c) => ({ value: c.slug, label: c.name }))} />
          )}
          <FilterSelect onChange={update} id="location" label="Location" value={location} options={locations.map((l) => ({ value: l.slug, label: l.name }))} />
          {HAS_PRICES && <FilterSelect onChange={update} id="budget" label="Budget" value={budget} options={BUDGETS.map((b) => ({ value: b.value, label: b.label }))} />}
          <FilterSelect onChange={update} id="type" label="Property type" value={type} options={PROPERTY_TYPES.map((t) => ({ value: t, label: t }))} />
          <FilterSelect onChange={update} id="builder" label="Builder" value={builder} options={builders.map((b) => ({ value: b.slug, label: b.name }))} />
          <FilterSelect onChange={update} id="status" label="Status" value={status} options={STATUSES.map((s) => ({ value: s, label: s }))} />
        </div>
        {budget && (
          <p className="mt-3 text-xs text-slate">Budget filter only matches projects with a supplied price; “Price on request” projects are hidden while it is on.</p>
        )}
      </form>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-slate" aria-live="polite" role="status">
          {results.length} {results.length === 1 ? "project" : "projects"} found
        </p>
        {hasFilters && (
          <button type="button" onClick={() => router.replace(pathname, { scroll: false })} className="text-sm font-medium text-gold-deep underline underline-offset-4">
            Clear all filters
          </button>
        )}
      </div>

      <div className="mt-6">
        {results.length > 0 ? (
          <ProjectGrid projects={results} />
        ) : (
          <div className="border border-dashed border-mist py-16 text-center">
            <SearchX className="mx-auto text-gold-deep" size={34} aria-hidden="true" />
            <p className="font-display mt-3 text-xl text-ink">No projects match these filters</p>
            <p className="mt-1 text-sm text-slate">Try a wider budget or remove a filter.</p>
            <button type="button" onClick={() => router.replace(pathname, { scroll: false })} className="btn btn-gold mt-5">Clear all filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
