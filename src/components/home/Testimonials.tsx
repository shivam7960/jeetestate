import SectionHeading from "@/components/common/SectionHeading";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section className="section-padding bg-ink text-white">
      <div className="container-width">
        <SectionHeading tone="light" title="What clients say" />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name}>
              <figure className="h-full border border-white/15 p-7">
                <blockquote className="font-display text-lg leading-relaxed text-white/90">{t.quote}</blockquote>
                <figcaption className="mt-5 text-sm text-white/65">
                  <span className="text-gold">{t.name}</span>, {t.role}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}