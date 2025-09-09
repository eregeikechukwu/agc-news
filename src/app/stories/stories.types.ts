import { Story } from "@/src/lib/types/api-types";

export type StroyCardProps = {
  ref: React.Ref<HTMLDivElement>;
  variant?: "vertical" | "horizontal" | "large" | "grid";
  stories: Story[];
  isPending?: boolean;
};

export interface StoryCardProps {
  variant: "horizontal" | "grid" | "large" | "unpacked";
  story: Story;
  latest?: boolean;
}

export interface StoryIdProp {
  storyId: string;
}
