import Image from "next/image";
import { StroyCardProps } from "@/src/app/stories/stories.types";
import styles from "./categories.module.scss";
import HorizontalGroup from "./categorygroups/HorizontalGroup";
import { Story } from "@/src/lib/types/api-types";

export function CategoryGroup({
  ref,
  variant = "vertical",
  stories,
  isPending,
}: StroyCardProps) {
  if (variant === "horizontal") {
    return (
      <HorizontalGroup
        ref={ref}
        isPending={isPending}
        stories={stories as Story[]}
      />
    );
  }
  if (variant === "large") {
    return <div>I dey come</div>;
  }
}
