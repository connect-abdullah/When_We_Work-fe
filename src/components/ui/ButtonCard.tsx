"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type ButtonCardProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
};

const ButtonCard: React.FC<React.PropsWithChildren<ButtonCardProps>> = ({
  selected = false,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "w-full p-2 rounded-lg border transition-all duration-200 text-left hover:shadow",
        selected
          ? "border-[#5A6ACF] bg-[#5A6ACF]/5 shadow-md"
          : "border-gray-200 hover:border-gray-300 bg-white",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonCard;
