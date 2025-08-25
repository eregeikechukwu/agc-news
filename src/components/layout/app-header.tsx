"use client";

import { headerItems, socials } from "@/src/utils/appHeaderItems";
import Nav from "./nav";
import RotatingAds from "../UI/RotatingAds";
import Link from "next/link";
import useScreenSize from "@/src/hooks/useScreenSize";

export default function AppHeader() {
  const date = new Date();

  const { isMobile, isTablet } = useScreenSize();

  //display a skeleton header while client is loading
  if (isMobile === null || isTablet === null)
    return (
      <div className="skeleton_shimmer h-[4.5rem] justify-between px-4 flex items-center w-full bg-gray-400">
        <div className="w-13 h-12  skeleton_shimmer bg-gray-400"></div>
        <div className="w-13 h-13 !rounded-full skeleton_shimmer bg-gray-400"></div>
      </div>
    );

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // console.log(isTablet && "I am a tablet user");

  const dateString = date.toLocaleDateString("en-US", options);

  return (
    <div id="header" className="relative">
      {!(isMobile || isTablet) ? (
        <>
          <div className="h-[2.69rem] text-[0.94rem] text-white px-[2.12rem] flex justify-between items-center bg-[#D32C89]">
            <div className="flex gap-[1.81rem]">
              {headerItems.map((item, i) => (
                <Link href={item.href} className="cursor-pointer" key={i}>
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex gap-[1.62rem]">
              <p>{dateString}</p>
              <span className="h-5 w-[1px] bg-white"></span>
              <div className="flex gap-3">
                {socials.map((item, i) => (
                  <img
                    key={i}
                    className="h-5 w-5 cursor-pointer"
                    alt={item.name}
                    src={item.logo}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#1B1B1B] h-[26.31rem] w-full flex items-center pt-[2.31rem] pb-[var(--nav-height)]">
            <RotatingAds />
          </div>
          <Nav />
        </>
      ) : (
        <div>
          <Nav />

          <div className="mt-23">
            <RotatingAds />
          </div>
        </div>
      )}
    </div>
  );
}
