"use client";
import React from "react";
import { Card } from "@/components/ui";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  label: string;
  value: string | number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  iconBgColor,
  iconColor,
  label,
  value,
}) => {
  return (
    <Card className="p-2">
      <div className="flex items-center gap-1.5 mb-1">
        <div className={`p-1 ${iconBgColor} rounded`}>
          <Icon size={12} className={iconColor} />
        </div>
        <p className="text-[9px] text-gray-600 font-medium">{label}</p>
      </div>
      <p className="text-sm font-bold text-gray-900">{value}</p>
    </Card>
  );
};

export default MetricCard;
