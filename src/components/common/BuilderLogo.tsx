import Image from "next/image";
import { builders } from "@/data/builders";

export default function BuilderLogo({ name, size = 56 }: { name: string; size?: number }) {
  const logo = builders.find((b) => b.name === name)?.logo;

  if (logo) {
    return (
      <span
        style={{ width: size, height: size }}
        className="relative inline-flex shrink-0 overflow-hidden rounded-full border border-gold bg-white"
      >
        <Image src={logo} alt={`${name} logo`} fill sizes={`${size}px`} className="object-contain p-2" />
      </span>
    );
  }

  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("");
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: size * 0.34 }}
      className="font-display inline-flex shrink-0 items-center justify-center rounded-full border border-gold bg-ink tracking-wide text-gold"
    >
      {initials}
    </span>
  );
}