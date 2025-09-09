export default function MissedStorySkeleton() {
  return (
    <div className="grid  lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-12">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex gap-3">
          {/* Left Dot */}
          <div className="h-[0.94rem] min-w-[0.94rem] rounded-xs mt-1 skeleton_shimmer" />

          {/* Right Text Block */}
          <div className="flex flex-col gap-3 w-full">
            {/* Title Skeleton */}
            <div className="h-4 md:w-[80%] sm:w-full rounded skeleton_shimmer" />
            <div className="h-4 md:w-[80%] sm:w-full rounded skeleton_shimmer" />

            {/* Tag Row */}
            <div className="flex gap-2 mt-2">
              <div className="h-4 w-16 rounded-full skeleton_shimmer" />
              <div className="h-4 w-24 rounded-full skeleton_shimmer" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
