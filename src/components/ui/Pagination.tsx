"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
  itemLabel?: string; // e.g., "customers", "items", etc.
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onPageChange,
  itemLabel = "items",
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 mt-3 border-t border-gray-200">
      <div className="text-[9px] text-[#1F384C] opacity-60">
        Showing{" "}
        <span className="font-semibold text-[#1F384C] opacity-100">
          {startIndex + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-[#1F384C] opacity-100">
          {Math.min(endIndex, totalItems)}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-[#1F384C] opacity-100">
          {totalItems}
        </span>{" "}
        {itemLabel}
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 text-gray-400 hover:text-[#5A6ACF] hover:bg-[#5A6ACF]/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-md"
        >
          <ChevronLeft size={14} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`min-w-[28px] h-7 px-2 text-[10px] font-medium rounded-md transition-all ${
              currentPage === page
                ? "bg-[#5A6ACF] text-white shadow-sm"
                : "text-[#1F384C] hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1.5 text-gray-400 hover:text-[#5A6ACF] hover:bg-[#5A6ACF]/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-md"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
