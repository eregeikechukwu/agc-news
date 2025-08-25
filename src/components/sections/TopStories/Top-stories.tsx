"use client";

import { StoryCard } from "@/src/components/stories/StoryCard/StoryCard";
import { useTopStories } from "../../../app/stories/useStories";
import styles from "./Top-stories.module.scss";
import StoryCardSkeleton from "@/src/components/skeletons/TopStoriesSkeleton";
import ErrorFallback from "../../Fallbacks/ErrorFallback";

export default function TopStories() {
  const { isPending, data, error } = useTopStories();

  return (
    <div className="mt-[5.81rem] flex gap-[1.62rem] flex-col">
      <h1 className="px-[1.83rem] text-[1.75rem]">TOP STORIES</h1>
      {isPending ? (
        <StoryCardSkeleton />
      ) : error ? (
       <ErrorFallback />
      ) : (
        <div className={`${styles.storiesgrid} w-full`}>
          {data?.slice(0, 4).map((item, i) => (
            <StoryCard
              variant="grid"
              key={i}
              latest={i === 0}
              story={item.story}
            />
          ))}
        </div>
      )}
    </div>
  );
}
