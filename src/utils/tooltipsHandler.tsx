import { shareLinkButton } from "./shareLink";
import { ToolTip } from "../components/UI/Tooltip";
import { useClientOnly } from "../hooks/useClientOnly";
import { useState } from "react";

export function useTooltipsHandler(action: "copy" | "bookmark") {
  const url = useClientOnly(() => window.location.href);
  const [zIndex, setIndex] = useState(1000);
  const [isSharing, setIsSharing] = useState(false);
  const toastId = Date.now();

  const handleClick = async (tooltip: string) => {
    const tooltipHTML = ToolTip(tooltip, `toast-${toastId}`); // Use a unique ID

    const displayTooltip = () => {
      document.body?.insertAdjacentHTML("afterbegin", tooltipHTML);

      const toastEl = document.getElementById(`toast-${toastId}`);
      if (!toastEl) return;
      setIndex(zIndex + 1);

      toastEl.style.zIndex = zIndex.toString();
      // Remove after 4.5s with fade-out
      setTimeout(() => {
        toastEl.classList.add("fade-out");
        setTimeout(() => {
          toastEl.remove();
        }, 300); // Match CSS transition
      }, 4500);
    };

    if (action === "copy") {
      if (navigator.share) {
        try {
          setIsSharing(true);
          await navigator.share({
            title: "Check this out!",
            text: "Trending news on AGC: ",
            url: window.location.href,
          });
        } catch (err) {
          console.error("Error sharing:", err);
        } finally {
          setIsSharing(false);
        }
      } else {
        // Fallback for browsers that don't support navigator.share
        shareLinkButton(url || "");
        displayTooltip();
      }
    } else {
      displayTooltip();
    }
  };

  return { handleClick, isSharing };
}
