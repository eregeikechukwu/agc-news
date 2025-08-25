export default function EditorPicksSkeleton() {
  return (
    <div className="flex flex-col mb-8 lg:flex-row gap-6 w-full">
      {/* Left: Featured story */}
      <div className="w-full relative lg:w-[70%] h-[30rem] rounded-md skeleton_shimmer">
        <div className="absolute h-[2.69rem] rounded-full w-24 skeleton_shimmer  top-[1.12rem] left-[1.06rem]"></div>
      </div>

      {/* Right: List of 4 mini stories */}
      <div className="flex flex-col w-full lg:w-[30%] gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="flex-1">
              <div className="h-4 w-[80%] rounded-md skeleton_shimmer mb-2"></div>
              <div className="h-3 w-[60%] rounded-md skeleton_shimmer"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
