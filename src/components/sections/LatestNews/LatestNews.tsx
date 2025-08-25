"use client";

import { CategoryGroup } from "@/src/components/categories/categoryGroup";
import { useLatestStories } from "../../../app/stories/useStories";
import H1 from "@/src/components/UI/H1";
import PaginationTabs from "@/src/components/UI/PaginationTabs";
import { useState } from "react";
import LatestNewsSkeleton from "@/src/components/skeletons/LatestStoriesSkeleton";
import { Story, StoryObject } from "@/src/lib/types/api-types";
import StoryCarouselTemplate from "../../stories/StoryCarouselTemplate";

export default function LatestNews() {
  const [currentPage, setCurrentPage] = useState(1);

  const { isPending, data, error } = useLatestStories(currentPage, 4);

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <StoryCarouselTemplate
      data={data as StoryObject}
      error={error}
      isPending={isPending}
      title={"LATEST NEWS"}
      onChangePage={onChangePage}
      currentPage={currentPage}
    />
  );
}
