"use client";

import Link from "next/link";
import { StoryIdProp } from "@/src/app/stories/stories.types";
import { useCategoryStories, useStoryById } from "@/src/app/stories/useStories";
import {
  Bookmark,
  BookmarkCheckIcon,
  Chrome,
  Facebook,
  Instagram,
  Linkedin,
  LinkIcon,
  Share2,
  TwitterIcon,
} from "lucide-react";
import { formatDate } from "date-fns";
import Image from "next/image";
import ErrorFallback from "../../Fallbacks/ErrorFallback";
import OthersGridItem from "../../UI/OthersGridItem";
import useMappedCategoryKey from "@/src/hooks/useMappedCategoryKey";
import { useAds } from "@/src/app/features/ads/useAds";
import AlsoReading from "../../sections/AlsoReading";
import StorySkeleton from "../../skeletons/StorySkeleton";
import { LatestNews, MissedStories } from "../../sections";
import OtherStoriesSkeleton from "../../skeletons/OtherStoriesSkeleton";
import { useTooltipsHandler } from "@/src/utils/tooltipsHandler";
import { useImage } from "@/src/hooks/useImage";
import { useAppDispatch, useAppSelector } from "@/src/hooks/reduxHooks";
import { toggleBookmark } from "@/src/lib/slices/bookmarkSlice";

export function StoryPage({ storyId }: StoryIdProp) {
  const { data, isPending, error, isError } = useStoryById(storyId);
  const { categoryKey } = useMappedCategoryKey(data?.category?.category_name || '');
  const { data: otherStories, isPending: isPagedPending } = useCategoryStories(
    categoryKey || "",
    1,
    5
  );
  const ads = useAds("storyAds");
  // Bookmark functions
  const { bookmarkedStories } = useAppSelector((state) => state.bookmarks);
  const dispatch = useAppDispatch();

  const isBookmarked = bookmarkedStories.includes(storyId || "");
  const { handleClick: bookmarkHandler, isSharing } =
    useTooltipsHandler("bookmark");

  // Copy action tooltip and handler
  const { handleClick } = useTooltipsHandler("copy");

  const imageSrc = useImage(data?.banner_image);

  if (isError) <ErrorFallback message={error.message} />;

  return (
    <section className="pt-[3.6rem]">
      {/* Heading */}
      {isPending ? (
        <StorySkeleton />
      ) : isError ? (
        <ErrorFallback message={error.message} />
      ) : (
        <>
          <div className="max-w-[59rem]">
            <div className="flex gap-[1.12rem]">
              <Link href={`/categories/${data?.category?.category_name}`}>
                <button className="text-[#5a5a5a]  text-[0.94rem] bg-white/10 rounded-full w-[8.06rem] h-10 border-[0.06rem] border-[#999999] cursor-pointer">
                  {data?.category?.category_name}
                </button>
              </Link>
              <button
                disabled={isSharing}
                onClick={() => handleClick("Copied to clipboard !")}
                className="px-[0.94rem] flex gap-[0.38rem] h-10 text-white items-center rounded-full text-[0.94rem]  bg-[#3F62BC] hover:bg-[#3F62BCCC] cursor-pointer"
              >
                <Share2 fill="white" stroke="white" className="w-4 h-4" />
                Share
              </button>
            </div>
            <h1 className="md:text-[2.63rem] font-semibold text-[2rem] mt-[0.8rem] leading-snug">
              {data?.title}
            </h1>
            <p className="text-[1.13rem] mt-2 text-[#5a5a5a]">
              Posted{` `}
              {data?.created_at
                ? `${formatDate(data.created_at, "hh:mm aa")}, ${formatDate(
                    data.created_at,
                    "EEE MMMM dd, yyyy"
                  )}`
                : ""}{" "}
              {`\u2022`} 4 minutes read
            </p>
            <p className="text-[1.13rem] font-medium mt-2 text-[#282828]">
              By {data?.author}
            </p>
          </div>
          {/* main story content */}
          <div className="flex md:flex-row flex-col h-fit gap-[7rem] md:gap-[4.6rem]">
            <div className="md:w-[65%] w-full">
              {/* Banner image */}
              <div className="max-w-full overflow-hidden relative h-[32rem] mt-5">
                <Image
                  src={imageSrc}
                  alt="banner image"
                  width={890}
                  height={516}
                  className="w-full h-full object-cover "
                />
                {/* Bookmark button */}
                <button
                  className="h-12 border-2 center_child border-white rounded-full w-12 absolute cursor-pointer group top-4 right-4"
                  title="Add to bookmarks"
                  onClick={() => {
                    dispatch(toggleBookmark(storyId || ""));
                    bookmarkHandler(
                      isBookmarked
                        ? "Removed from bookmarks"
                        : "Added to bookmarks"
                    );
                  }}
                >
                  {isBookmarked ? (
                    <BookmarkCheckIcon
                      stroke="white"
                      className="group-hover:fill-white group-hover:animate-pulse"
                    />
                  ) : (
                    <Bookmark
                      stroke="white"
                      className="group-hover:fill-white group-hover:animate-pulse"
                    />
                  )}
                </button>
              </div>
              <article className="prose text-[1.25rem] !w-full  prose-md">
                <div dangerouslySetInnerHTML={{ __html: data?.content ?? "" }}></div>
              </article>
              {/* socials */}
              <div className="mt-5 flex gap-3">
                <TwitterIcon
                  stroke="black"
                  className="w-6 cursor-pointer h-6"
                />
                <Instagram stroke="black" className="w-6 cursor-pointer h-6" />
                <Facebook stroke="black" className="w-6 cursor-pointer h-6" />
                <Chrome stroke="black" className="w-6 cursor-pointer h-6" />
                <Linkedin stroke="black" className="w-6 cursor-pointer h-6" />
                <LinkIcon
                  onClick={() => handleClick("Copied to clipboard !")}
                  className="w-6  cursor-pointer h-6"
                />
              </div>
            </div>
            {/* Ads and top stories */}
            <div className="flex-1 flex flex-col h-full">
              {isPagedPending ? (
                <OtherStoriesSkeleton />
              ) : (
                <div>
                  <h1 className="text-[1.13rem] font-bold">TOP STORIES</h1>
                  <div className="mt-6 ">
                    {otherStories?.data.slice(0, 4).map((story) => (
                      <OthersGridItem story={story} key={story.id} />
                    ))}
                  </div>
                </div>
              )}
              {/* Ads */}
              <div className="md:mt-14 mt-10 flex flex-1 md:gap-20 gap-5 justify-between h-full md:flex-col ">
                {ads.map((ad, index) => (
                  <Image
                    key={index}
                    alt="ad"
                    width={300}
                    height={250}
                    className="w-[80%] self-end imageEffect object-cover"
                    src={ad.toLowerCase()}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {/* People are also reading */}
      <AlsoReading />

      {/*missed stories*/}
      <MissedStories />
    </section>
  );
}
