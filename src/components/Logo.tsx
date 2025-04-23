import React from "react";
import { useNavigate } from "react-router-dom";
import { startTransition } from "react";

interface Props {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Logo({ className = "", size = "md" }: Props) {
  const navigate = useNavigate();
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
    xl: "h-16"
  };

  const handleClick = () => {
    startTransition(() => {
      navigate("/");
    });
  };

  return (
      <button
          onClick={handleClick}
          className={`flex items-center ${className} hover:opacity-90 transition-opacity`}
      >
        <div className={`${sizeClasses[size]} aspect-square rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold relative overflow-hidden`}>
          <span className="absolute rotate-45 w-16 h-1 bg-primary-foreground/20 left-0 top-1/2 -translate-y-1/2"></span>
          <span className="z-10">AQ</span>
        </div>
        <span className={`ml-2 font-bold ${size === "sm" ? "text-xl" : size === "md" ? "text-2xl" : size === "lg" ? "text-3xl" : "text-4xl"}`}>AppliQ</span>
      </button>
  );
}