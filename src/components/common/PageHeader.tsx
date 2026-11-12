import type { ReactNode } from "react";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import { PropertyVisual } from "./PropertyVisual";

export default function PageHeader({
  title,
  intro,
  crumbs,
  seed,
  children,
}: {
  title: string;
  intro?: string;
  crumbs: Crumb[];
  seed: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 opacity-40" aria-hidden="true">
        <PropertyVisual seed={seed} label="" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" aria-hidden="true" />
      <div className="container-width relative py-16 sm:py-20">
        <Breadcrumbs items={crumbs} tone="light" />
        <h1 className="font-display mt-6 max-w-3xl text-4xl leading-tight sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
