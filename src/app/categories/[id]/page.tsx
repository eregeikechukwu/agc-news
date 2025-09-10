import CategoriesPageWrapper from "@/src/components/wrappers/CategoriesPageWrapper";
// import { CategoryPageProps } from "../categories.types";
// import CategoryStoriesPage from "@/src/components/pages/categoryStoriesPage/CategoryStoriesPage";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: categoryId } = await params;

  return <CategoriesPageWrapper categoryId={categoryId} />;
}
