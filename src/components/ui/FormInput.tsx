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
    <div className="space-y-1 m-1">
      <div className="flex items-center gap-2">
        {icon && <span className="text-gray-400">{icon}</span>}
        <label className="text-[10px] font-medium text-[#1F384C]">
          {label}
        </label>
        {required && <span className="text-red-500">*</span>}
      </div>
      <input
        className={cn(
          "w-full px-2 py-2 text-[10px] border text-[#1F384C] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A6ACF] focus:border-transparent",
          error && "border-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-[10px] text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
