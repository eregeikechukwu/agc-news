"use client";

import Image from "next/image";
import { useFeaturedStories } from "@/src/app/stories/useStories";
import H1 from "@/src/components/UI/H1";
import { StoryCard } from "../stories/StoryCard/StoryCard";
import { useEffect, useState } from "react";
import { Story } from "@/src/lib/types/api-types.js";
import { CategoryGroup } from "@/src/app/categories/categories.types.js";
import { useAds } from "@/src/app/features/ads/useAds";
import FeaturedStoriesSkeleton from "../skeletons/FeaturedStoriesSkeleton";
import Link from "next/link";
import NoStories from "../Fallbacks/NoStories";

export default function FeaturedStories() {
  const { data, isPending, error } = useFeaturedStories(1, 30);
  const [categoryGroup, setCategoryGroup] = useState<CategoryGroup[]>();
  const ads = useAds("sideAds").slice(0, 2);

  useEffect(() => {
    function groupByCategory(items: Story[]) {
      const map = new Map<string, Story[]>();

      items.forEach((item) => {
        const category = item.category?.category_name ?? "Uncategorized";
        if (!map.has(category)) {
          map.set(category, []);
        }
        map.get(category)?.push(item);
      });

      return Array.from(map.entries()).map(([category, data]) => ({
        category,
        data,
      }));
    }

    setCategoryGroup(groupByCategory(data?.data || []));
  }, [data]);

  if (error) return <div>Error: {error.message}</div>;
  if (!categoryGroup || categoryGroup.length < 1)
    return (
      <div>
        <NoStories title="Featured" />
      </div>
    );

  return (
    <div>
      <H1 highlight="#813D97" chevron={true}>
        FEATURED STORIES
      </H1>

      {/* Items tab */}
      {isPending ? (
        <FeaturedStoriesSkeleton />
      ) : (
        <div className="mt-6 grid relative grid-cols-3 gap-7">
          {categoryGroup?.slice(0, 2).map((group, i) => (
            <div key={i}>
              <StoryCard variant="unpacked" story={group.data[0]} />
              <div className="mt-5 flex text-[1.25rem] flex-col gap-[0.9rem]">
                {group.data.slice(1, 4).map((item, i) => (
                  <Link href={`/stories/${item.id}`} key={i}>
                    <div>
                      <p className="hover:text-[var(--color-purple-agc)] cursor-pointer">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="flex-col -top-10 right-0 absolute  flex gap-4">
            <p className="absolute -top-[1.38rem] right-0 text-[0.69rem]">
              ADVERTISEMENT
            </p>
            {ads.map((ad, i) => (
              <Image
                key={i}
                width={344}
                height={444}
                src={ad.toString() || "images/placeholder-image.jpg"}
                alt="ad"
                className="max-w-[20rem] imageEffect self-end"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
