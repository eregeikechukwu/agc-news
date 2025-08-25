export default function OtherStoriesSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="skeleton_shimmer w-32 h-6 rounded-md" />
      <div className="space-y-4 mt-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton_shimmer h-16 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
}
