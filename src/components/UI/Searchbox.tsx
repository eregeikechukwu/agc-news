import { useSearchFromCache } from "@/src/hooks/useSearchedFromCache";
import { clearSearch } from "@/src/lib/slices/appSlice";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

export default function SearchBox({ isSearchOpen }: { isSearchOpen: boolean }) {
  const { results, handleSearch, searchQuery } = useSearchFromCache();
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && isSearchOpen) {
      inputRef.current.focus();
    }
    if (isSearchOpen) dispatch(clearSearch());
  }, [isSearchOpen, dispatch]);

  return (
    <div
      className={`absolute z-20 ${
        isSearchOpen
          ? "lg:-bottom-15 -bottom-8 opacity-100  lg:w-160 w-[90vw]  searchEnter"
          : "bottom-15 opacity-0 w-4 searchOut"
      } lg:right-16 right-[5vw] -bottom-15 w-11`}
    >
      {/* Search input container */}
      <div className="h-10  w-full relative rounded-full bg-[#1B1B1B]">
        <input
          ref={inputRef}
          type="text"
          className="w-full searchShadow pl-6 pr-14 outline-none text-[0.81rem] h-full rounded-full"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search News by title or content"
        />

        <div
          onClick={() => handleSearch("")}
          className="group absolute cursor-pointer top-0 bottom-0 right-3 flex items-center z-20"
        >
          {searchQuery ? (
            <X onClick={() => handleSearch("")} className="w-[0.88rem]" />
          ) : (
            <Search className="w-[0.88rem]" />
          )}
          <span className="absolute rounded-full -right-1/2 h-8 w-8 group-hover:opacity-70 opacity-0 group-active:opacity-100 bg-[#7a7a7a] transition duration-500"></span>
        </div>
      </div>

      {/* Dropdown results appear BELOW the input */}
      <div
        className={`absolute left-0 right-0 top-full mt-2 rounded-[1rem] scrollbar-hide bg-black transition-all duration-300 px-2 overflow-scroll ${
          searchQuery.length > 1 && isSearchOpen
            ? "max-h-96 py-4"
            : "max-h-0 py-0"
        }`}
      >
        {searchQuery.length > 1 && results.length ? (
          results.map((item, i) => {
            return (
              <Link key={i} href={`/stories/${item.id}`}>
                <div
                  className="text-white items-center flex justify-between gap-2 cursor-pointer text-[0.75rem] rounded-[0.3rem] transition-all active:bg-gray-800 hover:bg-white/10 px-2 py-1"
                  key={i}
                >
                  {item.title}
                  <div className=" aspect-[9/6] object-cover h-12">
                    <Image
                      src={
                        String(item.banner_image || "").trim() ||
                        "/images/placeholder-image.jpg"
                      }
                      alt={item?.title || ""}
                      width={400}
                      height={250}
                      className="object-cover  w-full h-full"
                    />
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="text-[0.75rem] px-4">No results</div>
        )}
      </div>
    </div>
  );
}
