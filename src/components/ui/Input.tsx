import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#1F384C] mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={cn(
            "w-full px-3 py-2 border border-gray-300 rounded-lg font-poppins text-sm",
            "focus:outline-none focus:ring-2 focus:ring-[#5A6ACF] focus:border-transparent",
            "placeholder:text-gray-400",
            error && "border-red-500 focus:ring-red-500",
            icon && "pl-10",
            className,
          )}
          {...props}
        />
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
