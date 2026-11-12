import Link from "next/link";
import SectionHeading from "@/components/common/SectionHeading";
import BuilderCard from "@/components/projects/BuilderCard";
import { builders } from "@/lib/data";

export default function FeaturedBuilders() {
  return (
    <section className="section-padding bg-ivory">
      <div className="container-width">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading title="Builders" intro="Every builder page lists all of their projects in one place. Sample builders shown." />
          <Link href="/builders" className="btn btn-outline-dark self-start sm:self-auto">All builders</Link>
        </div>
        <ul className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {builders.slice(0, 3).map((b) => (<li key={b.slug}><BuilderCard builder={b} /></li>))}
        </ul>
      </div>
    </section>
  );
}
