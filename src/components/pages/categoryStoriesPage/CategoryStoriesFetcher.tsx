"use client";
import ErrorFallback from "../../Fallbacks/ErrorFallback";
import styles from "./categoryStoryPage.module.scss";
import { StoryCard } from "@/src/components/stories/StoryCard/StoryCard";
import H1 from "../../UI/H1";
import CategoryStory from "../../categories/CategoryStory";
import PaginationTabs from "../../UI/PaginationTabs";
import Image from "next/image";
import CategoryPageSkeleton from "../../skeletons/CategoryPageSkeleton";
import { useCategoryVitals } from "@/src/hooks/useCategoryVitals";
import useMappedCategoryKey from "@/src/hooks/useMappedCategoryKey";
import NoStories from "../../Fallbacks/NoStories";
import useScreenSize from "@/src/hooks/useScreenSize";
import { useRef } from "react";

export default function CategoryStoriesFetcher({
  categoryKey,
}: {
  categoryKey: string;
}) {
  const {
    categoryKey: categoryId,
    isCategoryPending,
    categoryError,
    // isCategoryError,
  } = useMappedCategoryKey(categoryKey);

  const OtherStoriesRef = useRef<HTMLDivElement>(null);

  const { isMobile, isTablet } = useScreenSize();

  const {
    latestStories,
    otherStories,
    currentPage,
    totalItems,
    totalPages,
    isFirstPage,
    setCurrentPage,
    isFirstPending,
    isPagedPending,
    firstError,
    pagedError,
    isFirstError,
    isPagedError,
    ads,
  } = useCategoryVitals(categoryId);
  if (firstError || pagedError || isFirstError || isPagedError || categoryError)
    return <ErrorFallback />;

  if (
    isCategoryPending ||
    (isFirstPage && isFirstPending) ||
    (!isFirstPage && isPagedPending)
  )
    return <CategoryPageSkeleton />;

  if (!categoryId) return <NoStories title={categoryKey} />;

  const scrollToTop = () => {
    setTimeout(() => {
      if (otherStories && OtherStoriesRef.current) {
        window.scrollTo({
          top: OtherStoriesRef.current.offsetTop - 100,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 400);
  };

  //Ads
  function Ads() {
    return (
      <div className="lg:basis-[18.5rem] max-lg:mt-40 lg:w-fit w-full flex lg:flex-col flex-row lg:gap-10 gap-4">
        {ads.map((src, i) => (
          <Image
            key={i}
            src={src.toString() || "images/placeholder-image.jpg"}
            width={266}
            height={400}
            alt={`ad-${i}`}
            className="lg:w-full max-lg:object-contain h-auto imageEffect"
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className={`${styles.storygrid} md:mt-12 mt-8`}>
        {latestStories?.map((story, i) => (
          <StoryCard
            key={story.id}
            latest={i === 0}
            variant="grid"
            story={story}
          />
        ))}
      </div>

      <div ref={OtherStoriesRef} className="mt-18">
        <H1 highlight="#813D97">
          OTHER STORIES IN{" "}
          {latestStories?.[0]?.category?.category_name.toUpperCase() ||
            otherStories?.[0]?.category?.category_name.toUpperCase()}
        </H1>

        <div className="mt-8 flex lg:flex-row flex-col gap-10">
          <div className="flex-1 h-auto flex flex-col gap-8 ">
            {otherStories?.map((story, i) => (
              <CategoryStory key={i} story={story} />
            ))}
          </div>
          {!isMobile && !isTablet && <Ads />}
        </div>
      </div>

      <div onClick={scrollToTop} className="lg:mt-26 mt-12 w-fit mr-full">
        <PaginationTabs
          variant="large"
          totalItems={totalItems}
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>

      {(isMobile || isTablet) && <Ads />}
    </div>
  );
}
