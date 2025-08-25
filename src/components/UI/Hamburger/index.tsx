import { useAppDispatch, useAppSelector } from "@/src/hooks/reduxHooks";
import styles from "./hamburger.module.scss";
import { toggleBackdrop } from "@/src/lib/slices/appSlice";

export default function Hamburger({
  toggleMenu,
  isMenuOpen,
}: {
  toggleMenu: () => void;
  isMenuOpen: Boolean;
}) {
  return (
    <label className={styles.hamburger}>
      <input
        type="checkbox"
        checked={isMenuOpen as boolean}
        onClick={toggleMenu}
        onChange={() => {}}
      />
      <div
        className={`${styles.hamburgers} flex flex-col justify-between w-full h-full`}
      >
        <span className=" w-6/10"></span>
        <span className=" w-full"></span>
        <span className=" w-8/10"></span>
      </div>
    </label>
  );
}
