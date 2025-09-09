"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navCategories1, navCategories2 } from "@/src/utils/appHeaderItems";
import Logo from "../UI/logo";
import { Search, Triangle } from "lucide-react";
import SearchBox from "../UI/Searchbox";
import React, { memo, useEffect, useCallback, useRef, useState } from "react";
import { useAppDispatch } from "@/src/hooks/reduxHooks";
import {
  clearSearch,
  toggleBackdrop,
  toggleSearch,
  closeSearch,
} from "@/src/lib/slices/appSlice";
import { useIntersectionObserver } from "@/src/hooks/useINtersectionObserver";
import Hamburger from "../UI/Hamburger";
import useScreenSize from "@/src/hooks/useScreenSize";
import Menu from "./Menu/Menu";
import useClickOutside from "@/src/hooks/useClickOutside";
import { useAppSelector } from "@/src/hooks/reduxHooks";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet } = useScreenSize();

  const { isSearchOpen } = useAppSelector((state) => state.app);

  const url = usePathname();
  const dispatch = useAppDispatch();

  // Close search when the url changes
  useEffect(() => {
    dispatch(closeSearch());
    dispatch(clearSearch());
  }, [url]);

  const toggleMenu = useCallback(() => {
    if (!isSearchOpen) {
      //so the menu and the search wont be opne at the same time
      setIsMenuOpen((prev) => !prev);
      dispatch(toggleBackdrop());
    }
  }, [isSearchOpen]);

  //Lock scrol when meu or search is open
  if (isMenuOpen || isSearchOpen) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "scroll";
  }

  //close menu for mobile when outside of the menu is clicked
  useClickOutside(isSearchOpen, () => {
    dispatch(toggleSearch());
  });

  // Intersection observer
  useIntersectionObserver(navRef as React.RefObject<HTMLElement>);

  if (isMobile === null || isTablet === null) return null;
  return (
    <div
      ref={navRef}
      className="bg-[#1B1B1B] z-200 flex lg:top-[calc(100%-var(--nav-height))] top-0 lg:bottom-0 right-0 left-0 text-white absolute text-[1.13rem]  h-18 lg:h-[var(--nav-height)] px-[0.94rem] sm:px-[1.7rem] md:px-[2.81rem]  justify-between"
    >
      {!(isMobile || isTablet) ? (
        <>
          {/* first categories */}
          <div className="lg:flex hidden gap-[1.62rem] items-center">
            <Logo />
            <div className="flex gap-6">
              {navCategories1.map((item, i) => (
                <Link href={item.path} key={i}>
                  <p className="text-[1rem] relative">
                    {item.name}

                    {url === item.path && (
                      <span className="w-5 bottom-0 absolute rounded-full h-[3px] left-0 bg-red-500"></span>
                    )}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex gap-[1.31rem] items-center">
            <span className="h-5 w-[1px]  bg-white"></span>
            <div className="flex items-center gap-6">
              {navCategories2.map((item, i) => (
                <Link href={item.path} key={i}>
                  <p className=" relative">
                    {item.name}

                    {url === item.path && (
                      <span className="w-5 bottom-0 absolute rounded-full h-[3px] left-0 bg-red-500"></span>
                    )}
                  </p>
                </Link>
              ))}

              {/* Search icon */}
              <div
                onClick={() => dispatch(toggleSearch())}
                className="group  center_child relative h-9 "
              >
                <Search className="w-[0.88rem]" />
                <span className="centered rounded-xl h-10 group-hover:opacity-70 z-2 transition duration-500 opacity-0 group-active:opacity-100 w-10 bg-[#7a7a7a]"></span>
              </div>

              {/* Search */}
              <SearchBox isSearchOpen={isSearchOpen} />
              <div className="flex gap-2">
                <p>Log in</p> / <p>Sign up</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="lg:hidden  items-center justify-between  w-full flex">
            <div className="flex items-center gap-7">
              <div className="center_child">
                <Hamburger toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
              </div>
              <Search onClick={() => dispatch(toggleSearch())} className="" />
              <SearchBox isSearchOpen={isSearchOpen} />
              <Logo />
            </div>
            <div className="flex items-center gap-3">
              <img src={"/images/ProfilePicture.png"} className="w-9 h-9" />
              <Triangle fill="white" className="rotate-180 w-3 h-3" />
            </div>
            {/* Menu */}
            <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          </div>
        </>
      )}
    </div>
  );
}

export default memo(Nav);
