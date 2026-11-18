"use client";

import type { ReactNode } from "react";
import type { Interest } from "@/lib/lead";

/** A button that opens the enquiry popup. Use it anywhere:
 *  <OpenEnquiryButton className="btn btn-gold">Enquire now</OpenEnquiryButton> */
export default function OpenEnquiryButton({
  children,
  className = "btn btn-gold",
  interest,
  project,
}: {
  children: ReactNode;
  className?: string;
  interest?: Interest;
  project?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry", { detail: { interest, project } }))}
    >
      {children}
    </button>
  );
}
