import { useId } from "react";
import Image from "next/image";
import type { MediaImage } from "@/types";

function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SKIES: [string, string][] = [
  ["#0f1b2a", "#2b4560"],
  ["#16283d", "#8a7a5c"],
  ["#1d2733", "#5d7289"],
  ["#101a28", "#a58f62"],
];

/** Deterministic architectural placeholder. Used wherever a real photo has not been
 *  supplied yet, so layouts stay premium without pretending to be real photography. */
export function PropertyVisual({
  seed,
  label,
  className = "",
}: {
  seed: string;
  label: string;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const rand = rng(hash(seed));
  const [top, bottom] = SKIES[Math.floor(rand() * SKIES.length)];

  const layers = [0, 1].map((layer) => {
    const count = layer === 0 ? 9 : 6;
    const rects: { x: number; w: number; h: number }[] = [];
    let x = -20 + rand() * 30;
    for (let i = 0; i < count; i++) {
      const w = 55 + rand() * 70;
      const h = (layer === 0 ? 120 : 190) + rand() * (layer === 0 ? 150 : 210);
      rects.push({ x, w, h });
      x += w + (layer === 0 ? 8 + rand() * 20 : 30 + rand() * 60);
    }
    return rects;
  });

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMax slice"
      className={`h-full w-full ${className}`}
    >
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
        <pattern id={`${uid}-win`} width="12" height="14" patternUnits="userSpaceOnUse">
          <rect x="3" y="4" width="5" height="7" fill="#e8d3a1" opacity="0.55" />
        </pattern>
      </defs>
      <rect width="800" height="500" fill={`url(#${uid}-sky)`} />
      {layers.map((rects, layer) =>
        rects.map((r, i) => (
          <g key={`${layer}-${i}`}>
            <rect
              x={r.x}
              y={470 - r.h}
              width={r.w}
              height={r.h}
              fill={layer === 0 ? "#0b1520" : "#14222f"}
              opacity={layer === 0 ? 0.95 : 0.7}
            />
            {layer === 0 && (
              <rect
                x={r.x + 4}
                y={470 - r.h + 6}
                width={r.w - 8}
                height={r.h - 12}
                fill={`url(#${uid}-win)`}
              />
            )}
          </g>
        )),
      )}
      <rect y="470" width="800" height="30" fill="#0b1520" />
      <rect y="470" width="800" height="2" fill="#b08d4f" opacity="0.8" />
    </svg>
  );
}

export function Media({
  image,
  seed,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority = false,
  className = "",
}: {
  image?: MediaImage;
  seed: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (image?.src) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }
  return (
    <PropertyVisual
      seed={seed}
      label={image?.alt ?? "Placeholder illustration"}
      className={className}
    />
  );
}
