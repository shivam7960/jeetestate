import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { SITE } from "@/data/site";
import EnquiryPopupHost from "@/components/enquiry/EnquiryPopupHost";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "JEET ESTATE CONSULTANT | Luxury Real Estate in Gurgaon",
    template: "%s | JEET ESTATE CONSULTANT",
  },
  description:
    "Discover residential, commercial and pre-rented properties in Gurgaon, Delhi NCR with JEET ESTATE CONSULTANT.",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "JEET ESTATE CONSULTANT | Luxury Real Estate in Gurgaon",
    description: "Residential, commercial and pre-rented properties in Gurgaon, Delhi NCR.",
  },
};

export const viewport: Viewport = { themeColor: "#0f1b2a" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-gold focus:px-4 focus:py-2 focus:text-ink">
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <EnquiryPopupHost />
      </body>
    </html>
  );
}
