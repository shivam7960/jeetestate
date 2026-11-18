"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { CountryCode } from "libphonenumber-js/min";
import { COUNTRIES, formatNational, parsePhoneNumberFromString } from "@/lib/phone";
import { FLAGS } from "./flags";

export default function PhoneField({
  id,
  country,
  onCountryChange,
  value,
  onValueChange,
  invalid,
  describedBy,
}: {
  id: string;
  country: CountryCode;
  onCountryChange: (c: CountryCode) => void;
  value: string;
  onValueChange: (v: string) => void;
  invalid: boolean;
  describedBy?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const current = COUNTRIES.find((c) => c.code === country) ?? COUNTRIES[0];
  const Flag = FLAGS[current.code];

  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", away);
    return () => document.removeEventListener("mousedown", away);
  }, [open]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (open && e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
      toggle.current?.focus();
    }
  }

  function onInput(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    // Pasted or typed in international form (+971 ...): pick the country automatically.
    if (raw.trim().startsWith("+")) {
      const parsed = parsePhoneNumberFromString(raw);
      const match = parsed?.country ? COUNTRIES.find((c) => c.code === parsed.country) : undefined;
      if (parsed && match && parsed.isValid()) {
        onCountryChange(match.code);
        onValueChange(parsed.formatNational());
        return;
      }
      onValueChange(raw.replace(/[^\d+]/g, "").slice(0, 20));
      return;
    }
    onValueChange(formatNational(raw.replace(/\D/g, "").slice(0, 15), country));
  }

  return (
    <div
      ref={wrap}
      onKeyDown={onKeyDown}
      className={`relative flex items-stretch border bg-white focus-within:border-ink focus-within:outline-2 focus-within:outline-gold ${
        invalid ? "border-[#b42318]" : "border-mist"
      }`}
    >
      <button
        ref={toggle}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country code: ${current.name} +${current.dial}. Change country`}
        onClick={() => setOpen((o) => !o)}
        className="flex shrink-0 items-center gap-2 border-r border-mist px-3 text-sm text-ink hover:bg-ivory"
      >
        {Flag && <Flag className="h-4 w-6 shrink-0" aria-hidden="true" />}
        <span>+{current.dial}</span>
        <ChevronDown size={14} aria-hidden="true" className={open ? "rotate-180" : ""} />
      </button>

      <input
        id={id}
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder="Mobile number"
        value={value}
        onChange={onInput}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className="w-0 min-w-0 flex-1 bg-transparent px-3 py-3 text-base text-ink outline-none placeholder:text-slate/70"
      />

      {open && (
        <ul
          role="listbox"
          aria-label="Choose country"
          className="absolute left-0 top-full z-20 mt-1 max-h-56 w-72 max-w-[85vw] overflow-auto border border-mist bg-white shadow-xl"
        >
          {COUNTRIES.map((c) => {
            const F = FLAGS[c.code];
            return (
              <li key={c.code} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={c.code === country}
                  onClick={() => {
                    onCountryChange(c.code);
                    onValueChange(formatNational(value.replace(/\D/g, ""), c.code));
                    setOpen(false);
                    toggle.current?.focus();
                  }}
                  className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm hover:bg-ivory ${
                    c.code === country ? "bg-ivory font-medium" : ""
                  }`}
                >
                  {F && <F className="h-4 w-6 shrink-0" aria-hidden="true" />}
                  <span className="flex-1">{c.name}</span>
                  <span className="text-slate">+{c.dial}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
