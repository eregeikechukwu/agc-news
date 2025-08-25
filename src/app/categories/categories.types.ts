import { Story } from "@/src/lib/types/api-types";

export type CategoryGroup = {
  category: string;
  data: Story[];
};

export interface CategoryPageProps {
  params: {
    id: string;
  };
}
export interface CategoryStoriesPageProps {
  categoryId: string;
}

export type CategoryStoriesFetcherProps = {
  categoryKey: string;
};
