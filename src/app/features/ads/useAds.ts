"use client";

import { useEffect, useMemo, useState } from "react";
import { adsData } from "./adsData";

export const useAds = (
  adType: "headerAds" | "sideAds" | "categoryAds" | "storyAds"
) => {
  // Memoize the ads list based on adType
  const ads = useMemo(() => {
    return adsData.find((ad) => ad.name === adType)?.ads || [];
  }, [adType]);

  const [index, setIndex] = useState(0);

  // Cycle to next ad every 5 seconds
  useEffect(() => {
    if (ads.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ads.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [ads.length]);

  // Return the current ad block (array of image strings)
  return ads[index] || [];
};
