import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { apiClient } from "./api-client";
import type {
  Story,
  ApiResponse,
  StoryObject,
  CategoryObject,
  CategoryStoryObject,
} from "@/src/lib/types/api-types";

/**
 * API functions and React Query hooks for news data
 * Requirement #6: Use React Query for data fetching with proper caching
 */

//
// API Functions
//

/**
 * Fetch all categories from the API
 * Endpoint: /categories
 */
export const fetchCategories = async (): Promise<
  CategoryObject | ApiResponse<CategoryObject>
> => {
  const response = await apiClient.get<
    CategoryObject | ApiResponse<CategoryObject>
  >("/categories");
  // Return raw response; normalization will happen in the component if needed.
  return response;
};

/* Fetch top stories from the API
 Endpoint: /top-stories*/

export const fetchTopStories = async (): Promise<
  Story[] | ApiResponse<Story[]>
> => {
  const response = await apiClient.get<Story[] | ApiResponse<Story[]>>(
    "/top-stories"
  );
  return "data" in response ? response.data : response;

  // Return raw response; normalization will happen in the component if needed.
  return response;
};

/**
 * Fetch editor's picks with pagination
 * Endpoint: /editor-picks
 */
export const fetchEditorsPicks = async (
  page = 1,
  perPage = 15
): Promise<ApiResponse<StoryObject>> => {
  return apiClient.getWithParams<ApiResponse<StoryObject>>("/editor-picks", {
    page,
    per_page: perPage,
  });
};

/**
 * Fetch featured stories with pagination
 * Endpoint: /stories/featured-stories
 */
export const fetchFeaturedStories = async (
  page = 1,
  perPage = 15
): Promise<ApiResponse<StoryObject>> => {
  return apiClient.getWithParams<ApiResponse<StoryObject>>(
    "/stories/featured-stories",
    {
      page,
      per_page: perPage,
    }
  );
};

/**
 * Fetch latest stories with pagination
 * Endpoint: /stories/latest-stories
 */
export const fetchLatestStories = async (
  page = 1,
  perPage = 7
): Promise<ApiResponse<StoryObject>> => {
  return apiClient.getWithParams<ApiResponse<StoryObject>>(
    "/stories/latest-stories",
    {
      page,
      per_page: perPage,
    }
  );
};

/**
 * Fetch missed stories with pagination
 * Endpoint: /stories/missed-stories
 */
export const fetchMissedStories = async (
  page = 1,
  perPage = 5
): Promise<ApiResponse<StoryObject>> => {
  return apiClient.getWithParams<ApiResponse<StoryObject>>(
    "/stories/missed-stories",
    {
      page,
      per_page: perPage,
    }
  );
};

/**
 * Fetch stories for a specific category
 * Endpoint: /categories/{categoryId}/stories
 */
export const fetchCategoryStories = async (
  categoryId: string,
  page = 1,
  perPage = 15
): Promise<ApiResponse<CategoryStoryObject>> => {
  return apiClient.getWithParams<ApiResponse<CategoryStoryObject>>(
    `/categories/${categoryId}/stories`,
    {
      page,
      per_page: perPage,
    }
  );
};

/**
 * Fetch a single story by ID
 * Endpoint: /stories/{storyId}
 */
export const fetchStoryById = async (storyId: string): Promise<Story> => {
  const response = await apiClient.get<ApiResponse<Story> | Story>(
    `/stories/${storyId}`
  );
  // Normalize single story response: return 'data' property if present, otherwise the object itself.
  return typeof response === "object" && "data" in response
    ? response.data
    : (response as Story);
};

//
// React Query Hooks
//

/**
 * Hook to fetch categories with React Query
 * Requirement: Use React Query for data fetching with caching
 */
export function useCategories(): UseQueryResult<
  CategoryObject | ApiResponse<CategoryObject>,
  Error
> {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // Categories don't change often, cache for 10 minutes
  });
}

/**
 * Hook to fetch top stories with React Query
 */
export function useTopStories(): UseQueryResult<
  Story[] | ApiResponse<Story[]>,
  Error
> {
  return useQuery({
    queryKey: ["top-stories"],
    queryFn: fetchTopStories,
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
  });
}

/**
 * Hook to fetch editor's picks with React Query
 */
export function useEditorsPicks(
  page = 1,
  perPage = 15
): UseQueryResult<ApiResponse<StoryObject>, Error> {
  return useQuery({
    queryKey: ["editors-picks", page, perPage],
    queryFn: () => fetchEditorsPicks(page, perPage),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}

/**
 * Hook to fetch featured stories with React Query
 */
export function useFeaturedStories(
  page = 1,
  perPage = 15
): UseQueryResult<ApiResponse<StoryObject>, Error> {
  return useQuery({
    queryKey: ["featured-stories", page, perPage],
    queryFn: () => fetchFeaturedStories(page, perPage),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch latest stories with React Query
 */
export function useLatestStories(
  page = 1,
  perPage = 7
): UseQueryResult<ApiResponse<StoryObject>, Error> {
  return useQuery({
    queryKey: ["latest-stories", page, perPage],
    queryFn: () => fetchLatestStories(page, perPage),
    staleTime: 1 * 60 * 1000, // Latest stories change frequently, cache for 1 minute
  });
}

/**
 * Hook to fetch missed stories with React Query
 */
export function useMissedStories(
  page = 1,
  perPage = 5
): UseQueryResult<ApiResponse<StoryObject>, Error> {
  return useQuery({
    queryKey: ["missed-stories", page, perPage],
    queryFn: () => fetchMissedStories(page, perPage),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch category stories with React Query
 * Only enabled when categoryId is provided
 */
export function useCategoryStories(
  categoryId: string,
  page = 1,
  perPage = 15
): UseQueryResult<ApiResponse<CategoryStoryObject>, Error> {
  return useQuery({
    queryKey: ["category-stories", categoryId, page, perPage],
    queryFn: () => fetchCategoryStories(categoryId, page, perPage),
    enabled: !!categoryId, // Only run query if categoryId is provided
    staleTime: 3 * 60 * 1000,
  });
}

/**
 * Hook to fetch a single story with React Query
 * Only enabled when storyId is provided
 */
export function useStoryById(storyId: string): UseQueryResult<Story, Error> {
  return useQuery({
    queryKey: ["story", storyId],
    queryFn: () => fetchStoryById(storyId),
    enabled: !!storyId, // Only run query if storyId is provided
    staleTime: 10 * 60 * 1000, // Individual stories don't change often
  });
}
