"use client";
import React from "react";

const TableHeader: React.FC = () => {
  return (
    <div className="flex flex-row items-center py-2 px-4 border-b border-gray-200 mb-1">
      {/* Full Name */}
      <div className="w-48 min-w-0">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Full Name
        </p>
      </div>

      {/* Email */}
      <div className="w-52 min-w-0">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Email
        </p>
      </div>

      {/* Phone */}
      <div className="w-36 min-w-0">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Phone
        </p>
      </div>

      {/* Address */}
      <div className="w-56 min-w-0">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Address
        </p>
      </div>

      {/* Date Joined */}
      <div className="w-28 text-center">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Date Joined
        </p>
      </div>

      {/* Rating */}
      <div className="w-20 text-center">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Rating
        </p>
      </div>

      {/* Availability */}
      <div className="w-28 text-center">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Availability
        </p>
      </div>

      {/* Freelancer */}
      <div className="w-24 text-center">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Freelancer
        </p>
      </div>

      {/* Emergency Contact */}
      <div className="w-36 text-center">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Emergency Contact
        </p>
      </div>

      {/* Actions */}
      <div className="w-24 text-center">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Actions
        </p>
      </div>
    </div>
  );
};

export default TableHeader;
