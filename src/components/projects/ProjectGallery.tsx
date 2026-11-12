"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Media } from "@/components/common/PropertyVisual";
import type { MediaImage } from "@/types";

export default function ProjectGallery({ images, seed }: { images: MediaImage[]; seed: string }) {
  const [index, setIndex] = useState(0);
  const go = (n: number) => setIndex((index + n + images.length) % images.length);
  const current = images[index];

  return (
    <section aria-label="Project gallery">
      <div className="relative aspect-[16/10] overflow-hidden bg-ink">
        <Media image={current} seed={`${seed}-${index}`} sizes="(min-width: 1024px) 66vw, 100vw" priority />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-white/90 text-ink hover:bg-white"
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-white/90 text-ink hover:bg-white"
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </>
        )}
        {current.caption && (
          <p className="absolute bottom-0 left-0 bg-ink/80 px-4 py-2 text-sm text-white" aria-live="polite">
            {current.caption} ({index + 1}/{images.length})
          </p>
        )}
      </div>
      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <li key={img.alt}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1}: ${img.caption ?? img.alt}`}
                aria-pressed={i === index}
                className={`relative block aspect-[4/3] w-full overflow-hidden border-2 ${i === index ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"}`}
              >
                <Media image={img} seed={`${seed}-${i}`} sizes="20vw" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
