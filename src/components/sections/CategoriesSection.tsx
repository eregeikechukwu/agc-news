"use client";

import { useCategories } from "@/src/app/stories/useStories";
import { StoryCard } from "@/src/components/stories/StoryCard/StoryCard";
import { fetchCategoryStories } from "@/src/lib/api/news-api";
import {
  ApiResponse,
  CategoryStoryObject,
  Story,
} from "@/src/lib/types/api-types";
import { useState, useEffect } from "react";
import H1 from "../UI/H1";
import OthersGridItem from "../UI/OthersGridItem";
import NewsCategorySkeleton from "../skeletons/NewsCategorySkeleton";
import ErrorFallback from "../Fallbacks/ErrorFallback";

export default function CategoriesSection() {
  const { data, isPending, isError, error } = useCategories();
  const [categoryStories, setCategoryStories] = useState<
    ApiResponse<CategoryStoryObject>[]
  >([]);

  useEffect(() => {
    if (!data) return;

    const fetchStories = async () => {
      const ids = data.data.data.map((item) => item.category_id);
      const allStories = await Promise.all(
        ids.map((id) => fetchCategoryStories(id))
      );
      setCategoryStories(allStories);
    };

    fetchStories();
  }, [data]);

  if (isPending) {
    return (
      <div className="flex flex-col py-23 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <NewsCategorySkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError || error) {
    return <ErrorFallback />;
  }

  const categories = data.data.data;

  return (
    <div className="py-23 flex gap-26 flex-col">
      {categoryStories.map((categoryStoryResponse, i) => {
        const stories = categoryStoryResponse?.data?.data ?? [];
        const categoryName = categories[i]?.category_name ?? "Unknown";

        return <CategoryTab key={i} name={categoryName} stories={stories} />;
      })}
    </div>
  );
}

function CategoryTab({ name, stories }: { name: string; stories: Story[] }) {
  if (!stories) return <div>loading...</div>;

  // Map API story to the expected StoryCard type
  const mapToStoryCardType = (story: any) => ({
    id: story.id,
    story: story,
    author: story.author,
    banner_image: story.banner_image,
    description: story.description,
    title: story.title,
    created_at: story.created_at,
  });

  return (
    <div className=" border-y-[0.06rem] pt-[1.31rem] pb-[1.19rem] border-y-[#c8c8c8]">
      <H1 chevron={true} highlight="#813D97">
        {name}
      </H1>
      <div className="mt-4 gap-8 flex">
        <div className="basis-[59.41%] relative">
          {stories[0] && (
            <StoryCard variant="large" story={mapToStoryCardType(stories[0])} />
          )}
          <span className="w-[1px] absolute -right-[1.56rem] -top-11 bottom-0 bg-[#c8c8c8]"></span>
        </div>
        <div className="flex-1">
          {stories.slice(1, 5).map((story, i) => (
            <OthersGridItem variant="withImg" key={i} story={story} />
          ))}
        </div>
      </div>
    </div>
  );
}
