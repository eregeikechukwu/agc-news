import { Suspense } from "react";
import { StoryIdProp } from "../../app/stories/stories.types";
import { StoryPage } from "../pages/storyPage/StoryPage";

export default function StoryPageWrapper({ storyId }: StoryIdProp) {
  return (
    <Suspense>
      <StoryPage storyId={storyId} />
    </Suspense>
  );
}
