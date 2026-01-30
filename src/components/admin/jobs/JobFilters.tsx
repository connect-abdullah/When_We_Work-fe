"use client";
import React from "react";
import { Card, FilterSelect, SearchInput } from "@/components/ui";

interface JobFiltersProps {
  searchTerm: string;
  statusFilter: string;
  typeFilter: string;
  onSearchChange: (term: string) => void;
  onStatusFilterChange: (status: string) => void;
  onTypeFilterChange: (type: string) => void;
}

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const typeOptions = [
  { value: "all", label: "All Types" },
  { value: "hourly", label: "Hourly" },
  { value: "fixed", label: "Fixed" },
];

const JobFilters: React.FC<JobFiltersProps> = ({
  searchTerm,
  statusFilter,
  typeFilter,
  onSearchChange,
  onStatusFilterChange,
  onTypeFilterChange,
}) => {
  return (
    <Card className="bg-white border border-gray-100" padding="sm">
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Search */}
        <SearchInput
          placeholder="Search by job name or education..."
          value={searchTerm}
          onChange={onSearchChange}
        />

        {/* Status Filter */}
        <FilterSelect
          value={statusFilter}
          onChange={onStatusFilterChange}
          options={statusOptions}
          width="sm:w-28"
        />

        {/* Tone Filter */}
        <FilterSelect
          value={typeFilter}
          onChange={onTypeFilterChange}
          options={typeOptions}
          width="sm:w-32"
        />
      </div>
    </Card>
  );
};

export default JobFilters;
