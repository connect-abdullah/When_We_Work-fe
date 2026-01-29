"use client";
import React from "react";
import Card from "@/components/ui/Card";
import SearchInput from "@/components/ui/SearchInput";
import FilterSelect, { FilterOption } from "@/components/ui/FilterSelect";
import SortSelect from "@/components/ui/SortSelect";
import { Button } from "@/components/ui/Button";
import { LucideIcon } from "lucide-react";

interface ActionButton {
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}
interface Filter {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  placeholder?: string;
  width?: string;
}
interface Sort {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  width?: string;
}

interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: Filter[];
  sort?: Sort;
  actions?: ActionButton[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
  sort,
  actions = [],
}) => {
  return (
    <div className="px-2 sm:px-4 mb-2">
      <Card className="bg-white border border-gray-100" padding="sm">
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Search */}
          <SearchInput
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchChange}
          />

          {/* Filters */}
          {filters.map((filter, index) => (
            <FilterSelect
              key={index}
              value={filter.value}
              onChange={filter.onChange}
              options={filter.options}
              placeholder={filter.placeholder}
              width={filter.width}
            />
          ))}

          {/* Sort */}
          {sort && (
            <SortSelect
              value={sort.value}
              onChange={sort.onChange}
              options={sort.options}
              width={sort.width}
            />
          )}

          {/* Action Buttons */}
          {actions.length > 0 && (
            <div className="flex gap-2">
              {actions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Button
                    key={index}
                    variant={action.variant || "secondary"}
                    size="sm"
                    onClick={action.onClick}
                  >
                    {IconComponent && (
                      <IconComponent size={10} className="mr-1" />
                    )}
                    <span className="text-[9px]">{action.label}</span>
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default FilterBar;
