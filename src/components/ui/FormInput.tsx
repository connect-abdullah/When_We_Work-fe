import React from "react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  className,
  required,
  icon,
  ...props
}) => {
  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center gap-2">
        {icon && <span className="text-gray-400 shrink-0">{icon}</span>}
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
        {required && <span className="text-red-500 text-sm">*</span>}
      </div>
      <input
        className={cn(
          "w-full px-4 py-3 text-sm border text-gray-900 placeholder:text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A6ACF]/20 focus:border-[#5A6ACF] transition-all bg-white",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
