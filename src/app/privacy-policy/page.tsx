import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import LegalDocument, { type LegalSection } from "@/components/common/LegalDocument";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses and protects the details you share with us.`,
  alternates: { canonical: "/privacy-policy" },
};

const UPDATED = "19 November 2026";
const ADDRESS = process.env.NEXT_PUBLIC_ADDRESS;

const contactLine = (
  <>
    Email: <a href={`mailto:${SITE.email}`} className="text-gold-deep underline underline-offset-4">{SITE.email}</a>. Phone: {SITE.phoneDisplay}.
    {ADDRESS ? ` Address: ${ADDRESS}.` : ""}
  </>
);

const SECTIONS: LegalSection[] = [
  {
    title: "Who we are",
    paragraphs: [
      `${SITE.name} ("we", "us") is a real estate advisory service for buyers and investors in ${SITE.market}. This policy explains what personal information we collect through this website, why we collect it and what choices you have.`,
    ],
  },
  {
    title: "Information we collect",
    paragraphs: ["We collect only what is needed to respond to you:"],
    bullets: [
      "Details you enter in an enquiry form or popup: your name, mobile number (with country code), email address if you give one, the type of property you are looking for and any message you write.",
      "The project or page you were viewing when you sent the enquiry.",
      "Where your visit came from, such as the referring website or campaign tags in the link you clicked (for example utm_source, gclid or fbclid). These are kept in your browser for the visit and sent with your enquiry.",
      "Anything you share when you contact us by phone, WhatsApp or email.",
    ],
  },
  {
    title: "How we use your information",
    bullets: [
      "To call, message (SMS or WhatsApp) or email you about the properties and services you asked about.",
      "To understand which pages and campaigns lead to enquiries, so we can improve the website and our advice.",
      "To keep our records and to meet legal or regulatory requirements.",
    ],
    paragraphs: ["We do not sell your personal information."],
  },
  {
    title: "Your consent",
    paragraphs: [
      "By submitting an enquiry you agree that we may contact you using the details you gave, about that enquiry. You can withdraw your consent at any time by writing to us. After that we will stop contacting you for marketing and will delete your details unless the law requires us to keep them.",
    ],
  },
  {
    title: "Who we share it with",
    paragraphs: [
      "Your enquiry is received and stored using service providers that help us run this website and handle enquiries, such as website hosting, email delivery and spreadsheet or CRM tools. They may process your details only to provide those services to us.",
      "We may share your details with a developer or its sales team only when it is needed to arrange a site visit or answer your question about that developer's project. We may also disclose information when the law requires it.",
    ],
  },
  {
    title: "Cookies and browser storage",
    paragraphs: [
      "This website uses your browser's storage (local and session storage) for two things: remembering that you closed or answered the enquiry popup, so we do not show it again too soon, and keeping campaign tags for the length of your visit. If we add analytics or advertising tools in future, we will update this page.",
    ],
  },
  {
    title: "How long we keep your information",
    paragraphs: [
      "We keep enquiry details for as long as needed to respond to you and follow up, and for any period the law requires. You can ask us to delete them earlier.",
    ],
  },
  {
    title: "Security",
    paragraphs: [
      "We use reasonable safeguards to protect your information, including encrypted connections (HTTPS) and restricted access to the places where enquiries are stored. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    title: "Your rights",
    paragraphs: [
      "You may ask us to tell you what personal information we hold about you, to correct or update it, to erase it, or to withdraw your consent. You can also raise a complaint about how we handle your information. Write to us using the contact details below and we will respond within a reasonable time.",
    ],
  },
  {
    title: "Children",
    paragraphs: ["This website is meant for adults. We do not knowingly collect information from anyone under 18."],
  },
  {
    title: "Links to other websites",
    paragraphs: [
      "This website links to other services such as WhatsApp and developers' own websites. They have their own privacy practices and we are not responsible for them.",
    ],
  },
  {
    title: "Changes to this policy",
    paragraphs: ["We may update this policy from time to time. The date at the top shows when it was last changed."],
  },
  {
    title: "Contact us",
    paragraphs: [contactLine],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        seed="privacy-policy"
        title="Privacy Policy"
        intro="What we collect, why we collect it and the choices you have."
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <LegalDocument updated={UPDATED} sections={SECTIONS} />
    </>
  );
}
