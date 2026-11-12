import CategoryPage, { categoryMetadata } from "@/components/projects/CategoryPage";

export const metadata = categoryMetadata("residential");

export default function Page() {
  return <CategoryPage slug="residential" />;
}
