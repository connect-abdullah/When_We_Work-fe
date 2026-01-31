"use client";

import React, { useEffect, useState } from "react";
import BusinessMetricsCards from "./BusinessMetricsCards";
import { DateRange } from "@/types/dashboard";

const Dashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>("7days");

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateRange(e.target.value as DateRange);
  };

  // Effect to handle date range changes (will trigger API calls when integrated)
  useEffect(() => {
    // console.log("Date range changed to:", dateRange);
    // TODO: Fetch data based on dateRange when API is integrated
  }, [dateRange]);
  return (
    <div className="flex flex-col w-full h-full px-2 sm:px-4">
      <div className="flex justify-between items-center gap-2 mb-2">
        <h1 className="text-lg sm:text-lg font-bold text-gray-700 p-2 sm:p-4">
          Overview
        </h1>
        <div className="flex items-center gap-2 p-2">
          {/* <Calendar className="w-4 h-4 text-gray-700" /> */}
          <select
            value={dateRange}
            onChange={handleDateRangeChange}
            className="text-xs px-3 py-1 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium cursor-pointer hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="today">Today</option>
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
          </select>
        </div>
      </div>

      {/* Business Metrics Cards */}
      <BusinessMetricsCards dateRange={dateRange} />
    </div>
  );
};

export default Dashboard;
