"use client";

import { useAppSelector } from "@/src/hooks/reduxHooks";
import { cn } from "@/src/lib/utils";

export default function BackDrop() {
  const { isBackdropVisible } = useAppSelector((state) => state.app);

  return (
    <div
      id="backdrop"
      className={cn(
        "fixed backdrop-blur-sm top-0 z-100  duration-500 left-0 w-full h-full bg-[rgba(0,0,0,0.5)]",
        isBackdropVisible ? "backdrop-enter" : "backdrop-exit"
      )}
    ></div>
  );
}
