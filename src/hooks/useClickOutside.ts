import { useEffect } from "react";
import { useAppDispatch } from "./reduxHooks";
import { closeBackdrop } from "../lib/slices/appSlice";
import { useParams } from "next/navigation";

export default function useClickOutside(
  isActive: boolean,
  callback: () => void
) {
  const url = useParams();
  const ref = document.getElementById("backdrop");
  const dispatch = useAppDispatch();
  // const { isBackdropVisible } = useAppSelector((state) => state.app);

  useEffect(() => {
    const handleClick = () => {
      if (isActive) {
        callback();
      }
      dispatch(closeBackdrop());
    };

    ref!.addEventListener("click", handleClick);

    return () => ref!.removeEventListener("click", handleClick);
  }, [isActive, callback, dispatch, ref]);

  useEffect(() => {
    dispatch(closeBackdrop());
  }, [url, dispatch]);

  return ref;
}
