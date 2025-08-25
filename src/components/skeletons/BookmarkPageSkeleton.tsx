export default function BookmarkPageSkeleton() {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm transition hover:shadow-md relative">
      {/* Image skeleton */}
      <div className="w-full h-[12rem] bg-gray-200 skeleton_shimmer" />

      {/* Remove button skeleton */}
      <div className="h-12 w-12 !absolute top-4 right-4 rounded-full bg-gray-300 border-2 border-white skeleton_shimmer" />

      {/* Text content */}
      <div className="p-4 flex flex-col gap-2">
        {/* Title */}
        <div className="h-[1.2rem] w-[80%] bg-gray-200 rounded-md skeleton_shimmer" />
        {/* Paragraph lines */}
        <div className="h-[0.9rem] w-full bg-gray-200 rounded-md skeleton_shimmer" />
        <div className="h-[0.9rem] w-[90%] bg-gray-200 rounded-md skeleton_shimmer" />
        <div className="h-[0.9rem] w-[70%] bg-gray-200 rounded-md skeleton_shimmer" />
      </div>
    </div>
  );
}
