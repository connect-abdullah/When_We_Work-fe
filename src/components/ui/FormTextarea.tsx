import React from "react";
import { cn } from "@/lib/utils";

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-medium text-[#1F384C]">{label}</label>
      <textarea
        className={cn(
          "w-full px-3 py-2 text-[10px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A6ACF] focus:border-transparent resize-none",
          error && "border-red-500",
          className
        )}
        rows={3}
        {...props}
      />
      {error && <p className="text-[10px] text-red-500">{error}</p>}
    </div>
  );
};

export default FormTextarea;
