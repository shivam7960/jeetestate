import { AsYouType, parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js/min";

export type CountryOption = { code: CountryCode; name: string; dial: string };

/** India first, then the countries most NRI and overseas buyers call from. */
export const COUNTRIES: CountryOption[] = [
  { code: "IN", name: "India", dial: "91" },
  { code: "AE", name: "United Arab Emirates", dial: "971" },
  { code: "US", name: "United States", dial: "1" },
  { code: "GB", name: "United Kingdom", dial: "44" },
  { code: "CA", name: "Canada", dial: "1" },
  { code: "AU", name: "Australia", dial: "61" },
  { code: "SG", name: "Singapore", dial: "65" },
  { code: "SA", name: "Saudi Arabia", dial: "966" },
  { code: "QA", name: "Qatar", dial: "974" },
  { code: "KW", name: "Kuwait", dial: "965" },
  { code: "OM", name: "Oman", dial: "968" },
  { code: "BH", name: "Bahrain", dial: "973" },
  { code: "DE", name: "Germany", dial: "49" },
  { code: "NZ", name: "New Zealand", dial: "64" },
];

export function isCountryCode(value: unknown): value is CountryCode {
  return COUNTRIES.some((c) => c.code === value);
}

/** Formats digits the way the country writes them, e.g. 98765 43210. */
export function formatNational(digits: string, country: CountryCode) {
  return new AsYouType(country).input(digits);
}

/** Returns the number in international E.164 form (+919876543210), or null if it is not a valid number. */
export function toE164(raw: string, country: CountryCode): string | null {
  const parsed = parsePhoneNumberFromString(raw, country);
  return parsed && parsed.isValid() ? parsed.number : null;
}

export { parsePhoneNumberFromString };
