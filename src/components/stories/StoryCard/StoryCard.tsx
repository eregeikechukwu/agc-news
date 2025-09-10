import Image from "next/image";
import styles from "./StoryCard.module.scss";
import "@/src/styles/sass/utils.scss";
import Tag from "../../UI/Tag";
import { formatDateToNow } from "@/src/utils/getDateToNow";
import { StoryCardProps } from "@/src/app/stories/stories.types";
import Link from "next/link";
import { useImage } from "@/src/hooks/useImage";
import clsx from "clsx";

// Ensure StoryCardProps.story is required and Story fields are not optional

export function StoryCard({ variant, story, latest = false }: StoryCardProps) {
  const imageSrc = useImage(story.banner_image);

  if (variant === "grid") {
    return (
      <Link
        className={`md:min-h-[11.63rem] cursor-pointer`}
        href={`/stories/${story.id}`}
      >
        <div
          className={`bg-cover h-full md:relative ${
            styles.gridCard
          } bottom_shadow max-md:flex ${
            latest ? "max-md:flex-col gap-4" : "max-md:flex-row  gap-4"
          }`}
        >
          <div
            className={clsx(
              "md:h-full w-full md:relative max-sm:rounded-sm overflow-hidden",
              {
                "mobile-aspect": latest,
                "max-md:aspect-[11/8] max-md:max-h-50": !latest,
              }
            )}
          >
            <Image
              width={450}
              height={290}
              src={imageSrc}
              alt={`${story.description}'s jpeg`}
              className={`object-cover  transition-all duration-500 hover:scale-105 md:absolute md:inset-0 !w-full !h-full `}
            />
          </div>

          <div
            className={`md:px-[1.06rem] pb-[1%]  story_description ${
              latest ? "max-md:gap-[0.375rem]" : "max-md:gap-[0.3rem]"
            }`}
          >
            <h1 className="text-[0.88rem] text-[#F85FD0]">
              {latest ? "LATEST TODAY" : "NEWS TODAY"}
            </h1>
            <p
              className={`md:text-[1.3rem] font-nunito font-semibold leading-snug md:text-white ${
                latest
                  ? "text-[1.38rem]"
                  : "min-[560px]:!text-[1.3rem] text-[1rem]"
              }`}
            >
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
          className={` ${styles.gridCard} bg-cover md:min-h-128 w-full bottom_shadow`}
        >
          <div>
            <Image
              width={450}
              height={290}
              src={imageSrc}
              alt={`${story.description}'s jpeg`}
              className="object-cover transition-all duration-500 hover:scale-105 mobile-aspect md:absolute md:inset-0 w-full h-full "
            />
          </div>
          <div
            className={`md:px-[1.5rem] md:pt-0 pt-4 md:pb-[1.6rem] pb-3 story_description`}
          >
            <p className="md:text-2xl text-[1.37rem] md:text-white text-black font-nunito font-semibold ">
              {story.description}
            </p>
            <div className="md:mt-[1.12rem]">
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
          <Link href={`/categories/${story.category?.category_name}`}>
            <button className="category_button">
              {story.category?.category_name}
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
          <div className="md:h-[27.19rem] imageEffect">
            <Image
              src={imageSrc}
              alt={`${story.description}'s jpeg`}
              width={721}
              height={391.5}
              className="sm:h-full mobile-aspect w-full object-cover"
            />
          </div>
          <h1 className="sm:text-[1.75rem] text-[1.375rem] font-semibold font-nunito mt-[0.88rem]">
            {story.title}
          </h1>
          <p className="sm:text-xl text-[1rem] text-[#5a5a5a] mt-[0.19rem]">
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
