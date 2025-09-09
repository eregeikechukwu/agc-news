"use client";

import Image from "next/image";
import { useAds } from "./useAds";
import RotatingAds from "@/src/components/UI/RotatingAds";

export default function MiddlePageAd() {
  const ad = useAds("headerAds");

  return (
    <div>
      <div className="md:h-[26.31rem] md:mt-0 h-[19rem] md:my-0 my-5  w-full flex items-center ">
        <RotatingAds className="!max-w-screen" />
      </div>
    </div>
  );
}
