import { useMemo, useState } from "react";
import { useCategoryStories } from "../app/stories/useStories";
import { useAds } from "../app/features/ads/useAds";
import { Story } from "../lib/types/api-types";

export function useCategoryVitals(categoryKey: string) {
  const [currentPage, setCurrentPage] = useState(1);
  const isFirstPage = currentPage === 1;

  const {
    data: firstPageData,
    isPending: isFirstPending,
    error: firstError,
    isError: isFirstError,
  } = useCategoryStories(categoryKey, 1, 9); // First fetch: 9 items

  const { data: patchData } = useCategoryStories(categoryKey, currentPage, 5); // get the last item from previous page

  const {
    data: pagedData,
    isPending: isPagedPending,
    error: pagedError,
    isError: isPagedError,
  } = useCategoryStories(categoryKey, currentPage + 1, 5); // Every other
  //  page: 5

  const newOtherStories: Story[] = [
    patchData?.data[patchData?.data.length - 1]!,
    ...(pagedData?.data.slice(0, 4) || []),
  ];

  console.log(newOtherStories, " check data");

  const latestStories = firstPageData?.data?.slice(0, 4); // 4 latest

  const otherStories = useMemo(() => {
    if (isFirstPage) {
      return firstPageData?.data?.slice(4); // 5 others from first fetch
    } else {
      return newOtherStories || pagedData?.data.slice(0, 4); // 5 others from subsequent fetches
    }
  }, [isFirstPage, firstPageData, pagedData, newOtherStories]);

  const totalItems =
    (firstPageData?.meta.total || pagedData?.meta.total || 1) - 4;
  const totalPages =
    pagedData?.meta.last_page || firstPageData?.meta.last_page || 1;

  //Number of items that were fteched/to b edisplayed for ther other stories section
  const noOfItemsFetched = newOtherStories.length;

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
    noOfItemsFetched,
    ads,
  };
}
