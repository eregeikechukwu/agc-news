"use client";

import { useLatestStories } from "../../../app/stories/useStories";
import { useEffect, useState } from "react";
import { Story, StoryObject } from "@/src/lib/types/api-types";
import StoryCarouselTemplate from "../../stories/StoryCarouselTemplate";
import useScreenSize from "@/src/hooks/useScreenSize";

export default function LatestNews() {
  const [currentPage, setCurrentPage] = useState(1);
  const [stories, setStories] = useState<Story[]>([]);

  const { isMobile, isTablet } = useScreenSize();

  const { isPending, data, error } = useLatestStories(currentPage, 4);

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!isMobile && !isTablet) {
      setStories(data?.data || []);
    } else {
      setStories((stories) => [...stories, data?.data || []].flat());
    }
  }, [data, isMobile, isTablet]);

  return (
    <StoryCarouselTemplate
      data={data as StoryObject}
      stories={stories}
      error={error}
      isPending={isPending}
      title={"LATEST NEWS"}
      onChangePage={onChangePage}
      currentPage={currentPage}
    />
  );
}
