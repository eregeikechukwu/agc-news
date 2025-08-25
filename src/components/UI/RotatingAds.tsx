"use client";

import { useAds } from "@/src/app/features/ads/useAds";
import Image from "next/image";

export default function RotatingAds() {
  const ads = useAds("headerAds");

  return (
    <div className="m-auto gap-[0.62rem] justify-center flex max-w-[50vw] lg:max-w-[90vw]">
      {ads.map((src, i) => (
        <Image
          key={i}
          width={900}
          height={100}
          src={src.toString() || "images/placeholder-image.jpg"}
          alt={`ad-${i}`}
          className="flex-1 min-w-0"
        />
      ))}
    </div>
  );
}
