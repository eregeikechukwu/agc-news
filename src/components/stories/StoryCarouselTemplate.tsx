"use client";

import { CategoryGroup } from "@/src/components/categories/categoryGroup";
import H1 from "@/src/components/UI/H1";
import PaginationTabs from "@/src/components/UI/PaginationTabs";
import { Story, StoryObject } from "@/src/lib/types/api-types";
import ErrorFallback from "../Fallbacks/ErrorFallback";
import { useEffect, useRef } from "react";
import useScreenSize from "@/src/hooks/useScreenSize";

export default function StoryCarouselTemplate({
  data,
  stories,
  error,
  isPending,
  title,
  currentPage,
  onChangePage,
}: {
  data: StoryObject;
  stories: Story[];
  error: Error | null;
  isPending: boolean;
  title: string;
  currentPage: number;
  onChangePage: (page: number) => void;
}) {
  const CarouselContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = CarouselContainer.current;

    if (!carousel) return;
    const handleScroll = () => {
      if (
        carousel.scrollLeft + carousel.clientWidth >=
        carousel.scrollWidth - 30
      ) {
        onChangePage(currentPage + 1);
      }
    };

    carousel.addEventListener("scroll", handleScroll);

    return () => carousel.removeEventListener("scroll", handleScroll);
  }, [CarouselContainer, currentPage, onChangePage]);

  return (
    <div className="md:my-[5.75rem] my-[2.9375rem]">
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
        {error ? (
          <ErrorFallback />
        ) : (
          <CategoryGroup
            ref={CarouselContainer}
            variant="horizontal"
            isPending={isPending}
            stories={(stories as Story[]) || []}
          />
        )}
      </div>
    </div>
  );
}
