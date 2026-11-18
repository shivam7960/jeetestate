import { AE, AU, BH, CA, DE, GB, IN, KW, NZ, OM, QA, SA, SG, US, type FlagComponent } from "country-flag-icons/react/3x2";

/** Real SVG flags. Emoji flags do not show on Windows, so we do not use them. */
export const FLAGS: Record<string, FlagComponent> = {
  IN, AE, US, GB, CA, AU, SG, SA, QA, KW, OM, BH, DE, NZ,
};
