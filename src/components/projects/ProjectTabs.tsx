"use client";

import { useEffect, useRef, useState } from "react";

export type ProjectTab = { id: string; label: string };

/** Sticky section tabs for the project page. The bar sits under the gallery and,
 *  once the visitor scrolls past it, sticks right below the navbar (h-20 = top-20).
 *  The active tab follows the scroll position. */
export default function ProjectTabs({ tabs }: { tabs: ProjectTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      // 150px = navbar (80px) + tab bar (~56px) + a little breathing space
      let current = tabs[0]?.id ?? "";
      for (const t of tabs) {
        const el = document.getElementById(t.id);
        if (el && el.getBoundingClientRect().top <= 150) current = t.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [tabs]);

  // On phones the tab row scrolls sideways; keep the active tab in view.
  useEffect(() => {
    const bar = barRef.current;
    const el = bar?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (!bar || !el) return;
    bar.scrollTo({ left: el.offsetLeft - bar.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label="Project sections" className="sticky top-20 z-40 border-y border-mist bg-white/95 backdrop-blur">
      <div ref={barRef} className="flex gap-1 overflow-x-auto">
        {tabs.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            data-tab={t.id}
            onClick={() => setActive(t.id)}
            aria-current={active === t.id ? "true" : undefined}
            className={`-mb-px whitespace-nowrap border-b-2 px-4 py-4 text-sm transition-colors ${
              active === t.id ? "border-gold font-semibold text-ink" : "border-transparent text-slate hover:text-ink"
            }`}
          >
            {t.label}
          </a>
        ))}
      </div>
    </nav>
  );
}