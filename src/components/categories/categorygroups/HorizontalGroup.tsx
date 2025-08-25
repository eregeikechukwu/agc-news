import { Story } from "@/src/lib/types/api-types";
import "@/src/styles/utils.scss";
import Link from "next/link";

export default function HorizontalGroup({ stories }: { stories: Story[] }) {
  function Card({ item }: { item: Story }) {
    return (
      <div
        style={{ backgroundImage: `url(${item.banner_image})` }}
        className=" rounded-[0.75rem] bg-cover bottom_shadow"
      >
        <Link href={`/stories/${item.id}`}>
          <div className={`px-[1.06rem] pb-[5%] story_description`}>
            <p className="text-xl text-white">{item.description}</p>
          </div>
        </Link>
        <Link href={`/categories/${item.category.category_name}`}>
          <button className="category_button">
            {item.category.category_name}
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="gap-[1.06rem] grid-rows-[repeat(auto-fill,24rem)] grid-flow-col  grid grid-cols-[repeat(auto-fill,minmax(22%,1fr))]">
        {stories?.map((item: Story, i: number) => (
          <Card item={item} key={i} />
        ))}
      </div>
    </div>
  );
}
