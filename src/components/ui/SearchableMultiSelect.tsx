"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";

interface SearchableMultiSelectProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  required?: boolean;
}

const SearchableMultiSelect: React.FC<SearchableMultiSelectProps> = ({
  label,
  options,
  selectedValues,
  onChange,
  placeholder = "Select options...",
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter options based on search
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const handleRemove = (value: string) => {
    onChange(selectedValues.filter((v) => v !== value));
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative" ref={dropdownRef}>
        {/* Selected Values Display */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="min-h-[42px] w-full px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer hover:border-gray-400 transition-colors focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent"
        >
          <div className="flex flex-wrap gap-1.5 items-center">
            {selectedValues.length === 0 ? (
              <span className="text-sm text-gray-400">{placeholder}</span>
            ) : (
              selectedValues.map((value) => (
                <span
                  key={value}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium border border-blue-200"
                >
                  {value}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(value);
                    }}
                    className="hover:bg-blue-100 rounded-full p-0.5"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))
            )}
            <ChevronDown
              size={16}
              className={`ml-auto text-gray-400 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-hidden">
            {/* Search Input */}
            <div className="p-2 border-b border-gray-200 bg-gray-50">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search roles..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            {/* Options List */}
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-4 text-center text-sm text-gray-400">
                  No roles found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => handleToggle(option)}
                    className={`px-3 py-2.5 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedValues.includes(option)
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedValues.includes(option)}
                        onChange={() => {
                          // Handle checkbox change
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span>{option}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchableMultiSelect;
