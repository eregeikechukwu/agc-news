export type PaginationProps = {
  variant: "small" | "large";
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  noOfItemsFetched?: number;
  onChange: (newPage: number) => void;
};
