import { useLatestStories } from "@/src/app/stories/useStories";
import StoryCarouselTemplate from "../stories/StoryCarouselTemplate";
import { useEffect, useState } from "react";
import { StoryObject, Story } from "@/src/lib/types/api-types";
import useScreenSize from "@/src/hooks/useScreenSize";

export default function AlsoReading() {
  const [currentPage, setCurrentPage] = useState(1);
  const [stories, setStories] = useState<Story[]>([]);

  const { isMobile, isTablet } = useScreenSize();

  const { isPending, data, error } = useLatestStories(currentPage, 4);

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!isMobile && !isTablet) {
      setStories(data?.data || []);
    } else {
      setStories((stories) => [...stories, data?.data || []].flat());
    }
  }, [data]);

  return (
    <div className="mt-13">
      <StoryCarouselTemplate
        stories={(stories as Story[]) || []}
        data={data as StoryObject}
        error={error}
        isPending={isPending}
        title={"PEOPLE ARE ALSO READING"}
        onChangePage={onChangePage}
        currentPage={currentPage}
      />
    </div>
  );
}
