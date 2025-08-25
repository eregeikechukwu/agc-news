import { useMemo, useState } from "react";
import { useCategoryStories } from "../app/stories/useStories";
import { useAds } from "../app/features/ads/useAds";
import { is } from "date-fns/locale";

export function useCategoryVitals(categoryKey: string) {
  const [currentPage, setCurrentPage] = useState(1);
  const isFirstPage = currentPage === 1;

  const {
    data: firstPageData,
    isPending: isFirstPending,
    error: firstError,
    isError: isFirstError,
  } = useCategoryStories(categoryKey, 1, 9); // First fetch: 9 items

  const {
    data: pagedData,
    isPending: isPagedPending,
    error: pagedError,
    isError: isPagedError,
  } = useCategoryStories(categoryKey, currentPage, 5); // Every other page: 5

  const latestStories = firstPageData?.data?.slice(0, 4); // 4 latest

  const otherStories = useMemo(() => {
    if (isFirstPage) {
      return firstPageData?.data?.slice(4); // 5 others from first fetch
    } else {
      return pagedData?.data || [];
    }
  }, [isFirstPage, firstPageData, pagedData]);

  const totalItems =
    (firstPageData?.meta.total || pagedData?.meta.total || 1) - 4;
  const totalPages =
    pagedData?.meta.last_page || firstPageData?.meta.last_page || 1;

  const ads = useAds("categoryAds");

  return {
    latestStories,
    otherStories,
    totalItems,
    totalPages,
    currentPage,
    setCurrentPage,
    isFirstPage,
    isFirstPending,
    firstError,
    isPagedPending,
    pagedError,
    isPagedError,
    isFirstError,
    ads,
  };
}
