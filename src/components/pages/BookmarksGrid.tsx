"use client";

import { useAppDispatch, useAppSelector } from "@/src/hooks/reduxHooks";
import Image from "next/image";
import H1 from "../UI/H1";
import NoStories from "../Fallbacks/NoStories";
import { useStoryById } from "@/src/app/stories/useStories";
import { useImage } from "@/src/hooks/useImage";
import Link from "next/link";
import { BookmarkMinus } from "lucide-react";
import { toggleBookmark } from "@/src/lib/slices/bookmarkSlice";
import { useTooltipsHandler } from "@/src/utils/tooltipsHandler";
import ErrorFallback from "../Fallbacks/ErrorFallback";
import BookmarkPageSkeleton from "../skeletons/BookmarkPageSkeleton";
import { useEffect, useState } from "react";

export default function BookmarkedStoriesGrid() {
  const { bookmarkedStories } = useAppSelector((state) => state.bookmarks);
  const { isError } = useStoryById(bookmarkedStories[0 || 1 || 2] || "");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (bookmarkedStories.length) {
      setIsLoading(false);
    }
  }, [bookmarkedStories]);

  if (isError) {
    return <ErrorFallback message="Something went wrong fetching data." />;
  }

  /* Render loading skeleton */
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <BookmarkPageSkeleton key={i} />
        ))}
      </div>
    );
  }
  /* Show no stories message if there are no bookmarks */
  if (!bookmarkedStories.length) {
    return (
      <NoStories
        message="You don't have any bookmarks yet."
        title="bookmarked"
      />
    );
  }

  return (
    <div className="mt-22">
      <H1 highlight="#813D97" chevron={false}>
        Bookmarks
      </H1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {/* Render bookmarked stories */}
        {bookmarkedStories.map((id) => (
          <BookmarkCard key={id} id={id} />
        ))}
      </div>
    </div>
  );
}

export function BookmarkCard({ id }: { id: string }) {
  const { data, isPending } = useStoryById(id);
  const imageSrc = useImage(data?.banner_image);
  const dispatch = useAppDispatch();
  const { handleClick: bookmarkHandler } = useTooltipsHandler("bookmark");

  if (isPending) {
    return <BookmarkPageSkeleton />;
  }

  return (
    <div className="border relative border-gray-200 rounded-xl overflow-hidden shadow-sm transition hover:shadow-md">
      <Link href={`/stories/${id}`} className="w-full  cursor-pointer">
        <div className="w-full  max-h-[12rem] imageEffect cursor-pointer">
          <Image
            src={imageSrc}
            alt={data?.title || ""}
            width={500}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      {/* Remove from bookmarks */}
      <button
        className="h-12 border-2 center_child border-white rounded-full w-12 absolute cursor-pointer group top-4 right-4"
        title="Add to bookmarks"
        onClick={() => {
          dispatch(toggleBookmark(id || ""));
          bookmarkHandler("Removed from bookmarks");
        }}
      >
        <BookmarkMinus
          stroke="white"
          className="group-hover:fill-white group-hover:animate-pulse"
        />
      </button>
      <div className="p-4 flex flex-col gap-2">
        <h2 className="font-semibold text-[1.13rem] leading-tight">
          {data?.title}
        </h2>
        <p
          className="text-sm text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        />
      </div>
    </div>
  );
}
