"use client";

import { CategoryGroup } from "@/src/components/categories/categoryGroup";
import H1 from "@/src/components/UI/H1";
import PaginationTabs from "@/src/components/UI/PaginationTabs";
import { useState } from "react";
import LatestNewsSkeleton from "@/src/components/skeletons/LatestStoriesSkeleton";
import { Story, StoryObject } from "@/src/lib/types/api-types";
import ErrorFallback from "../Fallbacks/ErrorFallback";

export default function StoryCarouselTemplate({
  data,
  error,
  isPending,
  title,
  currentPage,
  onChangePage,
}: {
  data: StoryObject;
  error: Error | null;
  isPending: boolean;
  title: string;
  currentPage: number;
  onChangePage: (page: number) => void;
}) {
  return (
    <div className="my-[5.75rem]">
      <div className="flex justify-between">
        <H1 highlight="#813D97">{title}</H1>
        <PaginationTabs
          variant="small"
          currentPage={currentPage}
          totalPages={data?.meta.last_page || 1}
          onChange={onChangePage}
        />
      </div>
      <div className="mt-7">
        {isPending ? (
          <LatestNewsSkeleton />
        ) : error ? (
          <ErrorFallback />
        ) : (
          <CategoryGroup
            variant="horizontal"
            stories={(data?.data as Story[]) || []}
          />
        )}
      </div>
    </div>
  );
}
