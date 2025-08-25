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

export default function CategoryStoriesFetcher({
  categoryKey,
}: {
  categoryKey: string;
}) {
  const {
    categoryKey: categoryId,
    isCategoryPending,
    categoryError,
    isCategoryError,
  } = useMappedCategoryKey(categoryKey);

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

  if (!categoryId) return <NoStories title={categoryKey} />;
  if (
    isCategoryPending ||
    (isFirstPage && isFirstPending) ||
    (!isFirstPage && isPagedPending)
  )
    return <CategoryPageSkeleton />;

  return (
    <div>
      <div className={`${styles.storygrid} mt-12`}>
        {latestStories?.map((story, i) => (
          <StoryCard
            key={story.id}
            latest={i === 0}
            variant="grid"
            story={story}
          />
        ))}
      </div>

      <div className="mt-18">
        <H1 highlight="#813D97">
          OTHER STORIES IN{" "}
          {latestStories?.[0]?.category.category_name.toUpperCase() ||
            otherStories?.[0]?.category.category_name.toUpperCase()}
        </H1>

        <div className="mt-8 flex">
          <div className="flex-1 h-auto flex flex-col gap-8 ">
            {otherStories?.map((story, i) => (
              <CategoryStory key={i} story={story} />
            ))}
          </div>
          <div className="basis-[18.5rem] w-fit flex flex-col gap-10 ">
            {ads.map((src, i) => (
              <Image
                key={i}
                src={src.toString() || "images/placeholder-image.jpg"}
                width={266}
                height={400}
                alt={`ad-${i}`}
                className="w-full h-auto imageEffect"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-26 w-fit mr-full">
        <PaginationTabs
          variant="large"
          totalItems={totalItems}
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
