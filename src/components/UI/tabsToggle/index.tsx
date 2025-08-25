import React, { useEffect, useId, useMemo, useState } from "react";

type Size = "sm" | "md" | "lg";

type TwoWayToggleProps = {
  options?: [string, string];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  size?: Size;
  className?: string;
};

const sizeMap: Record<
  Size,
  { py: string; text: string; pad: string; radius: string }
> = {
  sm: { py: "py-1", text: "text-sm", pad: "p-1", radius: "rounded-xl" },
  md: { py: "py-2", text: "text-base", pad: "p-1.5", radius: "rounded-2xl" },
  lg: { py: "py-3", text: "text-lg", pad: "p-2", radius: "rounded-2xl" },
};

export function TwoWayToggle({
  options = ["Left", "Right"],
  value,
  onChange,
  disabled = false,
  size = "md",
  className = "",
}: TwoWayToggleProps) {
  const [internalValue, setInternalValue] = useState<string>(
    value ?? options[0]
  );
  const current = value ?? internalValue;
  const idx = Math.max(0, options.indexOf(current));
  const uid = useId();

  useEffect(() => {
    if (value !== undefined) return; // controlled mode
    if (!options.includes(internalValue)) setInternalValue(options[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.join("|")]);

  useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  const sizes = sizeMap[size];

  const select = (next: string) => {
    if (disabled) return;
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  const labelIds = useMemo(
    () => options.map((_, i) => `${uid}-${i}`) as [string, string],
    [options, uid]
  );

  return (
    <div
      className={[
        "relative inline-flex w-full max-w-md select-none",
        sizes.py,
        sizes.pad,
        sizes.radius,
        "bg-gray-50 shadow-lg ring-1 ring-black/5",
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
        className,
      ].join(" ")}
      role="tablist"
      aria-label="Two way toggle"
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          select(options[1]);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          select(options[0]);
        }
      }}
    >
      {/* Sliding indicator (CSS transition) */}
      <div
        aria-hidden
        className={[
          "absolute top-1 bottom-1 w-1/2 transition-transform duration-300",
          sizes.radius,
          "bg-white shadow-xl ring-1 ring-black/5",
        ].join(" ")}
        style={{ transform: `translateX(${idx * 100}%)` }}
      />

      {/* Options */}
      <div className="relative grid w-full grid-cols-2">
        {options.map((opt, i) => {
          const active = i === idx;
          return (
            <button
              key={opt}
              id={labelIds[i]}
              role="tab"
              aria-selected={active}
              aria-controls={`${uid}-panel-${i}`}
              type="button"
              className={[
                "z-10 flex items-center justify-center gap-2 px-3",
                sizes.py,
                sizes.radius,
                sizes.text,
                "transition-colors",
                active ? "text-gray-900" : "text-gray-500",
                disabled ? "pointer-events-none" : "hover:text-gray-900",
              ].join(" ")}
              onClick={() => select(opt)}
            >
              <span className="font-medium">{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// --- Demo usage ---
export default function Demo() {
  const [choice, setChoice] = useState("Monthly");
  return (
    <div className="min-h-[40vh] w-full grid place-items-center bg-white p-6">
      <div className="w-[360px]">
        <TwoWayToggle
          options={["Monthly", "Yearly"]}
          value={choice}
          onChange={setChoice}
          size="md"
        />
        <p className="mt-4 text-center text-sm text-gray-600">
          Selected:{" "}
          <span className="font-semibold text-gray-900">{choice}</span>
        </p>
      </div>
    </div>
  );
}
