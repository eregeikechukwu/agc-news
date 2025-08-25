export default function NewsCategorySkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* Left: Featured story */}
      <div className="w-full lg:w-[65%] h-[20rem] rounded-md skeleton_shimmer"></div>

      {/* Right: List of 4 mini stories */}
      <div className="flex flex-col w-full lg:w-[35%] gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-[1rem] h-[1rem] rounded-sm bg-[#F52A32]"></div>
            <div className="flex-1">
              <div className="h-4 w-[80%] rounded-md skeleton_shimmer mb-2"></div>
              <div className="h-3 w-[60%] rounded-md skeleton_shimmer"></div>
            </div>
            <div className="w-[4.5rem] h-[3rem] rounded-md skeleton_shimmer"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
