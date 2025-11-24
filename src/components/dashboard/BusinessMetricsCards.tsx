"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import { DollarSign, Calendar, Users, TrendingUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  iconColor: string;
  iconBgColor: string;
}

interface SocialChannelCardProps {
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  iconBgColor: string;
  isActive: boolean;
  onToggle: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  iconColor,
  iconBgColor,
}) => (
  <Card className="flex flex-col w-full p-2">
    <div className="flex items-start justify-between mb-1.5">
      <div className="flex-1">
        <p className="text-[9px] text-gray-600 mb-1">{title}</p>
        <h3 className="text-[14px] font-bold text-gray-900">{value}</h3>
      </div>
      <div className={`${iconBgColor} p-1.5 rounded-lg`}>
        <div className={iconColor}>{icon}</div>
      </div>
    </div>
    {change && (
      <div className="flex items-center gap-0.5">
        <span
          className={`text-[8px] font-medium ${
            changeType === "positive"
              ? "text-green-600"
              : changeType === "negative"
                ? "text-red-600"
                : "text-gray-600"
          }`}
        >
          {changeType === "positive" && "↑ "}
          {changeType === "negative" && "↓ "}
          {change}
        </span>
        <span className="text-[8px] text-gray-500">vs last month</span>
      </div>
    )}
  </Card>
);

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
    console.log("BusinessMetrics: Date range updated to", dateRange);
  }, [dateRange]);

  const metrics = [
    {
      title: "Total Revenue",
      value: "$24,850",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: <DollarSign size={14} />,
      iconColor: "text-green-600",
      iconBgColor: "bg-green-100",
    },
    {
      title: "Active Jobs",
      value: "142",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: <Calendar size={14} />,
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-100",
    },
    {
      title: "Total Workers",
      value: "1,248",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: <Users size={14} />,
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-100",
    },
    {
      title: "Booked Workers",
      value: "1,123",
      change: "+5.2%",
      changeType: "positive" as const,
      icon: <TrendingUp size={14} />,
      iconColor: "text-orange-600",
      iconBgColor: "bg-orange-100",
    },
  ];

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-4 m-1 sm:m-2 ${className}`}
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
