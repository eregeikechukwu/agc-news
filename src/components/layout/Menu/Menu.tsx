"use client";

import useClickOutside from "@/src/hooks/useClickOutside";
import { cn } from "@/src/lib/utils";
import { memo, useState } from "react";
import styles from "./styles.module.scss";
import { navCategories1, headerItems } from "@/src/utils/appHeaderItems";
import TwoWayToggle from "../../UI/tabsToggle";
import Logo from "../../UI/logo";

function Menu({
  isMenuOpen,
  toggleMenu,
}: {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}) {
  const [tab, setTab] = useState<"Pages" | "Categories">("Pages");
  const changeTab = () => {
    if (tab === "Pages") {
      setTab("Categories");
    } else {
      setTab("Pages");
    }
  };

  useClickOutside(isMenuOpen, toggleMenu);

  function LinkItem({ children, href }: { children: string; href: string }) {
    return (
      <li onClick={toggleMenu} className={styles.link}>
        <a href={href}>{children}</a>
      </li>
    );
  }

  //Tabbed menu setup
  const activelist = tab === "Pages" ? headerItems : navCategories1;

  return (
    <div
      className={cn(
        `min-h-screen nav  flex gap-10 flex-col items-center no-scrollbar text-black fixed right-0 translate-x-[-105%] top-0 left-0 md:!pt-20 md:p-8 overflow-y-scroll z-300 bottom-0 min-w-full ${styles.menu}`,
        isMenuOpen && "!translate-x-0"
      )}
    >
      <div>
        <div className="absolute top-3 right-3">
          <Logo />
        </div>
      </div>
      <div className="mt-20">
        <TwoWayToggle
          options={["Pages", "Categories"]}
          value={tab}
          onChange={changeTab}
          size="md"
        />

        {/* <Weather /> */}

        {/*menu list */}
        <div>
          <ul className={styles.menu__list}>
            {activelist.map((item) => (
              <LinkItem key={item.name} href={item.path}>
                {item.name}
              </LinkItem>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default memo(Menu);
