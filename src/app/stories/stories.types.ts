import { Story } from "@/src/lib/types/api-types";

export type StroyCardProps = {
  variant?: "vertical" | "horizontal" | "large" | "grid";
  stories: Story[];
};

export interface StoryCardProps {
  variant: "horizontal" | "grid" | "large" | "unpacked";
  story: Story;
  latest?: boolean;
}

export interface StoryIdProp {
  storyId: string;
}
