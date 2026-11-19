import type { MediaImage, Project } from "@/types";
import { amenitiesFor } from "./amenities";

/** Real Gurgaon projects. Sector, status and configuration are cross-checked from
 *  builder websites and multiple listings. Prices are NOT shown ("Price on request")
 *  until verified. RERA numbers appear only where published on the builder site or
 *  in two or more sources; verify all on https://haryanarera.gov.in/ before launch.
 *  Last reviewed: 9 Nov 2026. */

/** Jin projects ki images save ho chuki hain, unka slug aur uske views yahan likhein.
 *  File ka path: /images/projects/<slug>/<slug>-<view>-gurgaon.jpg */
const IMAGE_PROJECTS: Record<string, string[]> = {
  // DLF
  "dlf-the-camellias": ["exterior", "clubhouse", "interior"],
  "dlf-the-magnolias": ["exterior", "clubhouse", "interior"],
  "dlf-the-aralias": ["exterior", "clubhouse", "interior"],
  "dlf-the-crest": ["exterior", "clubhouse", "interior"],
  "dlf-the-arbour": ["exterior", "clubhouse", "interior"],
  "dlf-the-dahlias": ["exterior", "clubhouse", "interior"],
  // M3M
  "m3m-golf-estate": ["exterior", "clubhouse", "interior"],
  "m3m-merlin": ["exterior", "clubhouse", "interior"],
  "m3m-golf-hills": ["exterior", "clubhouse", "interior"],
  "m3m-cosmopolitan": ["exterior", "lobby", "interior"],
  "m3m-urbana": ["exterior", "lobby", "interior"],
  "m3m-ifc-pre-leased-offices": ["exterior", "lobby", "interior"],
    // Emaar
  "emaar-digital-greens": ["exterior", "lobby", "interior"],
  "emaar-capital-towers": ["exterior", "lobby", "interior"],
  "emaar-digital-greens-pre-leased-offices": ["exterior", "lobby", "interior"],
  "emaar-gurgaon-greens": ["exterior", "clubhouse", "interior"],
  "emaar-emerald-hills": ["exterior", "clubhouse", "interior"],
  "emaar-marbella": ["exterior", "clubhouse", "interior"],
};

const VIEW_CAPTIONS: Record<string, string> = {
  exterior: "Exterior",
  clubhouse: "Clubhouse and amenities",
  lobby: "Lobby and reception",
  interior: "Interior",
};

const gallery = (slug: string, name: string): MediaImage[] => {
  const views = IMAGE_PROJECTS[slug];
  if (!views) return [{ alt: `${name} exterior`, caption: "Exterior" }];
  return views.map((key) => ({
    src: `/images/projects/${slug}/${slug}-${key}-gurgaon.jpg`,
    alt: `${name} ${VIEW_CAPTIONS[key].toLowerCase()}, Gurgaon`,
    caption: VIEW_CAPTIONS[key],
  }));
};

type Spec = { label: string; value: string };

const make = (
  builderSlug: string,
  slug: string,
  name: string,
  category: Project["category"],
  locationSlug: Project["locationSlug"],
  propertyType: Project["propertyType"],
  status: Project["status"],
  configuration: string[],
  sector: string,
  overview: string,
  specs: Spec[] = [],
  featured = false,
): Project => ({
  slug,
  name,
  builderSlug,
  category,
  locationSlug,
  propertyType,
  status,
  priceLabel: "Price on request",
  configuration,
  overview,
  amenities: amenitiesFor(slug, category, propertyType),
  specifications: [
  { label: "Sector / location", value: sector },
  ...specs,
  { label: "RERA and possession", value: "To be verified" },
].filter((s) => !s.value.toLowerCase().startsWith("to be")),
  gallery: gallery(slug, name),
  ...(featured ? { featured: true } : {}),
});

const TBC: Spec = { label: "Construction status", value: "To be confirmed" };

