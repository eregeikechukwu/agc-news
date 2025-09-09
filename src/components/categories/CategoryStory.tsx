import { formatDate } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Story } from "../../lib/types/api-types";
import { useImage } from "@/src/hooks/useImage";
import useScreenSize from "@/src/hooks/useScreenSize";

export default function CategoryStory({ story }: { story: Story }) {
  function extractPlainText(html: string) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  const { isMobile } = useScreenSize();
  const imageSrc = useImage(story.banner_image);

  return (
    <div className="flex md:gap-[1.65rem] max-md:py-4 max-md:rounded-lg gap-4 max-md:border-gray-200 max-md:px-2 max-md:shadow-sm">
      <div
        className="lg:w-[28.31rem] sm:w-[20rem] lg:h-[19rem]  sm:h-[13.4rem] min-[560px]:h-[11rem] min-[560px]:w-[17rem] h-auto w-[5rem] overflow-hidden rounded-md flex-shrink-0     
      "
      >
        <Image
          src={imageSrc}
          alt="banner image"
          width={453}
          height={305}
          className="w-full h-full object-cover imageEffect"
        />
      </div>

      <div className="flex h-full flex-col">
        <h3 className="lg:text-2xl  md:text-xl text-[1rem] font-semibold leading-snug">
          {story.title}
        </h3>
        <p className=" md:text text-[0.7rem]  text-[#5A5A5A] mt-1 md:mt-2">
          Posted{" "}
          {story.created_at ? formatDate(story.created_at, "hh:mm aa") : ""},
          {story.created_at
            ? formatDate(story.created_at, "EEE, MMMM dd, yyyy")
            : ""}
        </p>
        <div className="line-clamp-4 mt-3 max-md:text-[0.8rem] ">
          {story.content && extractPlainText(story.content)}
        </div>
        <Link
          className="self-start mt-auto md:mb-4"
          href={`/stories/${story.id}`}
        >
          {isMobile ? (
            <button className="text-red-500  cursor-pointer  mt-3 font-bold text-[0.81rem]">
              Continue reading &rarr;{" "}
            </button>
          ) : (
            <button className="bg-black/10 rounded-full text-[0.81rem] hover:bg-black/50 active:bg-black/30 w-36 h-10 box-border border-[0.06rem] border-[#999999]">
              Continue reading
            </button>
          )}
        </Link>
      </div>
    </div>
  );
}
