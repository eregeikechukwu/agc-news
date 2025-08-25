"use client";

import Image from "next/image";
import { useAds } from "./useAds";

export default function MiddlePageAd() {
  const ad = useAds("headerAds");

  return (
    <div>
      <div className="h-[26.31rem] w-full flex items-center ">
        <div className="m-auto  gap-[0.62rem] justify-center  flex max-w-10/12">
          {ad &&
            ad.map((adImage, i) => (
              <Image
                key={i}
                width={900}
                height={100}
                src={adImage.toString() || "images/placeholder-image.jpg"}
                alt="ad"
              />
            ))}
        </div>
      </div>
    </div>
  );
}
