"use client";

import { StoryCard } from "@/src/components/stories/StoryCard/StoryCard";
import { useEditorsPicks } from "@/src/app/stories/useStories";
import { Crown } from "lucide-react";
import OthersGridItem from "@/src/components/UI/OthersGridItem";
import EditorPicksSkeleton from "@/src/components/skeletons/EditorPicksSkeleton";
import ErrorFallback from "../Fallbacks/ErrorFallback";
import NoStories from "../Fallbacks/NoStories";

export default function EditorsPicks() {
  const { data, isPending, isError, error } = useEditorsPicks();

  // Defensive: Only render if data and data[0] exist, as story is now required
  // FInd an active story to diaply in case the first is unavailable or null

  if (isError) return <ErrorFallback message={`${error}`} />;

  if (isPending) return <EditorPicksSkeleton />;

  const activeStory = data?.find((item) => item.story);

  if (!data || !activeStory) return <NoStories title="Editors" />;

  const activeStories = data
    ?.filter((item) => item.story && item.story !== activeStory.story)
    .slice(0, 5);

  return (
    <section className="flex bg-muted px-padding-general-x -ml-padding-general-x py-padding-general-x w-[calc(100%+2*var(--spacing-padding-general-x))] gap-4">
      <div className="basis-[68%] relative overflow-hidden">
        <StoryCard variant="horizontal" story={activeStory?.story} />
        <button className="absolute flex items-center gap-2 h-[2.69rem] rounded-full backdrop-blur-[0.31rem] px-4 border-[0.06rem] text-white border-[#DDDDDD] bg-[rgba(0,0,0,0.37)] text-[0.94rem] top-[1.12rem] left-[1.06rem]">
          <span className="flex items-center justify-center rounded-full h-[1.56rem] w-[1.56rem] bg-[#D72B81]">
            <Crown fill="white" className="w-[0.81rem] h-[0.81rem]" />
          </span>
          Editor&apos;s Pick
        </button>
      </div>

      <div className="flex-1">
        <h1 className="text-[1.13rem] mb-4">MORE STORIES</h1>
        <div className="flex flex-col ">
          {activeStories.map((item, i) =>
            item.story ? (
              <OthersGridItem variant="simple" key={i} story={item.story} />
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}
