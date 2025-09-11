export type PaginationProps = {
  variant: "small" | "large";
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  onChange: (newPage: number) => void;
};
