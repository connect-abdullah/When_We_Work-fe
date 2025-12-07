"use client";

import React, { useEffect, useState } from "react";
import TotalOverviewChart from "./charts/TotalOverviewChart";
import {
  DailyData,
  DiagnosisData,
  PlatformConversionData,
} from "./charts/types";
import ServiceDistributionChart from "./charts/ServiceDistributionChart";
import RequirementChart from "./charts/requirementChart";

interface GraphsProps {
  className?: string;
  dailyData?: DailyData[];
  diagnosisData?: DiagnosisData[];
  platformData?: PlatformConversionData[];
  onDownload?: () => void;
  dateRange?: "today" | "7days" | "30days" | "custom";
}

const Graphs: React.FC<GraphsProps> = ({
  className = "",
  dailyData: externalDailyData,
  diagnosisData: externalDiagnosisData,
  platformData: externalPlatformData,
  onDownload,
  dateRange = "7days",
}) => {
  const [timeframe, setTimeframe] = useState("Last 7 Days");

  // Effect to handle date range changes for graphs
  useEffect(() => {
    // TODO: Fetch graph data based on dateRange when API is integrated
    // console.log("Graphs: Date range updated to", dateRange);
  }, [dateRange]);

  // Default sample daily data (can be overridden via props)
  const defaultDailyData: DailyData[] = [
    { day: "Mon", booked: 12, revenue: 4500 },
    { day: "Tue", booked: 18, revenue: 6200 },
    { day: "Wed", booked: 15, revenue: 5500 },
    { day: "Thu", booked: 20, revenue: 7200 },
    { day: "Fri", booked: 22, revenue: 8100 },
    { day: "Sat", booked: 25, revenue: 9200 },
    { day: "Sun", booked: 16, revenue: 5800 },
  ];

  const defaultDiagnosisData: DiagnosisData[] = [
    { name: "Service 1", value: 120, color: "#8B5CF6" },
    { name: "Service 2", value: 85, color: "#60A5FA" },
    { name: "Service 3", value: 65, color: "#6D28D9" },
    { name: "Service 4", value: 100, color: "#C4B5FD" },
  ];

  const defaultPlatformData: PlatformConversionData[] = [
    { platform: "Instagram", inquiries: 134, conversions: 67 },
    { platform: "Facebook", inquiries: 98, conversions: 45 },
    { platform: "WhatsApp", inquiries: 87, conversions: 52 },
    { platform: "SMS", inquiries: 76, conversions: 58 },
  ];

  const dailyData = externalDailyData || defaultDailyData;
  const diagnosisData = externalDiagnosisData || defaultDiagnosisData;
  const platformData = externalPlatformData || defaultPlatformData;

  // Calculate daily average revenue
  const totalRevenue = dailyData.reduce((sum, day) => sum + day.revenue, 0);
  const dailyAverage = Math.round(totalRevenue / dailyData.length);
  const percentageChange = 22.1;

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else {
      // console.log("Download functionality - override with onDownload prop");
    }
  };

  return (
    <div className={`flex flex-col gap-2 m-1 sm:m-2 ${className}`}>
      {/* Top Row - Total Overview and Service Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <TotalOverviewChart
          data={dailyData}
          dailyAverage={dailyAverage}
          percentageChange={percentageChange}
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
          onDownload={handleDownload}
        />

        <div className="flex flex-row gap-2">
          <ServiceDistributionChart data={diagnosisData} />
          <RequirementChart data={platformData} />
        </div>
      </div>

      {/* Bottom Row - Platform Queries and Appointments */}
    </div>
  );
};

export default Graphs;
