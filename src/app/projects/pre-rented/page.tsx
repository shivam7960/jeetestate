import CategoryPage, { categoryMetadata } from "@/components/projects/CategoryPage";

export const metadata = categoryMetadata("pre-rented");

export default function Page() {
  return <CategoryPage slug="pre-rented" />;
}
