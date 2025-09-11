"use client";

import { useState } from "react";

export default function useLockScroll(): () => void {
  const [isLocked, setIsLocked] = useState(false);

  const lockScroll = () => {
    if (!isLocked) {
      document.body.style.overflowY = "hidden";
      setIsLocked(true);
    } else {
      document.body.style.overflowY = "scroll";
      setIsLocked(false);
    }
  };

  return lockScroll;
}
