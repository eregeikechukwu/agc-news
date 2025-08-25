import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { closeBackdrop } from "../lib/slices/appSlice";
import { useParams } from "next/navigation";

export default function useClickOutside(
  isActive: boolean,
  callback: () => void
) {
  const url = useParams();
  // const ref = useRef<HTMLDivElement>(null);
  const ref = document.getElementById("backdrop");
  const dispatch = useAppDispatch();
  const { isBackdropVisible } = useAppSelector((state) => state.app);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (isActive) {
        callback();
      }
      dispatch(closeBackdrop());
    };

    ref!.addEventListener("click", handleClick);

    return () => ref!.removeEventListener("click", handleClick);
  }, [isActive]);

  useEffect(() => {
    dispatch(closeBackdrop());
  }, [url]);

  return ref;
}
