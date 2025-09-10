"use client";

import React, { useEffect, useRef, useState } from "react";

type Size = "sm" | "md" | "lg";

type TwoWayToggleProps = {
  options?: [string, string];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  size?: Size;
  className?: string;
};

export default function TwoWayToggle({
  options = ["Option 1", "Option 2"],
  value,
  onChange,
  disabled = false,
  size = "md",
  className = "",
}: TwoWayToggleProps) {
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!value || !btnRefs.current) return;
    const activeIndex = options.indexOf(value);
    const activeBtn = btnRefs.current[activeIndex];
    if (activeBtn) {
      const { offsetLeft, offsetWidth } = activeBtn;
      setHighlightStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [value, options]);

  const sizeClasses =
    size === "sm"
      ? "h-8 text-sm px-3"
      : size === "lg"
      ? "h-12 text-lg px-6"
      : "h-10 text-base px-4";

  return (
    <div
      ref={containerRef}
      className={`relative justify-center w-fit flex gap-8 items-center rounded-full border border-gray-600 bg-[#121212] p-1 ${className}`}
    >
      {/* highlight */}
      <div
        style={{
          left: `${highlightStyle.left}px`,
          width: `${highlightStyle.width}px`,
        }}
        className="absolute top-1/2 h-[80%] -translate-y-1/2 rounded-full bg-gradient-to-r from-yellow-300 to-orange-600 transition-all duration-300"
      />

      {options.map((opt, i) => (
        <button
          key={opt}
          ref={(el) => {
            btnRefs.current[i] = el;
          }}
          disabled={disabled}
          onClick={() => onChange?.(opt)}
          className={`relative z-10 cursor-pointer whitespace-nowrap rounded-full ${sizeClasses} ${
            value === opt ? "text-white" : "text-white/50 hover:bg-[#1c1c1c]"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
