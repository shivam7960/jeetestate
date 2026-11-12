"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { CATEGORIES, NAV_ITEMS } from "@/data/site";
import { ChevronDown, Menu, X } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const SOCIALS = [
  { label: "Facebook", href: "#", Icon: FaFacebookF },
  { label: "Twitter", href: "#", Icon: FaTwitter },
  { label: "Instagram", href: "#", Icon: FaInstagram },
  { label: "LinkedIn", href: "#", Icon: FaLinkedinIn },
  { label: "YouTube", href: "#", Icon: FaYoutube },
];


export default function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => setMounted(true), []);

  // route change par menu band
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape + body scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (href: string) => {
    const path = href.split("#")[0];
    return path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(path + "/");
  };

  const rowBase = "relative flex items-center justify-between border-b border-mist";
  const linkBase = "flex-1 px-9 py-4 text-[15px] font-normal uppercase tracking-wide transition-colors";
  const activeBar = "before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:bg-gold";

  const drawer = (
    <div className={`fixed inset-0 z-[100] lg:hidden ${open ? "" : "pointer-events-none"}`}>
      {/* Overlay */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />

      {/* Drawer */}
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        aria-hidden={!open}
        className={`absolute right-0 top-0 flex h-full w-[80%] max-w-sm flex-col overflow-y-auto bg-ivory shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top: logo + close */}
        <div className="flex items-center justify-between px-9 py-8">
          <Link href="/" onClick={close} aria-label="Home">
            <Image src="/logo-v2.png" alt="JEET ESTATE CONSULTANT" width={200} height={64} className="h-12 w-auto" />
          </Link>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={close}
            className="flex h-11 w-11 items-center justify-center text-ink"
          >
            <X size={28} strokeWidth={3} aria-hidden="true" />
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col border-t border-mist">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            const color = active ? "text-gold" : "text-charcoal";

            if ("children" in item) {
              return (
                <li key={item.name} className="border-b border-mist">
                  <div className={`${rowBase} !border-b-0 ${active ? activeBar : ""}`}>
                    <Link href={item.href} onClick={close} className={`${linkBase} ${color}`}>
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      aria-label="Toggle project categories"
                      aria-expanded={projectsOpen}
                      onClick={() => setProjectsOpen((v) => !v)}
                      className="mr-6 flex h-11 w-12 items-center justify-center rounded bg-gold text-white"
                    >
                      <ChevronDown
                        size={18}
                        strokeWidth={3}
                        aria-hidden="true"
                        className={`transition-transform ${projectsOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                  {projectsOpen && (
                    <ul className="mb-3 ml-12 border-l border-gold pl-4">
                      {CATEGORIES.map((c) => (
                        <li key={c.slug}>
                          <Link href={`/projects/${c.slug}`} onClick={close} className="block py-3 text-sm text-slate">
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }

            return (
              <li key={item.name} className={`${rowBase} ${active ? activeBar : ""}`}>
                <Link href={item.href} onClick={close} className={`${linkBase} ${color}`}>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Social icons */}
        <div className="mt-auto flex items-center gap-3 px-9 py-10">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 w-14 items-center justify-center rounded border border-mist bg-white text-ink transition-colors hover:text-gold"
            >
              <Icon size={20} aria-hidden="true" />
            </a>
          ))}
        </div>
      </nav>
    </div>
  );

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(true)}
        className="flex h-11 w-11 items-center justify-center text-ink"
      >
        <Menu size={26} aria-hidden="true" />
      </button>

      {/* Portal zaroori hai: header me backdrop-blur hai, jo fixed elements ko header ke andar hi trap kar deta hai */}
      {mounted && createPortal(drawer, document.body)}
    </div>
  );
}