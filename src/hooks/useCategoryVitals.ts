import { useState, useMemo } from "react";
import { useCategoryStories } from "../app/stories/useStories";
import { useAds } from "../app/features/ads/useAds";
import { Story } from "../lib/types/api-types";

export function useCategoryVitals(categoryKey: string) {
  const [currentPage, setCurrentPage] = useState(1);

  //  Constants
  const TOP_LATEST = 4; // latest stories pinned at the top
  const FIRST_PAGE_LIMIT = 9; // fetch more on first page to cover latest + others
  const SUBSEQUENT_PAGE_LIMIT = 5; // fetch size for other pages

  const isFirstPage = currentPage === 1;

  // 1 First page fetch (always needed for latest + first batch of others)
  const firstQuery = useCategoryStories(categoryKey, 1, FIRST_PAGE_LIMIT);

  // 2 Other pages fetch (only used when currentPage > 1)
  const otherQuery = useCategoryStories(
    categoryKey,
    currentPage,
    SUBSEQUENT_PAGE_LIMIT
  );

  //  Data splits
  const latestStories: Story[] =
    firstQuery.data?.data?.data?.slice(0, TOP_LATEST) ?? [];

  const otherStories: Story[] = useMemo(() => {
    if (isFirstPage) {
      return firstQuery.data?.data?.data?.slice(TOP_LATEST) ?? [];
    }
    return otherQuery.data?.data?.data ?? [];
  }, [isFirstPage, firstQuery.data, otherQuery.data]);

  //  Pagination
  const total = firstQuery.data?.data?.meta?.total ?? 0;
  const totalPages = Math.ceil((total - TOP_LATEST) / SUBSEQUENT_PAGE_LIMIT);
  const totalOtherItems = Math.max(totalPages * SUBSEQUENT_PAGE_LIMIT, 0);

  //  Loading & Error states
  const isFirstStoriesPending = isFirstPage && firstQuery.isPending;
  const isOtherStoriesPending = !isFirstPage && otherQuery.isPending;

  const isStoriesError =
    firstQuery.isError ||
    otherQuery.isError ||
    !!firstQuery.error ||
    !!otherQuery.error;

  //  Misc
  const noOfItemsFetched = otherStories.length;
  const ads = useAds("categoryAds");

  return {
    latestStories, // pinned top stories (always from firstPage)
    otherStories, // depends on currentPage
    isFirstStoriesPending,
    isOtherStoriesPending,
    isStoriesError,
    totalItems: totalOtherItems,
    totalPages,
    currentPage,
    setCurrentPage,
    noOfItemsFetched,
    ads,
  };
}

// Previous version
// /* eslint-disable react-hooks/exhaustive-deps */

// import { useMemo, useState } from "react";
// import { useCategoryStories } from "../app/stories/useStories";
// import { useAds } from "../app/features/ads/useAds";
// import { Story } from "../lib/types/api-types";

// export function useCategoryVitals(categoryKey: string) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const isFirstPage = currentPage === 1;

//   const {
//     data: firstPageData,
//     isPending: isFirstPending,
//     error: firstError,
//     isError: isFirstError,
//   } = useCategoryStories(categoryKey, 1, 9); // First fetch: 9 items

//   const {
//     data: patchData,
//     isPending: isPatchPending,
//     error: PatchError,
//   } = useCategoryStories(categoryKey, currentPage, 5); // get the last item from previous page

//   const {
//     data: pagedData,
//     isPending: isPagedPending,
//     error: pagedError,
//     isError: isPagedError,
//   } = useCategoryStories(categoryKey, currentPage + 1, 4); // Every other
//   //  page: 4 will be added with one from patched data

//   const newOtherStories: Story[] = [
//     patchData?.data[patchData?.data.length - 1] as Story,
//     ...(pagedData?.data.slice(0) || []),
//   ];

//   const latestStories = firstPageData?.data?.slice(0, 4); // 4 latest

//   const otherStories = useMemo(() => {
//     if (isFirstPage) {
//       return firstPageData?.data?.slice(4); // 5 others from first fetch
//     } else {
//       return newOtherStories || pagedData?.data.slice(0, 4); // 5 others from subsequent fetches
//     }
//   }, [isFirstPage, firstPageData, pagedData, newOtherStories]);

//   const totalItems = (firstPageData?.meta.total || 1) - 4;
//   const totalPages = Math.ceil(totalItems / 5);

//   // const totalItems =
//   //     (firstPageData?.meta.total || pagedData?.meta.total || 1) - 4;
//   //   const totalPages =
//   //     (pagedData?.meta.last_page || 1) - 1 ||
//   //     (firstPageData?.meta.last_page || 1) - 1;

//   //General Pending/loading state for other stories
//   const isOtherStoriesPending = isPagedPending || isPatchPending;

//   //General Pending/loading state for first stories
//   const isFirstStoriesPending = isFirstPage && isFirstPending;

//   //General Error state for all neded stories
//   const isStoriesError =
//     isFirstError || isPagedError || firstError || PatchError || pagedError;

//   //Number of items that were fteched/to b edisplayed for ther other stories section
//   const noOfItemsFetched = newOtherStories.length;

//   const ads = useAds("categoryAds");

//   return {
//     latestStories,
//     otherStories,
//     isOtherStoriesPending,
//     isFirstStoriesPending,
//     totalItems,
//     totalPages,
//     currentPage,
//     setCurrentPage,
//     isStoriesError,
//     noOfItemsFetched,
//     ads,
//   };
// }
