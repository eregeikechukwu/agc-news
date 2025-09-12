"use client";

import { CategoryStoriesPageProps } from "@/src/app/categories/categories.types";
import CategoryStoriesFetcher from "./CategoryStoriesFetcher";

export default function CategoryStoriesPage({
  categoryId,
}: CategoryStoriesPageProps) {
  return (
    <section>
      <h1 className="md:text-[2.63rem] text-[2.3rem] font-semibold md:mt-16 mt-8">
        Latest on {categoryId}
      </h1>
      <CategoryStoriesFetcher categoryKey={categoryId} />
    </section>
  );
}
