// components/StoryCardSkeleton.tsx
import "@/src/styles/skeleton.scss";

export default function LatestNewsSkeleton({ count = 4 }) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(22%,1fr))] grid-rows-[repeat(auto-fill,24rem)] grid-flow-col gap-[1.06rem]">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="relative rounded-[0.75rem] h-[24rem] overflow-hidden skeleton_shimmer"
          >
            <div className="absolute top-[1.06rem] left-[1.06rem] w-[7.56rem] h-10 bg-gray-400 rounded-md"></div>

            <div className="absolute bottom-[5%] left-[1.06rem] right-[1.06rem] h-6 bg-gray-400 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
