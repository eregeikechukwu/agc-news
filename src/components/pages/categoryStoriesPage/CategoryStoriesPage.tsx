"use client";

import { CategoryStoriesPageProps } from "@/src/app/categories/categories.types";
import CategoryStoriesFetcher from "./CategoryStoriesFetcher";

export default function CategoryStoriesPage({
  categoryId,
}: CategoryStoriesPageProps) {
  return (
    <section>
      <h1 className="text-[2.63rem] font-semibold md:mt-16 mt-8">
        Latest in {categoryId}
      </h1>
      <CategoryStoriesFetcher categoryKey={categoryId} />
    </section>
  );
}
