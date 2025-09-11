import { useImage } from "@/src/hooks/useImage";
import { Story } from "@/src/lib/types/api-types";
import Image from "next/image";
import Link from "next/link";

export default function OthersGridItem({
  variant,
  story,
}: {
  variant?: "simple" | "withImg";
  story: Story;
}) {
  const imageSrc = useImage(story.banner_image);

  return (
    <Link href={`/stories/${story.id}`}>
      <div className="flex hover:bg-gray-100 active:bg-gray-200 transition-all rounded-xl md:p-4 py-3 gap-3 text-[1.25rem] cursor-pointer">
        <span className="h-[.94rem] mt-2  rounded-[0.13rem] bg-[#f52a32] w-[.94rem]"></span>
        <p className="flex-1 active-story font-nunito">{story.description}</p>
        {variant === "withImg" && (
          <div className="h-23 basis-42 self-end">
            <Image
              alt={`${story.description}'s  jpeg`}
              width={151.2}
              height={82.8}
              src={imageSrc}
              className="w-full !h-23 object-cover"
            />
          </div>
        )}
      </div>
    </Link>
  );
}
