import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline" | "ghost";
  className?: string;
};

const Button = ({
  children,
  onClick,
  variant = "default",
  className = "",
}: ButtonProps) => {
  const base =
    "px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  let variantClass = "";

  if (variant === "default") {
    variantClass =
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500";
  } else if (variant === "outline") {
    variantClass =
      "border border-gray-300 text-gray-800 hover:bg-gray-100 focus:ring-gray-300";
  } else if (variant === "ghost") {
    variantClass = "text-gray-600 hover:bg-gray-100 focus:ring-gray-300";
  }

  return (
    <button
      onClick={onClick}
      className={`${base} ${variantClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
