import Image from "next/image";
import { StroyCardProps } from "@/src/app/stories/stories.types";
import styles from "./categories.module.scss";
import HorizontalGroup from "./categorygroups/HorizontalGroup";
import { Story } from "@/src/lib/types/api-types";

export function CategoryGroup({
  variant = "vertical",
  stories,
}: StroyCardProps) {
  if (variant === "horizontal") {
    return <HorizontalGroup stories={stories as Story[]} />;
  }
  if (variant === "large") {
    return <div>I dey come</div>;
  }
}
