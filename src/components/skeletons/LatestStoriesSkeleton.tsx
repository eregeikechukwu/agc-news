// components/StoryCardSkeleton.tsx
import "@/src/styles/sass/skeleton.scss";
import HorizontalScrollGridContainer from "../UI/horizontalScrollGridContainer";

export default function LatestNewsSkeleton({ count = 4 }) {
  return (
    <div className="w-full no-scrollbar overflow-x-auto">
      <HorizontalScrollGridContainer>
        {Array.from({ length: count }).map((_, i) => (
          <LatestNewsCardSkeleton i={i} key={i} />
        ))}
      </HorizontalScrollGridContainer>
    </div>
  );
}

export function LatestNewsCardSkeleton({ i = 1 }: { i: number }) {
  return (
    <div
      key={i}
      className="relative rounded-[0.75rem] h-[24rem] overflow-hidden skeleton_shimmer"
    >
      <div className="absolute top-[1.06rem] left-[1.06rem] w-[7.56rem] h-10 bg-gray-400 rounded-md"></div>

      <div className="absolute bottom-[5%] left-[1.06rem] right-[1.06rem] h-6 bg-gray-400 rounded"></div>
    </div>
  );
}
