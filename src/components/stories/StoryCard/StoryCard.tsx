import Image from "next/image";
import styles from "./StoryCard.module.scss";
import "@/src/styles/utils.scss";
import Tag from "../../UI/Tag";
import { formatDateToNow } from "@/src/utils/getDateToNow";
import { StoryCardProps } from "@/src/app/stories/stories.types";
import Link from "next/link";
import { useImage } from "@/src/hooks/useImage";

// Ensure StoryCardProps.story is required and Story fields are not optional

export function StoryCard({ variant, story, latest = false }: StoryCardProps) {
  const imageSrc = useImage(story.banner_image);

  if (variant === "grid") {
    return (
      <Link
        className={`min-h-[11.63rem] cursor-pointer`}
        href={`/stories/${story.id}`}
      >
        <div
          className={` bg-cover h-full relative ${styles.gridCard} bottom_shadow`}
        >
          <div>
            <Image
              width={450}
              height={290}
              src={imageSrc}
              alt={`${story.description}'s jpeg`}
              className="object-cover transition-all duration-500 hover:scale-105  absolute inset-0 w-full h-full "
            />
          </div>

          <div className={`px-[1.06rem] pb-[1%] story_description`}>
            <h1 className="text-[0.88rem] text-[#F85FD0]">
              {latest ? "LATEST TODAY" : "NEWS TODAY"}
            </h1>
            <p className="text-[1.3rem] leading-snug text-white">
              {story.description}
            </p>
          </div>
        </div>
      </Link>
    );
  }
  if (variant === "horizontal") {
    return (
      <Link href={`/stories/${story.id}`}>
        <div
          className={`relative ${styles.gridCard} bg-cover min-h-128 bottom_shadow`}
        >
          <div>
            <Image
              width={450}
              height={290}
              src={imageSrc}
              alt={`${story.description}'s jpeg`}
              className="object-cover transition-all duration-500 hover:scale-105  absolute inset-0 w-full h-full "
            />
          </div>
          <div className={`px-[1.5rem] pb-[1.6rem] story_description`}>
            <p className="text-2xl text-white">{story.description}</p>
            <div className=" mt-[1.12rem]">
              <Tag>{story.author}</Tag>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "unpacked") {
    return (
      <div className="w-full border-b-[0.06rem] border-[#c8c8c8] pb-4">
        <div className="h-[18.13rem] relative ">
          <Link href={`/stories/${story.id}`} className="h-full imageEffect">
            <Image
              width={450}
              height={290}
              src={imageSrc}
              alt={`${story.description}'s jpeg`}
              className="object-cover w-full h-full "
            />
          </Link>
          <Link href={`/categories/${story.category.category_name}`}>
            <button className="category_button">
              {story.category.category_name}
            </button>
          </Link>
        </div>
        <h3 className="text-2xl leading-snug mt-[0.8rem]">{story.title}</h3>
        <div className="flex gap-4 mt-[1.15rem]">
          <Tag variant="dark">{story.author}</Tag>
          <Tag variant="dark">
            Posted {formatDateToNow(story?.created_at || "")}
          </Tag>
        </div>
      </div>
    );
  }

  if (variant === "large") {
    return (
      <Link href={`/stories/${story.id}`}>
        <div className="n">
          <div className="h-[27.19rem] imageEffect">
            <Image
              src={imageSrc}
              alt={`${story.description}'s jpeg`}
              width={721}
              height={391.5}
              className="h-full w-full object-cover"
            />
          </div>
          <h1 className="text-[1.75rem] mt-[0.88rem]">{story.title}</h1>
          <p className="text-xl text-[#5a5a5a] mt-[0.19rem]">
            {story.description}
          </p>
          <div className="flex gap-4 mt-[1.15rem]">
            <Tag variant="dark">{story.author}</Tag>
            <Tag variant="dark">
              Posted {formatDateToNow(story?.created_at || "")}
            </Tag>
          </div>
        </div>
      </Link>
    );
  }
}
