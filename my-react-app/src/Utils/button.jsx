import React from "react";

export const Button = ({ children, onClick, variant = "solid", className = "" }) => {
  const baseClass =
    "px-4 py-2 rounded font-semibold transition duration-200";
  const variantClass =
    variant === "outline"
      ? "border border-purple-600 text-purple-600 hover:bg-purple-100"
      : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <button onClick={onClick} className={`${baseClass} ${variantClass} ${className}`}>
      {children}
    </button>
  );
};

export const Button1 = ({ children, onClick, variant = "solid", className = "" }) => {
  const baseClass =
    "px-4 py-2 rounded font-semibold transition duration-200";
  const variantClass =
    variant === "outline"
      ? "border border-blue-200 text-blue-900 hover:bg-blue-100"
      : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <button onClick={onClick} className={`${baseClass} ${variantClass} ${className}`}>
      {children}
    </button>
  );
};
