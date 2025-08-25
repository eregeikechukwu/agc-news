"use client";

import { CategoryStoriesPageProps } from "@/src/app/categories/categories.types";
import { Suspense } from "react";
import CategoryStoriesPage from "../pages/categoryStoriesPage/CategoryStoriesPage";
import CategoryPageSkeleton from "../skeletons/CategoryPageSkeleton";

export default function CategoriesPageWrapper({
  categoryId,
}: CategoryStoriesPageProps) {
  return (
    <Suspense fallback={<CategoryPageSkeleton />}>
      <CategoryStoriesPage categoryId={categoryId} />
    </Suspense>
  );
}
//  THe component is serving as a mediator to parse server props like params and pass them to the client components
