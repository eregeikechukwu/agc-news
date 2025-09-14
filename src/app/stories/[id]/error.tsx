"use client";

import ErrorFallback from "@/src/components/Fallbacks/ErrorFallback";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <ErrorFallback message="Something went wrong fetching page data." />
    </div>
  );
}

//An important file/component used as fall back for the page server fetching error state.