export const projects: Project[] = [
  // ================= DLF =================
  make("dlf", "dlf-the-camellias", "DLF The Camellias", "residential", "golf-course-road", "Apartment", "Ready to Move", ["4 BHK", "Penthouse"], "Sector 42, Golf Course Road",
    "Ultra-luxury, low-density residences on Golf Course Road with very large apartments. A completed, occupied development.", [], true),
  make("dlf", "dlf-the-magnolias", "DLF The Magnolias", "residential", "golf-course-road", "Apartment", "Ready to Move", ["4 BHK", "5 BHK", "Penthouse"], "Sector 42, Golf Course Road",
    "Luxury estate on Golf Course Road with 4 and 5 BHK apartments and penthouses. A completed project.", [], true),
  make("dlf", "dlf-the-aralias", "DLF The Aralias", "residential", "golf-course-road", "Apartment", "Ready to Move", ["Apartments"], "Sector 42, Golf Course Road",
    "One of the earliest golf-facing luxury residential complexes on Golf Course Road. A completed project."),
  make("dlf", "dlf-the-crest", "DLF The Crest", "residential", "golf-course-road", "Apartment", "Ready to Move", ["Apartments"], "Sector 54, Golf Course Road",
    "Luxury residential project on Golf Course Road. A completed project."),
  make("dlf", "dlf-the-arbour", "DLF The Arbour", "residential", "golf-course-extension-road", "Apartment", "Under Construction", ["4 BHK"], "Sector 63, Golf Course Extension Road",
    "High-rise luxury residences spread over about 25 acres. Listed as an ongoing project in DLF's own investor presentation.",
    [{ label: "Land area", value: "Approx. 25 acres" }], true),
  make("dlf", "dlf-the-dahlias", "DLF The Dahlias", "residential", "golf-course-road", "Apartment", "New Launch", ["4 BHK", "5 BHK"], "Sector 54, Golf Course Road",
    "Recent ultra-luxury launch on Golf Course Road with very large 4 and 5 BHK residences.", [], true),

  // ================= M3M =================
  make("m3m", "m3m-golf-estate", "M3M Golf Estate", "residential", "golf-course-extension-road", "Apartment", "Ready to Move", ["3 BHK"], "Sector 65, Golf Course Extension Road",
    "Residential community with in-city golf frontage, delivered in 2017 as part of M3M's early residential projects.", [], true),
  make("m3m", "m3m-merlin", "M3M Merlin", "residential", "golf-course-extension-road", "Apartment", "Ready to Move", ["3 BHK"], "Sector 67, Golf Course Extension Road",
    "Group housing project delivered in 2017 (occupation certificate dated July 2017)."),
  make("m3m", "m3m-golf-hills", "M3M Golf Hills", "residential", "golf-course-extension-road", "Apartment", "Under Construction", ["4 BHK"], "Sector 79",
    "Luxury residential project (Phase 1 and 2) with 4 BHK residences."),
  make("m3m", "m3m-cosmopolitan", "M3M Cosmopolitan", "commercial", "golf-course-extension-road", "Retail Shop", "Ready to Move", ["Retail shops", "Office units"], "Sector 66, Golf Course Extension Road",
    "Commercial colony with retail and office space, the first street-retail development on Golf Course Extension Road. Delivered in November 2016."),
  make("m3m", "m3m-urbana", "M3M Urbana", "commercial", "golf-course-extension-road", "Office Space", "Ready to Move", ["Office units", "Retail shops"], "Sector 67, Golf Course Extension Road",
    "Integrated mixed-use commercial development with offices and retail, delivered in February 2017.", [], true),
  make("m3m", "m3m-ifc-pre-leased-offices", "M3M IFC (Pre-Leased Offices)", "pre-rented", "golf-course-extension-road", "Office Space", "Pre-Leased", ["Leased office units"], "Sector 66, Golf Course Extension Road",
    "M3M International Financial Centre. Pre-leased office units are listed for sale; tenant, rent and lease terms must be verified for each unit."),

  // ================= EMAAR =================
  make("emaar", "emaar-digital-greens", "Emaar Digital Greens", "commercial", "golf-course-extension-road", "Office Space", "Ready to Move", ["Office units", "Commercial shops"], "Sector 61, Golf Course Extension Road",
    "LEED-certified integrated IT park with two office towers. Emaar India received the occupancy certificate in April 2017.", [], true),
  make("emaar", "emaar-capital-towers", "Emaar Capital Towers", "commercial", "mg-road", "Office Space", "Ready to Move", ["Office spaces"], "Sector 26, MG Road",
    "Office tower on MG Road, listed on Emaar's own website. Registered with Haryana RERA."),
  make("emaar", "emaar-digital-greens-pre-leased-offices", "Emaar Digital Greens (Pre-Leased Offices)", "pre-rented", "golf-course-extension-road", "Office Space", "Pre-Leased", ["Leased office units"], "Sector 61, Golf Course Extension Road",
    "Pre-leased office units in Digital Greens are widely listed for sale. Tenant, rent and lease terms must be verified for each unit."),
  make("emaar", "emaar-gurgaon-greens", "Emaar Gurgaon Greens", "residential", "dwarka-expressway", "Apartment", "Ready to Move", ["Apartments"], "Sector 102",
    "Residential township by Emaar India in Sector 102.", [TBC]),
  make("emaar", "emaar-emerald-hills", "Emaar Emerald Hills", "residential", "golf-course-extension-road", "Villa", "Ready to Move", ["Plots", "Villas"], "Sector 65, Golf Course Extension Road",
    "Plotted and villa township by Emaar India.", [TBC]),
  make("emaar", "emaar-marbella", "Emaar Marbella", "residential", "golf-course-extension-road", "Villa", "Ready to Move", ["Villas"], "Sector 66, Golf Course Extension Road",
    "Villa community by Emaar India.", [TBC]),

  // ================= GODREJ PROPERTIES =================
  make("godrej-properties", "godrej-aristocrat", "Godrej Aristocrat", "residential", "golf-course-extension-road", "Apartment", "Under Construction", ["Apartments"], "Sector 49, Golf Course Extension Road",
    "Forest-themed luxury residences on Golf Course Extension Road. Registered with Haryana RERA."),
  make("godrej-properties", "godrej-astra", "Godrej Astra", "residential", "golf-course-road", "Apartment", "Under Construction", ["Apartments"], "Sector 54, Golf Course Road",
    "Ultra-luxury project with 252 homes on 2.76 acres.", [{ label: "Land area", value: "2.76 acres" }, { label: "Total homes", value: "252" }], true),
  make("godrej-properties", "godrej-miraya", "Godrej Miraya", "residential", "golf-course-road", "Apartment", "Under Construction", ["Apartments"], "Sector 43, Golf Course Road",
    "Ultra-luxury residences on Golf Course Road, with possession reported around 2028."),
  make("godrej-properties", "godrej-summit", "Godrej Summit", "residential", "dwarka-expressway", "Apartment", "Ready to Move", ["2 BHK", "3 BHK", "4 BHK"], "Sector 104, Dwarka Expressway",
    "Completed residential project on Dwarka Expressway."),
  make("godrej-properties", "godrej-icon", "Godrej Icon", "residential", "dwarka-expressway", "Apartment", "Ready to Move", ["2 BHK", "3 BHK"], "Sector 88A, Dwarka Expressway",
    "Nine towers on about 9 acres, including a 32-storey tower, off Dwarka Expressway.", [{ label: "Land area", value: "Approx. 9 acres" }, { label: "Towers", value: "9" }]),
  make("godrej-properties", "godrej-vrikshya", "Godrej Vrikshya", "residential", "dwarka-expressway", "Apartment", "Under Construction", ["Apartments"], "Sector 103, Dwarka Expressway",
    "Residential project on Dwarka Expressway."),

  // ================= SIGNATURE GLOBAL =================
  make("signature-global", "signature-global-titanium-spr", "Signature Global Titanium SPR", "residential", "southern-peripheral-road", "Apartment", "Under Construction", ["3 BHK", "4 BHK"], "Sector 71, Southern Peripheral Road",
    "Premium group-housing project in Signature Global's SPR estate. Sizes listed from about 2,780 to 3,780 sq ft.",
    [{ label: "RERA No. (as listed on portals; verify)", value: "GGM/831/563/2024/58 dated 03-06-2024" }], true),
  make("signature-global", "signature-global-cloverdale-spr", "Signature Global Cloverdale SPR", "residential", "southern-peripheral-road", "Apartment", "Under Construction", ["3 BHK", "4 BHK"], "Sector 71, Southern Peripheral Road",
    "Premium residential project in the SG SPR Estate. Sizes listed from about 2,095 to 3,480 sq ft.",
    [{ label: "RERA No. (as listed on portals; verify)", value: "RC/REP/HARERA/GGM/955/687/2025/58" }], true),
  make("signature-global", "signature-global-deluxe-dxp", "Signature Global Deluxe DXP", "residential", "dwarka-expressway", "Apartment", "Under Construction", ["3 BHK", "3.5 BHK", "4 BHK"], "Sector 37D, Dwarka Expressway",
    "Premium high-rise residences launched in 2024 on Dwarka Expressway."),
  make("signature-global", "signature-global-city-37d", "Signature Global City 37D", "residential", "dwarka-expressway", "Apartment", "Ready to Move", ["2 BHK", "3 BHK"], "Sector 37D, Dwarka Expressway",
    "Mid-income housing; Phase 1 is reported as ready to move and Phase 2 as under construction.", [{ label: "Note", value: "Phase 2 still under construction" }]),
  make("signature-global", "signature-global-city-92", "Signature Global City 92", "residential", "new-gurgaon", "Builder Floor", "Under Construction", ["Independent floors"], "Sector 92, New Gurgaon",
    "Independent floors in New Gurgaon, launched in 2021."),
  make("signature-global", "signature-global-daxin-vistas", "Signature Global Daxin Vistas", "residential", "sohna-road", "Builder Floor", "Under Construction", ["3 BHK", "3.5 BHK"], "Sohna, Gurugram",
    "Township with premium independent floors, launched in 2024."),

  // ================= SOBHA =================
  make("sobha", "sobha-city", "Sobha City", "residential", "dwarka-expressway", "Apartment", "Ready to Move", ["4 BHK", "5 BHK"], "Sector 108, Dwarka Expressway",
    "Urban park residences with a 90 m cricket ground, spread over 39 acres. Listed as sold out on Sobha's website.", [{ label: "Land area", value: "39 acres" }], true),
  make("sobha", "sobha-altus", "Sobha Altus", "residential", "dwarka-expressway", "Apartment", "Under Construction", ["4 BHK", "5 BHK"], "Sector 106, Dwarka Expressway",
    "Ultra-luxe high-rise residences on Dwarka Expressway.",
    [{ label: "RERA No. (Sobha website)", value: "RC/REP/HARERA/GGM/828/560/2024/55 dated 27/05/2024" }], true),
  make("sobha", "sobha-international-city", "Sobha International City", "residential", "dwarka-expressway", "Villa", "Ready to Move", ["Villas"], "Sector 109, Dwarka Expressway",
    "Villa township of roughly 150 acres. Listed as sold out on Sobha's website.", [{ label: "Land area", value: "Approx. 150 acres" }]),
  make("sobha", "sobha-aranya", "Sobha Aranya", "residential", "new-gurgaon", "Apartment", "Under Construction", ["3 BHK", "4 BHK"], "Sector 80, Karma Lakelands",
    "Eco-luxe residences inside the 270-acre Karma Lakelands."),
  make("sobha", "sobha-crescent", "Sobha Crescent", "residential", "golf-course-extension-road", "Apartment", "Under Construction", ["Apartments"], "Sector 63A, Golf Course Extension Road",
    "Luxury residences near the Aravalli views on Golf Course Extension Road."),
  make("sobha", "sobha-strada", "Sobha Strada", "residential", "dwarka-expressway", "Apartment", "Under Construction", ["Serviced apartments"], "Sector 106, Dwarka Expressway",
    "Curated serviced apartments near Dwarka Expressway."),

  // ================= CENTRAL PARK =================
  make("central-park", "central-park-belanova", "Central Park Belanova", "residential", "sohna-road", "Apartment", "New Launch", ["Luxury residences"], "Within Central Park Resorts, Sohna Road",
    "Ultra-luxury, low-density vertical estate with 124 residences, launched in February 2026 inside the 47+ acre Central Park Resorts ecosystem.", [{ label: "Total residences", value: "124" }], true),
  make("central-park", "central-park-resorts", "Central Park Resorts", "residential", "sohna-road", "Apartment", "Ready to Move", ["Apartments"], "Sohna Road",
    "Resort-style residential ecosystem of 47+ acres.", [TBC]),
  make("central-park", "central-park-flower-valley", "Central Park Flower Valley", "residential", "sohna-road", "Apartment", "Ready to Move", ["Apartments"], "Sohna Road",
    "Residential community including Selene and Bignonia Towers.", [TBC]),
  make("central-park", "central-park-delphine", "Central Park Delphine", "residential", "dwarka-expressway", "Apartment", "Under Construction", ["Apartments"], "Dwarka Expressway",
    "Central Park's residential project on Dwarka Expressway.", [TBC]),
  make("central-park", "central-park-i", "Central Park I", "residential", "golf-course-road", "Apartment", "Ready to Move", ["Apartments"], "Sector 42, Golf Course Road",
    "Central Park's residential project on Golf Course Road."),

  // ================= BIRLA ESTATES =================
  make("birla-estates", "birla-navya", "Birla Navya", "residential", "golf-course-extension-road", "Apartment", "Under Construction", ["Apartments"], "Sector 63A, Golf Course Extension Road",
    "Joint venture between Birla Estates and Anant Raj Limited. Confirm the legal promoter on Haryana RERA.", [TBC]),
  make("birla-estates", "birla-navya-avik", "Birla Navya Avik", "residential", "golf-course-extension-road", "Apartment", "Under Construction", ["4 BHK"], "Sector 63A, Golf Course Extension Road",
    "IGBC Gold-themed residences close to the Sector 55-56 Rapid Metro station."),
  make("birla-estates", "birla-arika", "Birla Arika", "residential", "nh-48", "Apartment", "Under Construction", ["4 BHK"], "Sector 31, NH-48",
    "Luxury low-density development in central Gurugram opposite Cyber City. Phase 2 launched in 2026 with about 97% of open units sold within a month.", [], true),
  make("birla-estates", "birla-pravaah", "Birla Pravaah", "residential", "southern-peripheral-road", "Apartment", "Under Construction", ["3 BHK", "3 BHK + U"], "Sector 71, Southern Peripheral Road",
    "Residential project off SPR; all 492 units were sold within 24 hours of launch (December 2025).", [{ label: "Total units", value: "492" }]),

  // ================= EXPERION =================
  make("experion", "experion-the-trillion", "Experion The Trillion", "residential", "sohna-road", "Apartment", "Under Construction", ["3 BHK", "4 BHK"], "Sector 48, Sohna Road",
    "Luxury towers on about 5.5 acres, with possession reported around 2030.", [{ label: "Land area", value: "5.5 acres" }], true),
  make("experion", "experion-one42", "Experion One42", "residential", "golf-course-road", "Apartment", "Under Construction", ["4 BHK"], "Sector 42, Golf Course Road",
    "Ultra-luxury low-density project with 110 units on about 3.42 acres.", [{ label: "Land area", value: "3.42 acres" }, { label: "Total units", value: "110" }]),
  make("experion", "experion-windchants", "Experion Windchants", "residential", "dwarka-expressway", "Apartment", "Ready to Move", ["2 BHK", "3 BHK", "4 BHK", "5 BHK"], "Bajghera Road",
    "Residential community off Dwarka Expressway.", [TBC]),
  make("experion", "experion-cascades", "Experion Cascades", "residential", "dwarka-expressway", "Apartment", "New Launch", ["Apartments"], "Sector 88A, New Gurgaon",
    "Recently launched residential project in New Gurgaon."),
  make("experion", "experion-the-heartsong", "Experion The Heartsong", "residential", "dwarka-expressway", "Apartment", "Under Construction", ["Apartments"], "Sector to be verified",
    "Residential project by Experion Developers.", [TBC]),

  // ================= ATS =================
  make("ats-infrastructure", "ats-triumph", "ATS Triumph", "residential", "dwarka-expressway", "Apartment", "Ready to Move", ["3 BHK", "4 BHK"], "Sector 104",
    "Completed residential society offering 3 and 4 BHK homes."),
  make("ats-infrastructure", "ats-tourmaline", "ATS Tourmaline", "residential", "dwarka-expressway", "Apartment", "Ready to Move", ["Apartments"], "Sector 109 (to be verified)",
    "Completed project on about 10.4 acres.", [{ label: "Land area", value: "10.4 acres" }, { label: "RERA No. (as listed on portals; verify)", value: "41 of 2017" }]),
  make("ats-infrastructure", "ats-kocoon", "ATS Kocoon", "residential", "dwarka-expressway", "Apartment", "Ready to Move", ["Apartments"], "Sector 109, Dwarka Expressway",
    "Completed residences of 444 units along Dwarka Expressway.", [{ label: "Total units", value: "444" }]),
  make("ats-infrastructure", "ats-marigold", "ATS Marigold", "residential", "dwarka-expressway", "Apartment", "Ready to Move", ["3 BHK"], "Sector 89A",
    "Completed project with 504 units.", [{ label: "Total units", value: "504" }]),
  make("ats-infrastructure", "ats-grandstand", "ATS Grandstand", "residential", "dwarka-expressway", "Apartment", "Under Construction", ["Apartments"], "Sector 99A, Dwarka Expressway",
    "Residential project in Sector 99A, reported as on hold. Confirm the current status with the builder and RERA.", [{ label: "Note", value: "Reported as on hold" }]),

  // ================= SMARTWORLD =================
  make("smartworld", "smartworld-orchard", "Smartworld Orchard", "residential", "golf-course-extension-road", "Builder Floor", "Ready to Move", ["2 BHK", "3 BHK"], "Sector 61, Golf Course Extension Road",
    "Independent floors on about 23.3 acres; one of Smartworld's first projects, now handed over.", [{ label: "Land area", value: "Approx. 23.29 acres" }]),
  make("smartworld", "smartworld-gems", "Smartworld Gems", "residential", "dwarka-expressway", "Apartment", "Ready to Move", ["2 BHK", "3 BHK"], "Sector 89",
    "Low-rise residential development of about 52 acres, with handovers under way.", [{ label: "Land area", value: "Approx. 52 acres" }]),
  make("smartworld", "smartworld-the-edition", "Smartworld The Edition", "residential", "golf-course-extension-road", "Apartment", "Under Construction", ["Apartments"], "Sector 66",
    "High-rise luxury residences on about 10 acres.", [{ label: "RERA No. (as listed on portals; verify)", value: "GGM/756/488/2023/100" }]),
  make("smartworld", "smartworld-sky-arc", "Smartworld Sky Arc", "residential", "golf-course-extension-road", "Apartment", "Under Construction", ["3 BHK", "3.5 BHK", "4.5 BHK"], "Sector 69, Golf Course Extension Road",
    "Mixed-use luxury ecosystem on about 11.02 acres.", [{ label: "Land area", value: "Approx. 11.02 acres" }, { label: "RERA No. (as listed on portals; verify)", value: "GGM/878/610/2024/105" }]),
  make("smartworld", "smartworld-one-dxp", "Smartworld One DXP", "residential", "dwarka-expressway", "Apartment", "Under Construction", ["2 BHK", "3 BHK", "4 BHK"], "Sector 113, Dwarka Expressway",
    "High-rise residential project on about 16 acres.",
    [{ label: "Land area", value: "Approx. 16 acres" }, { label: "RERA No. (as listed on portals; verify)", value: "Phase 1: GGM/645/377/2022/120, Phase 2: GGM/842/574/2024/69" }], true),
  make("smartworld", "trump-residences-gurgaon", "Trump Residences Gurgaon", "residential", "golf-course-extension-road", "Apartment", "New Launch", ["Luxury residences"], "Sector 69, Golf Course Extension Road",
    "Branded residences by Smartworld with Tribeca Developers and The Trump Organization: two towers of up to 51 storeys with 298 residences, reported sold out on launch day.",
    [{ label: "Total residences", value: "298" }, { label: "Towers", value: "2" }], true),
];