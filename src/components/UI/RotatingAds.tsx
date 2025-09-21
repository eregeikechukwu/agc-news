"use client";

import { useAds } from "@/src/app/features/ads/useAds";
import Image from "next/image";

export default function RotatingAds({ className }: { className?: string }) {
  const ads = useAds("headerAds");

  return (
    <>
      <span className="text-[0.5rem] block">Advertisement</span>
      <div
        className={`m-auto md:flex-row flex-col gap-[0.62rem] max-lg:max-w-[70vw]  sm:h-[20rem] max-[560px]:h-[10rem] md:h-50 justify-center flex lg:max-w-[90vw] ${className}`}
      >
        {ads.map((src, i) => (
          <Image
            key={i}
            width={900}
            height={100}
            src={src.toString() || "images/placeholder-image.jpg"}
            alt={`ad-${i}`}
            className="flex-1 object-contain max-h-50 h-auto w-auto min-w-0 "
          />
        ))}
      </div>
    </>
  );
}
