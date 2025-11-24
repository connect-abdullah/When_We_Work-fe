import React from "react";
import { cn } from "@/lib/utils";

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  required?: boolean;
  icon?: React.ReactNode;
  options: { value: string | number; label: string }[];
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  error,
  className,
  required,
  icon,
  options,
  ...props
}) => {
  return (
    <div className="space-y-1 m-1">
      <div className="flex items-center gap-2">
        {icon && <span className="text-gray-400">{icon}</span>}
        {label && (
          <label className="text-[10px] font-medium text-[#1F384C]">
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}
      </div>
      <select
        className={cn(
          "w-full px-2 py-2 text-[10px] border text-[#1F384C] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A6ACF] focus:border-transparent bg-white",
          error && "border-red-500",
          className,
        )}
        {...props}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-[10px] text-red-500">{error}</p>}
    </div>
  );
};

export default FormSelect;
