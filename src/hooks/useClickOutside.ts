import { useEffect } from "react";
import { useAppDispatch } from "./reduxHooks";
import { closeBackdrop, toggleSearch } from "../lib/slices/appSlice";
import { useParams } from "next/navigation";

export default function useClickOutside(
  isActive: boolean,
  callback: () => void
) {
  const url = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const ref = document.getElementById("backdrop");
    if (!ref) return;
    const handleClick = () => {
      dispatch(toggleSearch());
      if (isActive) {
        callback();
      }
      dispatch(closeBackdrop());
    };

    ref!.addEventListener("click", handleClick);

    return () => ref!.removeEventListener("click", handleClick);
  }, [isActive, callback, dispatch]);

  useEffect(() => {
    dispatch(closeBackdrop());
    window.scrollTo({top: 0})
  }, [url, dispatch]);

  return;
}
