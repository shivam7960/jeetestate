import type { CategorySlug } from "@/types";

/** IMPORTANT: these are TYPICAL amenities by property type, used until you add the
 *  verified list for a project. Check each project's brochure or the builder's website
 *  and add the real list in PROJECT_AMENITIES below. */

const APARTMENT = [
  "24x7 Security",
  "CCTV Surveillance",
  "Car Parking",
  "Lifts",
  "Power Backup",
  "Club House",
  "Landscaped Gardens",
  "Fire Safety",
];

const VILLA = [
  "24x7 Security",
  "CCTV Surveillance",
  "Car Parking",
  "Power Backup",
  "Club House",
  "Landscaped Gardens",
  "Fire Safety",
];

const BUILDER_FLOOR = ["24x7 Security", "CCTV Surveillance", "Car Parking", "Power Backup"];

const COMMERCIAL = [
  "24x7 Security",
  "CCTV Surveillance",
  "Car Parking",
  "Lifts",
  "Power Backup",
  "Fire Safety",
];

/** Per-project override. Use the exact names from the icon list in AmenityCards.tsx
 *  (e.g. "Gymnasium", "Swimming Pool", "Children's Play Area", "Jogging Track",
 *  "Sports Facilities", "Community Hall", "Cafeteria", "Rainwater Harvesting",
 *  "High-Speed Internet"). Any other name still shows, with a tick icon. */
const PROJECT_AMENITIES: Record<string, string[]> = {
  // "dlf-the-camellias": ["24x7 Security", "Club House", "Swimming Pool", "Gymnasium"],
};

export function amenitiesFor(slug: string, category: CategorySlug, propertyType: string): string[] {
  const custom = PROJECT_AMENITIES[slug];
  if (custom) return custom;
  if (category !== "residential") return COMMERCIAL;
  if (propertyType === "Villa") return VILLA;
  if (propertyType === "Builder Floor") return BUILDER_FLOOR;
  return APARTMENT;
}