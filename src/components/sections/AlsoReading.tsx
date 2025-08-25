import { useLatestStories } from "@/src/app/stories/useStories";
import StoryCarouselTemplate from "../stories/StoryCarouselTemplate";
import { useState } from "react";
import { StoryObject } from "@/src/lib/types/api-types";

export default function AlsoReading() {
  const [currentPage, setCurrentPage] = useState(1);

  const { isPending, data, error } = useLatestStories(currentPage, 4);

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-13">
      <StoryCarouselTemplate
        data={data as StoryObject}
        error={error}
        isPending={isPending}
        title={"ALSO READING"}
        onChangePage={onChangePage}
        currentPage={currentPage}
      />
    </div>
  );
}
