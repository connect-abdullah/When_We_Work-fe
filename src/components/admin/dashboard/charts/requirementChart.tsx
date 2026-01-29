"use client";

import React from "react";
import Card from "@/components/ui/Card";
import { PlatformConversionData } from "./types";

interface RequirementChartProps {
  data: PlatformConversionData[];
  className?: string;
}

// Available job/event names to assign
const JOB_TITLES = [
  "Wedding Party",
  "Baby Shower",
  "Birthday Bash",
  "Corporate Event",
  "Graduation Dinner",
  "Holiday Gala",
  "Engagement Party",
  "Retirement Fête",
  "Charity Ball",
  "Family Reunion",
];

const jobColors: { gradient: string; solid: string; light: string }[] = [
  {
    gradient: "from-rose-400 to-fuchsia-500",
    solid: "#F43F5E",
    light: "#FFE4E6",
  }, // Wedding Party
  { gradient: "from-blue-400 to-cyan-400", solid: "#38BDF8", light: "#E0F2FE" }, // Baby Shower
  {
    gradient: "from-orange-400 to-yellow-400",
    solid: "#F59E42",
    light: "#FEF3C7",
  }, // Birthday
  {
    gradient: "from-neutral-500 to-neutral-700",
    solid: "#6B7280",
    light: "#F3F4F6",
  }, // Corporate Event
  {
    gradient: "from-green-400 to-lime-400",
    solid: "#22C55E",
    light: "#DCFCE7",
  }, // Graduation
  {
    gradient: "from-purple-400 to-violet-400",
    solid: "#A78BFA",
    light: "#F3E8FF",
  }, // Holiday
  { gradient: "from-pink-400 to-red-400", solid: "#EC4899", light: "#FCE7F3" }, // Engagement
  {
    gradient: "from-teal-400 to-emerald-400",
    solid: "#2DD4BF",
    light: "#CCFBF1",
  }, // Retirement
  {
    gradient: "from-indigo-400 to-blue-500",
    solid: "#6366F1",
    light: "#E0E7FF",
  }, // Charity
  {
    gradient: "from-yellow-400 to-amber-400",
    solid: "#FACC15",
    light: "#FEF9C3",
  }, // Family Reunion
];

const getJobTitle = (index: number) =>
  JOB_TITLES[index] || `Special Event ${index + 1}`;
const getJobColor = (index: number) => jobColors[index % jobColors.length];

const RequirementChart: React.FC<RequirementChartProps> = ({
  data,
  className = "",
}) => {
  // NOTE: Instead of "platform", we'll use job/event titles in order
  const totalNeeded = data.reduce((sum, item) => sum + item.inquiries, 0);
  const totalScheduled = data.reduce((sum, item) => sum + item.conversions, 0);
  const totalPending = totalNeeded > 0 ? totalNeeded - totalScheduled : 0;

  // Find max inquiries to normalize progress bar widths
  const maxInquiries = Math.max(...data.map((item) => item.inquiries), 1);

  // Sort by persons needed
  const sortedData = [...data].sort((a, b) => b.inquiries - a.inquiries);

  return (
    <Card className={`flex flex-col w-full p-2 ${className}`}>
      {/* Header Section */}
      <div className="mb-2">
        <h1 className="text-[10px] font-medium text-[#1F384C] mb-2">
          Persons Needed For Event Jobs
        </h1>
        <div className="flex items-center gap-2 text-[8px]">
          <div className="flex items-center gap-1">
            <span className="text-gray-600">Persons Needed:</span>
            <span className="font-bold text-gray-900">{totalNeeded}</span>
          </div>
          <span className="text-gray-300">•</span>
          <div className="flex items-center gap-1">
            <span className="text-gray-600">Scheduled:</span>
            <span className="font-bold text-green-600">{totalScheduled}</span>
          </div>
          <span className="text-gray-300">•</span>
          <div className="flex items-center gap-1">
            <span className="text-gray-600">Pending:</span>
            <span className="font-bold text-orange-600">{totalPending}</span>
          </div>
        </div>
      </div>

      {/* Job Chart Area */}
      <div className="space-y-2">
        {sortedData.map((item, index) => {
          const pending = item.inquiries - item.conversions;
          const jobTitle = getJobTitle(index);
          const colors = getJobColor(index);

          // Compute width for needed persons bar (relative to max inquiries in list)
          const neededWidthPercent = (item.inquiries / maxInquiries) * 100;
          // Compute width for scheduled bar (relative to needed on same row)
          const scheduledWidthPercent =
            item.inquiries > 0 ? (item.conversions / item.inquiries) * 100 : 0;

          return (
            <div
              key={index}
              className="group relative p-1 rounded-lg hover:bg-gray-50/50 transition-colors"
            >
              {/* Info Row: Job Name */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex flex-col">
                  <span className="text-[9px] font-semibold text-gray-900">
                    {jobTitle}
                  </span>
                  <span className="text-[8px] text-gray-500">
                    {item.inquiries} persons needed · {item.conversions}{" "}
                    scheduled
                    {pending > 0 && (
                      <>
                        {" "}
                        ·{" "}
                        <span className="text-orange-600">
                          {pending} pending
                        </span>
                      </>
                    )}
                  </span>
                </div>
                {/* No percentage, no platform, nothing else on right */}
                <span className="sr-only">{jobTitle}</span>
              </div>

              {/* Progress Bar */}
              <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
                {/* Needed bar (full length for persons needed) */}
                <div
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r ${colors.gradient} rounded-full transition-all duration-500 ease-out`}
                  style={{
                    width: `${neededWidthPercent}%`,
                    opacity: 0.25,
                  }}
                  aria-hidden="true"
                ></div>
                {/* Scheduled bar (portion of persons scheduled) */}
                <div
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r ${colors.gradient} rounded-full transition-all duration-500 ease-out`}
                  style={{
                    width: `${neededWidthPercent * (scheduledWidthPercent / 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default RequirementChart;
