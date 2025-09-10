"use client";

import { socials } from "@/src/utils/appHeaderItems";
import Logo from "../UI/logo";
import Link from "next/link";
import { footerItems } from "@/src/utils/footerItems";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { toggleSearch } from "@/src/lib/slices/appSlice";

export default function Footer() {
  const dispatch = useDispatch();

  return (
    <section className="md:mt-28 mt-16 bg-[#2d2a2a]">
      <div className="lg:px-[10.3rem] md:px-[4.5rem] px-[1.5rem] py-[1.8rem]">
        <div className="flex justify-between">
          <Logo />
          <div className="flex gap-4">
            {socials.map((item, i) => (
              <img
                key={i}
                className="h-[1.66rem] w-[1.66rem] cursor-pointer"
                alt={item.name}
                src={item.logo}
              />
            ))}
          </div>
        </div>
        {/* Search bar */}
        <div className="relative mt-[1.56rem] h-12">
          <label className="hidden" htmlFor="search"></label>
          <input
          onClick={() => dispatch(toggleSearch())}
            id="search"
            className=" h-full pl-3 pr-[3.38rem] outline-0 w-full rounded-[0.31rem] bg-white"
            type="text"
            placeholder="Search AGC Newsnet"
          />
          <div className="absolute cursor-pointer group h-full top-0  bottom-0 right-[1.7rem]  center_child">
            <Search stroke="black" className="z-10" width={14} height={14} />
            <span className=" rounded-xl h-10 group-hover:opacity-70 centered z-2 transition duration-500 opacity-0 group-active:opacity-100 w-10 bg-[#7a7a7a]"></span>
          </div>
        </div>

        {/* Links */}
        <div className="mt-9 max-md:px-[1.125rem] lg:flex justify-between grid grid-cols-[repeat(auto-fit,minmax(5rem,1fr))] gap-y-[3rem] gap-8 ">
          {footerItems.map((group, i) => (
            // Link items looped
            <Links key={i}>
              {group.map((item, i) => (
                <LinkItem key={i} href={item.href}>
                  {item.name}
                </LinkItem>
              ))}
            </Links>
          ))}
        </div>
        {/* copyright */}
        <p className="md:mt-13 text-center mt-[5.375rem] text-white">
          © 2025 AGC Newsnet. All Rights Reserved.
        </p>
      </div>
    </section>
  );
}

function Links({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col  gap-[1.75rem] sm:gap-[1.56rem] min-w-16 ">
      {children}
    </div>
  );
}

function LinkItem({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const url = usePathname();

  return (
    <Link
      href={href}
      className="text-white text-semibold whitespace-nowrap cursor-pointer group"
    >
      <div className="relative after:content-[''] after:w-0 after:h-[3px] after:bg-red-500 after:block after:transition-all after:duration-300 group-hover:after:w-5">
        {children}
        {url === href && (
          <span className="w-5 bottom-0 absolute rounded-full h-[3px] left-0 bg-red-500"></span>
        )}
      </div>
    </Link>
  );
}
