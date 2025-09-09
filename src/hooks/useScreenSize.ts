import { se } from "date-fns/locale";
import { useEffect, useState } from "react";

export default function useScreenSize() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isTablet, setIsTablet] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 576);
      setIsTablet(window.innerWidth < 1024 && window.innerWidth >= 576);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop: isMobile === false && isTablet === false,
  };
}
