import { Search } from "lucide-react";
import { CATEGORIES } from "@/data/site";
import { BUDGETS, PROPERTY_TYPES, locations } from "@/lib/data";

/** Plain GET form: works without JavaScript and deep-links into /projects filters. */
export default function PropertySearch() {
  const select = "field";
  const label = "mb-1.5 block text-sm font-medium text-charcoal";
  return (
    <section aria-label="Property search" className="container-width relative z-10 -mt-16 sm:-mt-20">
      <form action="/projects" method="get" className="border border-mist bg-white p-5 shadow-2xl sm:p-7">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label htmlFor="s-category" className={label}>Category</label>
            <select id="s-category" name="category" className={select} defaultValue="">
              <option value="">All categories</option>
              {CATEGORIES.map((c) => (<option key={c.slug} value={c.slug}>{c.name}</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="s-location" className={label}>Location</label>
            <select id="s-location" name="location" className={select} defaultValue="">
              <option value="">All locations</option>
              {locations.map((l) => (<option key={l.slug} value={l.slug}>{l.name}</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="s-budget" className={label}>Budget</label>
            <select id="s-budget" name="budget" className={select} defaultValue="">
              <option value="">Any budget</option>
              {BUDGETS.map((b) => (<option key={b.value} value={b.value}>{b.label}</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="s-type" className={label}>Property type</label>
            <select id="s-type" name="type" className={select} defaultValue="">
              <option value="">All types</option>
              {PROPERTY_TYPES.map((t) => (<option key={t} value={t}>{t}</option>))}
            </select>
          </div>
          <div className="flex items-end">
            <button type="submit" className="btn btn-ink w-full">
              <Search size={17} aria-hidden="true" /> Search properties
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
