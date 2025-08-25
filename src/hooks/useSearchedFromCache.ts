import { useEffect } from "react";
import { Story } from "../lib/types/api-types";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";
import { setSearchQuery } from "@/src/lib/slices/appSlice";

export function useSearchFromCache() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { searchQuery, searchInitQuery } = useAppSelector((state) => state.app);

  const debouncedQuery = useDebounce(searchQuery, 400);

  // Effect for clearing input filed
  useEffect(() => {
    if (!searchQuery) {
      // dispatch(clearSearch());
    }
  }, [searchQuery]);

  const getAllCachedStories = (): Story[] => {
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
      if (typeof queryKey !== "string" || !storyQueryKeys.has(queryKey))
        continue;

      const rawData = query.state?.data;

      if (Array.isArray(rawData)) {
        allStories.push(...rawData);
      } else if (
        rawData &&
        typeof rawData === "object" &&
        "data" in rawData &&
        Array.isArray((rawData as any).data)
      ) {
        allStories.push(...(rawData as { data: Story[] }).data);
      } else if (
        rawData &&
        typeof rawData === "object" &&
        "data" in rawData &&
        "data" in (rawData as any).data &&
        Array.isArray((rawData as any).data.data)
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
  const seen = new Set();
  const results = getAllCachedStories()
    .filter((story) => {
      const query = searchQuery.toLowerCase();
      return (
        story?.title?.toLowerCase().includes(debouncedQuery) ||
        story?.content?.toLowerCase().includes(debouncedQuery)
      );
    })
    .filter((story) => {
      const id = story.id;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  return { results, searchQuery, handleSearch, searchInitQuery };
}
