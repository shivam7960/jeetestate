import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import LegalDocument, { type LegalSection } from "@/components/common/LegalDocument";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms for using the ${SITE.name} website.`,
  alternates: { canonical: "/terms" },
};

const UPDATED = "19 November 2026";
const ADDRESS = process.env.NEXT_PUBLIC_ADDRESS;

const SECTIONS: LegalSection[] = [
  {
    title: "About this website",
    paragraphs: [
      `This website is run by ${SITE.name}, a real estate advisory service for ${SITE.market}. We help buyers and investors compare builders and projects. We are not the developer or the seller of the properties listed here, unless a page says so clearly.`,
      "By using this website you agree to these terms. If you do not agree, please do not use it.",
    ],
  },
  {
    title: "Information is for guidance only",
    paragraphs: [
      "Details about builders and projects, such as location, configuration, status and descriptions, are compiled from builder websites and public sources. They may be incomplete or out of date, and they can change without notice.",
    ],
    bullets: [
      "Nothing on this website is an offer, an invitation to invest or a legally binding advertisement.",
      "Prices marked \"Price on request\" are not quoted here. Please ask us for current details.",
      "Images, artist impressions and plans are for illustration. The actual project may differ.",
      "Please confirm every detail with the developer in writing before you pay any money.",
    ],
  },
  {
    title: "Please verify RERA and approvals",
    paragraphs: [
      "Before you book any property, check the project's registration, approvals and promoter details on the official Haryana RERA website (haryanarera.gov.in). Any registration numbers shown on this website are given for reference and should be checked there.",
    ],
  },
  {
    title: "Not professional advice",
    paragraphs: [
      "Our content and advice are general guidance. They are not legal, financial or tax advice. For decisions about money and documents, please speak to a qualified lawyer or advisor.",
    ],
  },
  {
    title: "Enquiries",
    paragraphs: [
      "Sending an enquiry through this website does not create a contract or any obligation for you or for us. How we handle the details you send is explained in our Privacy Policy.",
    ],
  },
  {
    title: "Third-party names, logos and images",
    paragraphs: [
      "Names, logos and images of developers and projects belong to their respective owners. We show them only to identify the developer or project. Unless we say so, this does not mean that the developer endorses us or that we are affiliated with them.",
    ],
  },
  {
    title: "Acceptable use",
    bullets: [
      "Do not send false or misleading enquiries or use another person's details.",
      "Do not copy, scrape or reuse our content in bulk without our written permission.",
      "Do not try to disrupt or gain unauthorised access to the website or its systems.",
    ],
  },
  {
    title: "Our content",
    paragraphs: [
      `The design, text and original material on this website belong to ${SITE.name}. You may view and share pages for your personal use, but you may not copy or republish them for commercial purposes without permission.`,
    ],
  },
  {
    title: "Limits of liability",
    paragraphs: [
      "We try to keep this website accurate and available, but we provide it as it is. To the extent the law allows, we are not responsible for losses that arise from relying on information on this website or from the website being unavailable. Nothing here limits any right you have under the law that cannot be limited.",
    ],
  },
  {
    title: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of India. Courts at Gurugram, Haryana will have jurisdiction over any dispute that arises from them.",
    ],
  },
  {
    title: "Changes to these terms",
    paragraphs: ["We may update these terms from time to time. The date at the top shows when they were last changed."],
  },
  {
    title: "Contact us",
    paragraphs: [
      <>
        Email: <a href={`mailto:${SITE.email}`} className="text-gold-deep underline underline-offset-4">{SITE.email}</a>. Phone: {SITE.phoneDisplay}.
        {ADDRESS ? ` Address: ${ADDRESS}.` : ""}
      </>,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        seed="terms"
        title="Terms of Use"
        intro="The terms for using this website."
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]}
      />
      <LegalDocument updated={UPDATED} sections={SECTIONS} />
    </>
  );
}
