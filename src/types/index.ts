export type CategorySlug = "commercial" | "residential" | "pre-rented";

export type ProjectStatus =
  | "New Launch"
  | "Under Construction"
  | "Ready to Move"
  | "Pre-Leased";

export interface Category {
  slug: CategorySlug;
  name: string;
  headline: string;
  description: string;
  card?: MediaImage;
  banner?: MediaImage;
}

/** Image slots. `src` is optional: without it a placeholder illustration is drawn.
 *  When Supabase Storage is connected, put the public URL here. */
export interface MediaImage {
  src?: string;
  alt: string;
  caption?: string;
}

export interface Builder {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  overview: string;
  location: string;
  logo?: string;
  cover?: MediaImage;
}

export interface FloorPlan {
  name: string;
  areaSqFt: string;
  note?: string;
  image?: MediaImage;
}

export interface Project {
  slug: string;
  name: string;
  builderSlug: string;
  category: CategorySlug;
  locationSlug: string;
  propertyType: string;
  status: ProjectStatus;
  /** Price in crore (for the budget filter). Omit when price is not supplied. */
  priceMinCr?: number;
  priceMaxCr?: number;
  priceLabel: string;
  configuration: string[];
  overview: string;
  amenities: string[];
  specifications: { label: string; value: string }[];
  floorPlans?: FloorPlan[];
  gallery: MediaImage[];
  reraId?: string;
  featured?: boolean;
}

export interface Location {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  cover?: MediaImage;
}

export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  date: string;
  body: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface Service {
  title: string;
  description: string;
  icon: "search" | "scale" | "key" | "trending" | "file" | "handshake";
}

export interface EnquiryInput {
  name: string;
  phone: string;
  email: string;
  project: string;
  message: string;
}
