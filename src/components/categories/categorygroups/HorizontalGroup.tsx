import { Story } from "@/src/lib/types/api-types";
import "@/src/styles/sass/utils.scss";
import Link from "next/link";
import HorizontalScrollGridContainer from "../../UI/horizontalScrollGridContainer";
import { LatestNewsCardSkeleton } from "../../skeletons/LatestStoriesSkeleton";

export default function HorizontalGroup({
  ref,
  stories,
  isPending,
}: {
  ref: React.Ref<HTMLDivElement>;
  stories: Story[];
  isPending?: boolean;
}) {
  function Card({ item }: { item: Story }) {
    return (
      <div
        style={{ backgroundImage: `url(${item.banner_image})` }}
        className=" rounded-[0.75rem] max-md:h-[24.8rem]  bg-cover bottom_shadow_carousel"
      >
        <Link href={`/stories/${item.id}`}>
          <div className={`px-[1.06rem] pb-[5%] story_description_carousel`}>
            <p className="text-xl text-white">{item.description}</p>
          </div>
        </Link>
        <Link href={`/categories/${item.category?.category_name}`}>
          <button className="category_button">
            {item.category?.category_name}
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="w-full  overflow-x-auto no-scrollbar touch-scroll"
    >
      <HorizontalScrollGridContainer>
        {stories?.map((item: Story, i: number) => (
          <Card item={item} key={i} />
        ))}
        {isPending &&
          Array.from({ length: 4 }).map((_, i) => (
            <LatestNewsCardSkeleton i={i} key={i} />
          ))}
      </HorizontalScrollGridContainer>
    </div>
  );
}
