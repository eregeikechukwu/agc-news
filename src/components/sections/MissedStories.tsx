"use client";

import { useMissedStories } from "@/src/app/stories/useStories";
import Tag from "../UI/Tag";
import { formatDateToNow } from "@/src/utils/getDateToNow";
import PaginationTabs from "../UI/PaginationTabs";
import { useState } from "react";
import MissedStorySkeleton from "../skeletons/MissedStoriesSkeleton";
import Link from "next/link";
import ErrorFallback from "../Fallbacks/ErrorFallback";

export default function MissedStories() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isPending, error, isError } = useMissedStories(currentPage, 4);
  const missedStories = data?.data;

  const onChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-26">
      <div className="flex justify-between mb-[1.6rem]">
        <h1 className="text-[1.75rem]">STORIES YOU MAY HAVE MISSED</h1>
        <PaginationTabs
          variant="small"
          currentPage={currentPage}
          totalPages={data?.meta.last_page || 1}
          onChange={onChange}
        />
      </div>
      <div>
        {isPending ? (
          <MissedStorySkeleton />
        ) : isError ? (
          <ErrorFallback message={error.message} />
        ) : (
          <div className="grid grid-cols-4 gap-12">
            {missedStories?.slice(0, 4).map((story, i) => (
              <Link key={i} href={`/stories/${story.id}`}>
                <div className="flex gap-3 ">
                  <span className="h-[0.94rem] min-w-[0.94rem] bg-[#282828] mt-1 rounded-xs"></span>
                  <div>
                    <p>{story.title}</p>
                    <div className="flex gap-2 mt-2">
                      <Tag variant="dark">{story.author}</Tag>
                      <Tag variant="dark">
                        {formatDateToNow(story?.created_at || "")}
                      </Tag>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
