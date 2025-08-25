"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import {
  fetchCategories,
  fetchTopStories,
  fetchEditorsPicks,
  fetchFeaturedStories,
  fetchLatestStories,
  fetchMissedStories,
  fetchCategoryStories,
  fetchStoryById,
} from "@/src/lib/api/news-api"; // update this path if needed

import type {
  Category,
  Story,
  ApiResponse,
  StoryObject,
  CategoryObject,
  CategoryStoryObject,
} from "@/src/lib/types/api-types";

//
// Categories
//

export function useCategories(): UseQueryResult<CategoryObject, Error> {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await fetchCategories();
      return data as CategoryObject;
    },
    staleTime: 10 * 60 * 1000,
  });
}

//
// Top Stories
//

export function useTopStories(): UseQueryResult<Story[], Error> {
  return useQuery({
    queryKey: ["top-stories"],
    queryFn: async () => {
      const data = await fetchTopStories();
      return "data" in data ? data.data : data;
    },
    staleTime: 2 * 60 * 1000,
  });
}

//
// Editor's Picks
//

export function useEditorsPicks(
  page = 1,
  perPage = 15
): UseQueryResult<Story[], Error> {
  return useQuery({
    queryKey: ["editors-picks", page, perPage],
    queryFn: async () => {
      const res = await fetchEditorsPicks(page, perPage);
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

//
// Featured Stories
//

export function useFeaturedStories(
  page = 1,
  perPage = 15
): UseQueryResult<StoryObject, Error> {
  return useQuery({
    queryKey: ["featured-stories", page, perPage],
    queryFn: async () => {
      const res = await fetchFeaturedStories(page, perPage);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

//
// Latest Stories
//

export function useLatestStories(
  page = 1,
  perPage = 4
): UseQueryResult<StoryObject, Error> {
  return useQuery<StoryObject, Error>({
    queryKey: ["latest-stories", page, perPage],
    queryFn: async () => {
      const res = await fetchLatestStories(page, perPage);
      return res.data;
    },
    staleTime: 60 * 1000,
  });
}

//
// Missed Stories
//

export function useMissedStories(
  page = 1,
  perPage = 5
): UseQueryResult<StoryObject, Error> {
  return useQuery({
    queryKey: ["missed-stories", page, perPage],
    queryFn: async () => {
      const res = await fetchMissedStories(page, perPage);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

//
// Stories by Category
//

export function useCategoryStories(
  categoryId: string,
  page = 1,
  perPage = 15
): UseQueryResult<CategoryStoryObject, Error> {
  return useQuery({
    queryKey: ["category-stories", categoryId, page, perPage],
    queryFn: async () => {
      const res = await fetchCategoryStories(categoryId, page, perPage);
      return res.data;
    },
    enabled: !!categoryId,
    staleTime: 3 * 60 * 1000,
  });
}

//
// Single Story
//

export function useStoryById(storyId: string): UseQueryResult<Story, Error> {
  return useQuery({
    queryKey: ["story", storyId],
    queryFn: async () => {
      return await fetchStoryById(storyId);
    },
    enabled: !!storyId,
    staleTime: 10 * 60 * 1000,
  });
}
