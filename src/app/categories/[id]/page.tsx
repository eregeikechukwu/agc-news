import CategoriesPageWrapper from "@/src/components/wrappers/CategoriesPageWrapper";
import { CategoryPageProps } from "../categories.types";
import CategoryStoriesPage from "@/src/components/pages/categoryStoriesPage/CategoryStoriesPage";

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categoryId = params.id;

  return <CategoriesPageWrapper categoryId={categoryId} />;
}
