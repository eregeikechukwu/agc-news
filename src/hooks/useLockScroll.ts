"use client";

import { useState } from "react";

export default function useLockScroll(): () => void {
  const [isLocked, setIsLocked] = useState(false);

  const lockScroll = () => {
    if (!isLocked) {
      document.body.style.overflowY = "hidden";
      setIsLocked(true);
      console.log(isLocked);
    } else {
      document.body.style.overflowY = "scroll";
      setIsLocked(false);
      console.log(isLocked);
    }
  };

  return lockScroll;
}
