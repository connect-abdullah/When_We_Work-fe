import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  shadow?: boolean;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = "md",
  shadow = true,
}) => {
  const paddingClasses = {
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <div
      className={cn(
        "rounded-lg bg-white",
        paddingClasses[padding],
        shadow && "shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
