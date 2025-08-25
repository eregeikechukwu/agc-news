"use client";

import { useMemo } from "react";
import { CategoryStoriesPageProps } from "@/src/app/categories/categories.types";
import { useCategories } from "@/src/app/stories/useStories";
import TopStoriesSkeleton from "../../skeletons/TopStoriesSkeleton";
import CategoryStoriesFetcher from "./CategoryStoriesFetcher";
import useMappedCategoryKey from "@/src/hooks/useMappedCategoryKey";

export default function CategoryStoriesPage({
  categoryId,
}: CategoryStoriesPageProps) {
  return (
    <section>
      <h1 className="text-[2.63rem] mt-16">Latest in {categoryId}</h1>
      <CategoryStoriesFetcher categoryKey={categoryId} />
    </section>
  );
}
