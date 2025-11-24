"use client";
import React from "react";
import Card from "@/components/ui/Card";
import { getInsightIcon } from "@/lib/iconHelpers";

interface CustomerInsight {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "neutral";
  icon: string;
  iconColor?: string;
  iconBgColor?: string;
}

interface InsightsCardProps {
  insights: CustomerInsight[];
}

const InsightsCard: React.FC<InsightsCardProps> = ({ insights }) => {
  return (
    <>
      {insights.map((insight, index) => (
        <Card
          key={index}
          className={`${insight.iconBgColor} flex flex-col w-full p-2`}
        >
          <div className="flex items-start justify-between mb-1.5">
            <div className="flex-1">
              <p className="text-[9px] text-gray-600 mb-1">{insight.title}</p>
              <h3 className="text-[14px] font-bold text-gray-900">
                {insight.value}
              </h3>
            </div>
            <div className={`${insight.iconBgColor} p-1.5 rounded-lg`}>
              <div className={insight.iconColor}>
                {getInsightIcon(insight.icon, 14, insight.iconColor)}
              </div>
            </div>
          </div>

          {insight.change && (
            <div className="flex items-center gap-0.5">
              <span
                className={`text-[8px] font-medium ${
                  insight.changeType === "positive"
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                {insight.changeType === "positive" && "↑ "}
                {insight.change}
              </span>
              <span className="text-[8px] text-gray-500">vs last month</span>
            </div>
          )}
        </Card>
      ))}
    </>
  );
};

export default InsightsCard;
