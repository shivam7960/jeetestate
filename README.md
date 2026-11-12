# JEET ESTATE CONSULTANT

Next.js (App Router, TypeScript, Tailwind v4). Flow: **Category → Builders → Builder details → Builder projects → Project details → Enquiry**.

## Run
    npm install
    npm run dev      # development
    npm run build    # production build

## Before launch
1. **Hero video**: replace `/public/videos/hero-drone.mp4` with your licensed aerial Gurgaon footage (1920x1080+, H.264, under ~8 MB, 15-30 s loop). Replace `/public/images/hero-poster.jpg` with a frame from it.
2. **Sample data**: everything in `src/data/` is fictional placeholder content. Replace builders, projects, prices, testimonials and insights. Set `SITE.sampleData = false` in `src/data/site.ts` to remove the "sample" labels.
3. **Contact details**: copy `.env.example` to `.env.local` and set phone, WhatsApp and email.
4. **Enquiries are not stored.** `src/lib/enquiries.ts` only prepares a WhatsApp/email message. Connect Supabase there.
5. **Images**: add `src` to any `MediaImage` (gallery, cover). Without `src` an illustrated placeholder is drawn.

## Structure
- `src/data/*`: all content (swap for Supabase queries later; helpers in `src/lib/data.ts`)
- `src/components/projects/CategoryPage.tsx`: single template behind `/projects/commercial|residential|pre-rented`
- `src/app/builders/[slug]`, `src/app/projects/[slug]`: dynamic pages generated from data
