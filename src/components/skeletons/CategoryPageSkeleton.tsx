import StoryCardSkeleton from "./TopStoriesSkeleton";

export default function CategoryPageSkeleton() {
  return (
    <div>
      {/* Top Grid (Latest Stories) */}
      <StoryCardSkeleton />

      {/* Section Header */}
      <div className="mt-22">
        <div className="h-6 w-70 skeleton_shimmer rounded" />
      </div>

      {/* Other Stories + Ads */}
      <OtherStoriesSkeleton />

      {/* Pagination Tabs */}
      <div className="mt-26 lg:block hidden w-fit mr-full">
        <div className="flex gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-10 h-10 rounded-full skeleton_shimmer" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function OtherStoriesSkeleton() {
  return (
    <>
      {/* Other Stories + Ads */}
      <div className="mt-8 flex lg:flex-row flex-col gap-6 lg:gap-10">
        {/* Left Column – Other Stories */}
        <div className="flex-1 flex flex-col md:gap-8 gap-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="lg:h-[200px] p-4 max-lg:p-2 max-lg:py-4 max-lg:rounded-lg bg-gray-100 h-auto rounded flex lg:gap-5  gap-2"
            >
              <div className="lg:w-[40%] w-[20%] skeleton_shimmer"></div>
              <div className="w-[60%] flex flex-col gap-2">
                <div className="h-4 w-[80%] rounded-md skeleton_shimmer" />
                <div className="h-4 w-[90%] rounded-md skeleton_shimmer" />
                <div className="h-4 w-[80%] rounded-md skeleton_shimmer" />
                <div className="h-4 w-[80%] rounded-md skeleton_shimmer" />
                <div className="h-4 w-[30%] rounded-md skeleton_shimmer" />
                {/* continue reading button */}
                <div className="!rounded-full w-28 h-10 mt-auto skeleton_shimmer hidden md:block"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column – Ads */}
        <div className="lg:basis-[18.5rem] lg:w-fit w-full flex lg:flex-col flex-row md:gap-10 gap-5">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="w-[266px] h-[400px] rounded skeleton_shimmer"
            />
          ))}
        </div>
      </div>
    </>
  );
}
