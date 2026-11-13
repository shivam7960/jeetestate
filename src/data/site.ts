import type { Category, Service } from "@/types";

export const SITE = {
  name: "JEET ESTATE CONSULTANT",
  shortName: "Jeet Estate",
  market: "Gurgaon, Delhi NCR",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Project and builder data in /src/data is real, researched content. Prices and
   *  RERA numbers marked "to be verified" must be confirmed before launch. */
  sampleData: false,
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+91 00000 00000",
  phoneTel: process.env.NEXT_PUBLIC_PHONE_TEL ?? "+910000000000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "910000000000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@example.com",
  contactIsPlaceholder: !process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
} as const;

const baseCategories: Category[] = [
  {
    slug: "residential",
    name: "Residential",
    headline: "Residential projects in Gurgaon",
    description:
      "Apartments, penthouses, builder floors and villas from leading developers active in Gurgaon. Choose a builder to see every project they offer.",
  },
  {
    slug: "commercial",
    name: "Commercial",
    headline: "Commercial projects in Gurgaon",
    description:
      "Office towers, retail space and mixed-use developments. Choose a builder to see the commercial projects they offer.",
  },
  {
    slug: "pre-rented",
    name: "Pre-Rented",
    headline: "Pre-rented properties in Gurgaon",
    description:
      "Leased office units with tenants in place. Lease terms and rent vary by unit, so we help you verify them before you decide.",
  },
];
export const CATEGORIES: Category[] = baseCategories.map((c) => ({
  ...c,
  card: {
    src: `/images/categories/${c.slug}-properties-gurgaon-card.jpg`,
    alt: `${c.name} properties in Gurgaon`,
  },
  banner: {
    src: `/images/categories/${c.slug}-properties-gurgaon-banner.jpg`,
    alt: `${c.name} properties in Gurgaon`,
  },
}));

export const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/projects#all-projects" },
  { name: "Projects", href: "/projects", children: true },
  { name: "Builders", href: "/builders" },
  { name: "Locations", href: "/locations" },
  { name: "About Us", href: "/about" },
  { name: "Insights", href: "/insights" },
  { name: "Contact Us", href: "/contact" },
] as const;

export const SERVICES: Service[] = [
  {
    title: "Property search and shortlisting",
    description:
      "Tell us your budget, location and purpose. We shortlist projects that fit and arrange site visits.",
    icon: "search",
  },
  {
    title: "Builder and project due diligence",
    description:
      "We help you check Haryana RERA registration, approvals, track record and paperwork before you commit.",
    icon: "scale",
  },
  {
    title: "Pre-rented property advisory",
    description:
      "Understand lease terms, tenant profile and rental yield on leased commercial assets.",
    icon: "key",
  },
  {
    title: "Investment guidance",
    description:
      "Compare options across residential and commercial categories against your goals.",
    icon: "trending",
  },
  {
    title: "Documentation support",
    description:
      "Guidance through agreements, payment schedules and registration steps.",
    icon: "file",
  },
  {
    title: "Negotiation and closing",
    description:
      "We represent your interests with builders and sellers through to possession.",
    icon: "handshake",
  },
];