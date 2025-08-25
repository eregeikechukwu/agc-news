"use client";

import useClickOutside from "@/src/hooks/useClickOutside";
import { cn } from "@/src/lib/utils";
import { memo, useState } from "react";
import styles from "./styles.module.scss";
import { navCategories1 } from "@/src/utils/appHeaderItems";
import ToggleMenuButton, { TwoWayToggle } from "../../UI/tabsToggle";

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
      <li className={styles.link}>
        <a href={href}>{children}</a>
      </li>
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen no-scrollbar text-black fixed top-0 -left-full md:!pt-20 md:p-8 overflow-y-scroll z-300 bottom-0 min-w-full  bg-white",
        isMenuOpen ? "nav-enter" : "nav-exit"
      )}
    >
      <div>
        <ul className={`${styles.sectionList} ${styles.list}`}>
          {navCategories1.map((item) => (
            <LinkItem href={item.path}>{item.name}</LinkItem>
          ))}
        </ul>
        <ul>
          <LinkItem href="/bookmarks">Bookmarks</LinkItem>
        </ul>
      </div>
      <TwoWayToggle
        options={["Pages", "Categories"]}
        value={tab}
        onChange={changeTab}
        size="md"
      />
    </div>
  );
}
export default memo(Menu);
