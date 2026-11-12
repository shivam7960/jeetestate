import type { Location } from "@/types";

/** Real Gurgaon corridors with deliberately generic descriptions. No prices or
 *  market figures. Add verified micro-market notes (distances, metro, schools)
 *  after checking official sources. */
const baseLocations: Location[] = [
  {
    slug: "golf-course-road",
    name: "Golf Course Road",
    tagline: "Established premium corridor",
    description:
      "One of Gurgaon's best-known corridors, running through sectors such as 42, 43, 53 and 54, with luxury residential towers, offices and retail. Several Rapid Metro stations serve the stretch.",
  },
  {
    slug: "golf-course-extension-road",
    name: "Golf Course Extension Road",
    tagline: "Residential and commercial growth corridor",
    description:
      "A corridor that continues from Golf Course Road towards Sohna Road, with housing, office parks and street retail developed side by side across sectors such as 61 to 69.",
  },
  {
    slug: "dwarka-expressway",
    name: "Dwarka Expressway",
    tagline: "Gurgaon to Delhi connector",
    description:
      "An expressway linking Gurgaon with Dwarka in Delhi and the airport side, with many new residential townships and group-housing projects in the sectors along it.",
  },
  {
    slug: "southern-peripheral-road",
    name: "Southern Peripheral Road (SPR)",
    tagline: "Link between major corridors",
    description:
      "A peripheral road in the south of Gurgaon that connects Golf Course Extension Road, Sohna Road and NH-48, with newer residential and commercial projects along its stretch.",
  },
  {
    slug: "sohna-road",
    name: "Sohna Road",
    tagline: "South Gurgaon corridor",
    description:
      "A long-standing corridor linking Gurgaon towards Sohna, with a mix of older and newer residential and commercial developments.",
  },
  {
    slug: "new-gurgaon",
    name: "New Gurgaon",
    tagline: "Newer sectors beyond the established city",
    description:
      "The newer sectors in the south-west of the city, around Dwarka Expressway and the roads towards Pataudi, with many recent launches and large townships.",
  },
  {
    slug: "nh-48",
    name: "NH-48",
    tagline: "Delhi–Jaipur highway frontage",
    description:
      "The main highway linking Gurgaon with Delhi and Jaipur. Sectors along it, such as Sector 31, are close to Cyber City and the city's central business areas.",
  },
  {
    slug: "mg-road",
    name: "MG Road",
    tagline: "Central Gurgaon",
    description:
      "A central road in Gurgaon with offices, retail and hospitality nearby, served by the Metro.",
  },
  {
    slug: "cyber-city",
    name: "Cyber City",
    tagline: "Corporate district",
    description:
      "A commercial and corporate district of Gurgaon, relevant for office and pre-leased investments.",
  },
];
export const locations: Location[] = baseLocations.map((l) => ({
  ...l,
  cover: {
    src: `/images/locations/${l.slug}-real-estate.jpg`,
    alt: `${l.name}, Gurgaon real estate corridor`,
  },
}));