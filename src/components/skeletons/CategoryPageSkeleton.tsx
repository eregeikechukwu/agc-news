export default function CategoryPageSkeleton() {
  return (
    <div>
      {/* Top Grid (Latest Stories) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="skeleton_shimmer"
            style={{ height: "150px" }}
          >
            <div className="absolute bottom-[5%] left-[1.06rem] right-[1.06rem] h-6 bg-gray-400 rounded"></div>
          </div>
        ))}
      </div>

      {/* Section Header */}
      <div className="mt-18">
        <div className="h-6 w-[60%] skeleton_shimmer rounded" />
      </div>

      {/* Other Stories + Ads */}
      <div className="mt-8 flex gap-10">
        {/* Left Column – Other Stories */}
        <div className="flex-1 flex flex-col gap-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-[100px] rounded skeleton_shimmer" />
          ))}
        </div>

        {/* Right Column – Ads */}
        <div className="basis-[18.5rem] w-fit flex flex-col gap-10">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="w-[266px] h-[400px] rounded skeleton_shimmer"
            />
          ))}
        </div>
      </div>

      {/* Pagination Tabs */}
      <div className="mt-26 w-fit mr-full">
        <div className="flex gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-10 h-10 rounded-full skeleton_shimmer" />
          ))}
        </div>
      </div>
    </div>
  );
}
