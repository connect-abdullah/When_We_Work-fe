"use client";
import React from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  value,
  onChange,
}) => {
  return (
    <div className="flex-1">
      <div className="relative">
        <Search
          size={12}
          className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 text-[10px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A6ACF] focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default SearchInput;
