import CategoryPage, { categoryMetadata } from "@/components/projects/CategoryPage";

export const metadata = categoryMetadata("commercial");

export default function Page() {
  return <CategoryPage slug="commercial" />;
}
