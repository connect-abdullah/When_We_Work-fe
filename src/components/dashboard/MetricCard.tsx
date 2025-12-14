import React from "react";
import Card from "@/components/ui/Card";

interface MetricCardProps {
    title: string;
    value: string;
    change?: string;
    changeType?: "positive" | "negative" | "neutral";
    icon: React.ReactNode;
    iconColor: string;
    iconBgColor: string;
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
  <Card className="flex flex-col w-full p-6 sm:p-8 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
    <div className="flex items-start justify-between mb-5">
      <div className="flex-1 pr-4">
        <p className="text-sm sm:text-base text-gray-600 mb-3 font-medium">{title}</p>
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">{value}</h3>
      </div>
      <div className={`${iconBgColor} p-3 sm:p-4 rounded-xl shrink-0`}>
        <div className={`${iconColor} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
    {change && (
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
        <span
          className={`text-sm font-semibold ${
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
        <span className="text-xs sm:text-sm text-gray-500">vs last month</span>
      </div>
    )}
  </Card>
);

export default MetricCard;
