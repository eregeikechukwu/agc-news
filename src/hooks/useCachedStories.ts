"use client";

import { useQueryClient } from "@tanstack/react-query";
import { ApiEnvelope, Story } from "../lib/types/api-types";

const useAllCachedStories = (): Story[] => {
  const queryClient = useQueryClient();

  const cachedQueries = queryClient.getQueryCache().getAll();

  const storyQueryKeys = new Set([
    "editors-picks",
    "top-stories",
    "featured-stories",
    "missed-stories",
    "category-stories",
    "latest-stories",
  ]);

  const allStories: Story[] = [];

  for (const query of cachedQueries) {
    const queryKey = query.queryKey?.[0];
    if (typeof queryKey !== "string" || !storyQueryKeys.has(queryKey)) continue;

    const rawData = query.state?.data;

    if (Array.isArray(rawData)) {
      allStories.push(...rawData);
    } else if (
      rawData &&
      typeof rawData === "object" &&
      "data" in rawData &&
      Array.isArray((rawData as ApiEnvelope<Story>).data)
    ) {
      allStories.push(...(rawData as { data: Story[] }).data);
    } else if (
      rawData &&
      typeof rawData === "object" &&
      "data" in rawData &&
      "data" in (rawData as ApiEnvelope<Story>).data &&
      Array.isArray((rawData as ApiEnvelope<ApiEnvelope<Story>>).data.data)
    ) {
      allStories.push(...(rawData as { data: { data: Story[] } }).data.data);
    }
  }

  return allStories.filter(
    (item): item is Story =>
      typeof item === "object" &&
      item !== null &&
      "id" in item &&
      "title" in item &&
      "banner_image" in item
  );
};

export default useAllCachedStories;
