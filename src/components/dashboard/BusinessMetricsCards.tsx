"use client";

import React, { useEffect } from "react";
import { Calendar, DollarSign, TrendingUp, Users } from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCard";


interface BusinessMetricsCardsProps {
  className?: string;
  dateRange?: "today" | "7days" | "30days" | "custom";
}

const BusinessMetricsCards: React.FC<BusinessMetricsCardsProps> = ({
  className = "",
  dateRange = "7days",
}) => {
  // Effect to handle date range changes for metrics
  useEffect(() => {
    // TODO: Fetch metrics data based on dateRange when API is integrated
    // console.log("BusinessMetrics: Date range updated to", dateRange);
  }, [dateRange]);

  const metrics = [
    {
      title: "Total Revenue",
      value: "$24,850",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: <DollarSign size={24} />,
      iconColor: "text-green-600",
      iconBgColor: "bg-green-100",
    },
    {
      title: "Active Jobs",
      value: "142",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: <Calendar size={24} />,
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-100",
    },
    {
      title: "Total Workers",
      value: "1,248",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: <Users size={24} />,
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-100",
    },
    {
      title: "Booked Workers",
      value: "1,123",
      change: "+5.2%",
      changeType: "positive" as const,
      icon: <TrendingUp size={24} />,
      iconColor: "text-orange-600",
      iconBgColor: "bg-orange-100",
    },
  ];

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 ${className}`}
    >
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          changeType={metric.changeType}
          icon={metric.icon}
          iconColor={metric.iconColor}
          iconBgColor={metric.iconBgColor}
        />
      ))}
    </div>
  );
};

export default BusinessMetricsCards;
