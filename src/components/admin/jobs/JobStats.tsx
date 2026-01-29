"use client";
import React from "react";
import { InsightsCard } from "@/components/ui";

interface JobStat {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "neutral";
  icon: string;
  iconColor?: string;
  iconBgColor?: string;
}

interface JobStatsProps {
  stats: JobStat[];
}

const JobStats: React.FC<JobStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-2 px-2 sm:px-4 mb-3">
      <InsightsCard insights={stats} />
    </div>
  );
};

export default JobStats;
