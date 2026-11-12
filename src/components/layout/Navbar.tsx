"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { CATEGORIES, NAV_ITEMS } from "@/data/site";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const isActive = (href: string) => {
    const path = href.split("#")[0];
    return path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(path + "/");
  };

  const linkClass = (href: string) =>
    `text-[13px] font-medium transition-colors hover:text-gold-deep ${
      isActive(href) ? "text-gold-deep" : "text-charcoal"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-mist bg-white/95 backdrop-blur">
      <div className="container-width flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center" aria-label="JEET ESTATE CONSULTANT home">
  <Image
    src="/logo-v2.png"
    alt="JEET ESTATE CONSULTANT"
    width={200}
    height={64}
    priority
    className="h-12 w-auto sm:h-14"
  />
</Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.filter((i) => i.name !== "Contact Us").map((item) =>
            "children" in item ? (
              <div
                key={item.name}
                ref={wrapRef}
                className="relative"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
                }}
              >
                <div className="flex items-center gap-1">
                  <Link href={item.href} className={linkClass(item.href)} onClick={() => setOpen(false)}>
                    {item.name}
                  </Link>
                  <button
                    type="button"
                    aria-label="Show project categories"
                    aria-expanded={open}
                    aria-haspopup="true"
                    aria-controls="projects-menu"
                    onClick={() => setOpen((v) => !v)}
                    className="p-1 text-charcoal hover:text-gold-deep"
                  >
                    <ChevronDown size={14} aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                </div>
                {open && (
                  <ul
                    id="projects-menu"
                    className="absolute left-0 top-full z-50 w-60 border border-mist border-t-gold bg-white py-2 shadow-xl"
                  >
                    {CATEGORIES.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/projects/${c.slug}`}
                          onClick={() => setOpen(false)}
                          className="block px-5 py-3 text-sm text-charcoal hover:bg-ivory hover:text-gold-deep"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link key={item.name} href={item.href} className={linkClass(item.href)}>
                {item.name}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn btn-gold hidden !min-h-11 !px-6 !py-2.5 !text-xs lg:inline-flex">
            Contact Us
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
