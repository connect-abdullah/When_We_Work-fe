"use client";

import React from "react";
import Card from "@/components/ui/Card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartTooltipProps, DiagnosisData } from "./types";

interface MonthlyDiagnosesChartProps {
  data: DiagnosisData[];
  className?: string;
}

interface CustomTooltipProps extends ChartTooltipProps {
  totalPatients: number;
}

const CustomTooltip = ({
  active,
  payload,
  totalPatients,
}: CustomTooltipProps) => {
  if (!active || !payload?.length) {
    return null;
  }

  const data = payload[0];
  const percentage = ((data.value / totalPatients) * 100).toFixed(1);

  return (
    <div className="bg-white p-1.5 rounded shadow-md border border-gray-200">
      <p className="text-[10px] font-medium text-gray-900 mb-1">{data.name}</p>
      <p className="text-[10px] text-gray-600">
        {`${data.value.toLocaleString()} (${percentage}%)`}
      </p>
    </div>
  );
};

const ServiceDistributionChart: React.FC<MonthlyDiagnosesChartProps> = ({
  data,
  className = "",
}) => {
  const totalPatients = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className={`flex flex-col w-full p-2 ${className}`}>
      <h1 className="text-[10px] font-medium text-[#1F384C] mb-2">
        Top Services
      </h1>

      {/* Chart */}
      <div className="flex mt-2 items-center justify-center mb-2">
        <ResponsiveContainer width="100%" height={140}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={1}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={<CustomTooltip totalPatients={totalPatients} />}
            />
            {/* Center text */}
            <text
              x="50%"
              y="48%"
              textAnchor="middle"
              className="text-[9px] font-medium fill-gray-600"
            >
              Total
            </text>
            <text
              x="50%"
              y="58%"
              textAnchor="middle"
              className="text-[9px] font-bold fill-gray-900"
            >
              {totalPatients.toLocaleString()}
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-1 pt-2 border-t border-gray-200">
        {data.map((item, index) => {
          const percentage = ((item.value / totalPatients) * 100).toFixed(1);
          return (
            <div
              key={index}
              className="flex items-center justify-between text-[9px]"
            >
              <div className="flex items-center gap-1">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-600">{item.name}</span>
              </div>
              <span className="text-[8px] font-medium text-gray-900">
                {item.value.toLocaleString()} ({percentage}%)
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ServiceDistributionChart;
