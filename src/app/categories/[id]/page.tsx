import CategoriesPageWrapper from "@/src/components/wrappers/CategoriesPageWrapper";
import { Category } from "@/src/lib/types/api-types";
import { Metadata } from "next";
// import { CategoryPageProps } from "../categories.types";
// import CategoryStoriesPage from "@/src/components/pages/categoryStoriesPage/CategoryStoriesPage";

const categoryList = [
  { id: "politics" },
  { id: "business" },
  { id: "entertainment" },
  { id: "sports" },
  { id: "tech" },
  { id: "opinion" },
];

export function generateStaticParams() {
  return categoryList;
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> => {
  const categoryId = (await params).id;

  const response = await fetch(
    "https://api.agcnewsnet.com/api/general/categories"
  );
  const categories = await response.json();
  const category: Category = categories.data.data.find(
    (category: Category) =>
      categoryId.toString().toLowerCase() ===
      category?.category_name?.toString().toLowerCase()
  );

  return {
    title: category ? `Latest in ${category.category_name}` : "Latest News",
  };
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: categoryId } = await params;

  return (
    <html>
      <head>
        <meta
          name="google-site-verification"
          content="googlea264a916086e83a6"
        />
      </head>
      <body>
        <CategoriesPageWrapper categoryId={categoryId} />
      </body>
    </html>
  );
}
