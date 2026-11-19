import type { ReactNode } from "react";

export type LegalSection = {
  title: string;
  /** Plain paragraphs, or JSX when a paragraph needs a link or contact detail. */
  paragraphs?: ReactNode[];
  bullets?: ReactNode[];
};

/** Shared layout for the Privacy Policy and Terms of Use pages. */
export default function LegalDocument({ updated, sections }: { updated: string; sections: LegalSection[] }) {
  return (
    <section className="section-padding bg-white">
      <div className="container-width max-w-3xl">
        <p className="text-sm text-slate">Last updated: {updated}</p>
        <div className="mt-6 space-y-10">
          {sections.map((s, i) => (
            <section key={s.title} aria-labelledby={`legal-${i}`}>
              <h2 id={`legal-${i}`} className="font-display text-2xl text-ink">
                {i + 1}. {s.title}
              </h2>
              {s.paragraphs?.map((p, j) => (
                <p key={j} className="mt-3 leading-relaxed text-charcoal">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-charcoal marker:text-gold-deep">
                  {s.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
