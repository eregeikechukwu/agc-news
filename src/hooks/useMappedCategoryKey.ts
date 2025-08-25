import { useMemo } from "react";
import { useCategories } from "../app/stories/useStories";

export default function useMappedCategoryKey(categoryName: string) {
  const {
    data,
    isPending: isCategoryPending,
    error: categoryError,
    isError: isCategoryError,
  } = useCategories();

  const categoriesMap = useMemo(() => {
    const map: Record<string, string> = {};
    data?.data?.data?.forEach((item) => {
      map[item.category_name.toLowerCase()] = item.category_id;
    });
    return map;
  }, [data]);
  const categoryKey = categoriesMap[categoryName?.toLowerCase()];

  return { categoryKey, isCategoryPending, categoryError, isCategoryError };
}
