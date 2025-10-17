import { Story } from "@/src/lib/types/api-types";
import "@/src/styles/sass/utils.scss";
import Link from "next/link";
import HorizontalScrollGridContainer from "../../UI/horizontalScrollGridContainer";
import { LatestNewsCardSkeleton } from "../../skeletons/LatestStoriesSkeleton";
import Image from "next/image";

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
      <div className=" rounded-[0.75rem] max-md:h-[24.8rem] bottom_shadow_carousel">
        <Link href={`/stories/${item.id}`}>
          <Image
            src={item.banner_image}
            alt={`${item.description}'s jpeg`}
            width={450}
            height={290}
            className="object-cover transition-all duration-500 hover:scale-105 mobile-aspect md:absolute md:inset-0 w-full h-full"
          />
        </Link>
        <Link href={`/stories/${item.id}`}>
          <div className={`px-[1.06rem] pb-[5%] story_description_carousel`}>
            <p className="text-xl text-white">{item.description}</p>
          </div>
        </Link>
        <Link href={`/categories/${item.category?.category_name?.toLowerCase()}`}>
          <button className="category_button">
            {item.category?.category_name}
          </button>
        </Link>
      </div>
    );
  }

  // function Card({ item }: { item: Story }) {
  //   return (
  //     <div
  //       style={{ backgroundImage: `url(${item.banner_image})` }}
  //       className=" rounded-[0.75rem] max-md:h-[24.8rem]  bg-cover bottom_shadow_carousel"
  //     >
  //       <Image
  //         src={item.banner_image}
  //         alt={`${item.description}'s jpeg`}
  //         width={450}
  //         height={290}
  //         className="object-cover transition-all duration-500 hover:scale-105 mobile-aspect md:absolute md:inset-0 w-full h-full"
  //       />
  //       <Link href={`/stories/${item.id}`}>
  //         <div className={`px-[1.06rem] pb-[5%] story_description_carousel`}>
  //           <p className="text-xl text-white">{item.description}</p>
  //         </div>
  //       </Link>
  //       <Link href={`/categories/${item.category?.category_name}`}>
  //         <button className="category_button">
  //           {item.category?.category_name}
  //         </button>
  //       </Link>
  //     </div>
  //   );
  // }

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
