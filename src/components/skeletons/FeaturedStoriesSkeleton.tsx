export default function FeaturedStoriesSkeleton() {
  return (
    <div className="mt-6 grid relative grid-cols-3 gap-7">
      {/* Left and Middle Story Groups */}
      {[...Array(2)].map((_, i) => (
        <div key={i}>
          {/* Main Story Card */}
          <div className="h-[250px] w-full rounded-lg skeleton_shimmer" />

          {/* Description Texts */}
          <div className="mt-5 flex flex-col gap-[0.9rem] text-[1.25rem]">
            {[...Array(3)].map((_, j) => (
              <div key={j} className="h-5 w-[90%] rounded skeleton_shimmer" />
            ))}
          </div>
        </div>
      ))}

      {/* Right Ad Section */}
      <div className="flex-col -top-10 right-0 absolute flex gap-4 items-end">
        <p className="absolute -top-[1.38rem] right-0 text-[0.69rem]">
          ADVERTISEMENT
        </p>
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="h-[444px] w-[344px] max-w-[20rem] rounded-lg skeleton_shimmer"
          />
        ))}
      </div>
    </div>
  );
}
