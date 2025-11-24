"use client";
import React from "react";
import { FilterOption } from "@/components/ui/FilterSelect";

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  width?: string;
}

const SortSelect: React.FC<SortSelectProps> = ({
  value,
  onChange,
  options,
  width = "sm:w-32",
}) => {
  return (
    <div className={width}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-2.5 py-1.5 text-[10px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A6ACF] focus:border-transparent"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortSelect;
