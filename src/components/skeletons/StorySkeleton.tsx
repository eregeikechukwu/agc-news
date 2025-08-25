import OtherStoriesSkeleton from "./OtherStoriesSkeleton";

export default function StorySkeleton() {
  return (
    <section className="pt-[3.6rem] animate-pulse">
      {/* Heading */}
      <div className="max-w-[59rem] flex flex-col gap-3">
        <div className="flex gap-[1.12rem]">
          <div className="skeleton_shimmer h-10 w-[8.06rem] rounded-full" />
          <div className="skeleton_shimmer h-10 w-[6.5rem] rounded-full" />
        </div>
        <div className="skeleton_shimmer h-8 w-3/4 rounded-md" />
        <div className="skeleton_shimmer h-5 w-[16rem] rounded-md" />
        <div className="skeleton_shimmer h-5 w-[10rem] rounded-md" />
      </div>

      {/* Content Section */}
      <div className="flex gap-[4.6rem] mt-8">
        {/* Left: Main content */}
        <div className="basis-[68%] flex flex-col gap-5">
          <div className="skeleton_shimmer w-full h-[32rem] rounded-md" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`skeleton_shimmer h-4 rounded-md ${
                  i % 3 === 0 ? "w-[95%]" : "w-full"
                }`}
              />
            ))}
          </div>

          {/* Socials */}
          <div className="mt-5 flex gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton_shimmer w-6 h-6 rounded-full" />
            ))}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="flex-1 flex flex-col h-full justify-between">
          {/* Top Stories */}
          <OtherStoriesSkeleton />
          {/* Ads */}
          <div className="mt-14 flex flex-col gap-8">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="skeleton_shimmer w-[80%] self-end h-[250px] rounded-md"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
