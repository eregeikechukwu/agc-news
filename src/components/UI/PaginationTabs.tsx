import { ArrowLeft, ArrowRight, Triangle } from "lucide-react";
import { PaginationProps } from "./types";
import { getVisiblePages } from "@/src/utils/getVisiblePages";

export default function PaginationTabs({
  variant,
  currentPage,
  totalPages,
  totalItems,
  onChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getVisiblePages(currentPage, totalPages);

  const adjustedTotal = (totalItems || 1) - 2 * totalPages;

  const start = (currentPage - 1) * 5 + 1;
  const end = Math.min(currentPage * 5, adjustedTotal);

  if (variant === "small") {
    return (
      <div className="flex gap-2 items-center justify-center ">
        <div className="flex items-center justify-center gap-2 ">
          {/* Previous button */}
          <button
            disabled={currentPage === 1}
            onClick={() => onChange(currentPage - 1)}
            className=" disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4  text-black" />
            {""}
          </button>

          {/* Page numbers */}
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onChange(page)}
              className={` w-[0.63rem] h-[0.63rem] rounded-full ${
                page === currentPage
                  ? "bg-pink-500"
                  : "bg-[#d4d4d4] hover:bg-gray-500"
              }`}
            >
              {""}
            </button>
          ))}

          {/* Next button */}

          <button
            disabled={currentPage === totalPages}
            onClick={() => onChange(currentPage + 1)}
            className=" disabled:opacity-40"
          >
            <ArrowRight className="h-4 w-4  text-black" />
            {""}
          </button>
        </div>
      </div>
    );
  }

  if (variant === "large") {
    return (
      <div className="flex items-center justify-center ">
        {/* showing count */}
        <p className="text-[0.94rem]">
          Showing {start} - {end} of {adjustedTotal}
        </p>

        <div className="flex items-center justify-center gap-2 ">
          {/* Previous button */}
          <button
            disabled={currentPage === 1}
            onClick={() => onChange(currentPage - 1)}
            className=" disabled:opacity-40"
          >
            <Triangle fill="black" className="h-6 rotate-270 w-6  text-black" />
          </button>

          {/* Page numbers */}
          <div className="flex items-center justify-center gap-2">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => onChange(page)}
                className={` w-[2.13rem] h-[2.13rem] rounded-[0.5rem] text-white ${
                  page === currentPage
                    ? "bg-black"
                    : "bg-[#bab9b9] hover:bg-gray-500"
                }`}
              >
                {page}
              </button>
            ))}
            {pages.length > 4 && totalPages !== currentPage && (
              <>
                <span>...</span>
                <button
                  key={totalPages}
                  onClick={() => onChange(totalPages)}
                  className={` w-[2.13rem] h-[2.13rem] rounded-[0.5rem] text-white ${
                    totalPages === currentPage
                      ? "bg-black"
                      : "bg-[#bab9b9] hover:bg-gray-500"
                  }`}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          {/* Next button */}

          <button
            disabled={currentPage === totalPages}
            onClick={() => onChange(currentPage + 1)}
            className=" disabled:opacity-40"
          >
            <Triangle
              fill="black"
              className="h-6 k rotate-90 w-6  text-black"
            />
          </button>
        </div>
      </div>
    );
  }
}
