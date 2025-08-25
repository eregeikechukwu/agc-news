import { formatDate } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Story } from "../../lib/types/api-types";
import { useImage } from "@/src/hooks/useImage";

export default function CategoryStory({ story }: { story: Story }) {
  function extractPlainText(html: string) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }
  const imageSrc = useImage(story.banner_image);

  return (
    <div className="flex  gap-[1.65rem]">
      <div className="w-[28.31rem] h-[19rem] overflow-hidden rounded-md flex-shrink-0">
        <Image
          src={imageSrc}
          alt="banner image"
          width={453}
          height={305}
          className="w-full h-full object-cover imageEffect"
        />
      </div>

      <div className="flex h-full flex-col">
        <h3 className="text-2xl font-semibold leading-snug">{story.title}</h3>
        <p className=" text text-[#5A5A5A] mt-2">
          Posted{" "}
          {story.created_at ? formatDate(story.created_at, "hh:mm aa") : ""},
          {story.created_at
            ? formatDate(story.created_at, "EEE, MMMM dd, yyyy")
            : ""}
        </p>
        <div className="line-clamp-4 mt-3">
          {story.content && extractPlainText(story.content)}
        </div>
        <Link className="self-start mt-auto mb-4" href={`/stories/${story.id}`}>
          <button className="bg-black/10 rounded-full text-[0.81rem] cursor-pointer hover:bg-black/50 active:bg-black/30 w-36 h-10 box-border border-[0.06rem] border-[#999999]">
            Continue reading
          </button>
        </Link>
      </div>
    </div>
  );
}
