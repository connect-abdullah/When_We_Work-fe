"use client";

import React from "react";
import Card from "@/components/ui/Card";
import type { JobGetSchema } from "@/lib/api/jobs/schema";
import {
  DollarSign,
  Edit,
  Target,
  Trash,
  TrendingUp,
  Users,
} from "lucide-react";

interface JobCardProps {
  job: JobGetSchema;
  onEditClick?: () => void;
  onPlaygroundClick?: () => void;
  onDeleteClick?: () => void;
  onClick?: () => void;
  isUser?: boolean;
}

const getToneColor = (tone: string) => {
  switch (tone) {
    case "professional":
      return "text-blue-600";
    case "friendly":
      return "text-emerald-600";
    case "casual":
      return "text-amber-600";
    case "formal":
      return "text-violet-600";
    case "empathetic":
      return "text-rose-600";
    default:
      return "text-gray-600";
  }
};

const getStatusDot = (status: string) => {
  switch (status) {
    case "active":
      return "bg-emerald-500";
    case "inactive":
      return "bg-gray-400";
    case "completed":
      return "bg-blue-500";
    case "cancelled":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
};

const JobCard: React.FC<JobCardProps> = ({
  job,
  onEditClick,
  onPlaygroundClick,
  onDeleteClick,
  onClick,
  isUser = false,
}) => {
  const handleDelete = onDeleteClick ?? onPlaygroundClick;
  const needed = job.workers_required ?? 0;
  const hired = job.workers_hired ?? 0;
  const hiringRate = needed > 0 ? Math.round((hired / needed) * 100) : 0;
  const tone = job.tone_requirement ?? "professional";
  const salaryType = job.salary_type ?? "hourly";

  return (
    <div onClick={onClick} className="cursor-pointer">
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group relative bg-white border border-gray-200">
        {/* Top Bar with Status */}
        <div className={`h-1 ${getStatusDot(job.status ?? "inactive")}`} />

        {/* Content */}
        <div className="p-3">
          {/* Header Row */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0 pr-2">
              <h3 className="text-sm font-semibold text-[#1F384C] mb-2">
                <span className="text-gray-500 font-normal">JOB:</span>{" "}
                {job.title ?? ""}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-[10px] font-medium ${getToneColor(tone)}`}
                >
                  {tone}
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-[10px] text-gray-500">
                  {salaryType === "hourly" ? "Hourly" : "Fixed"}
                </span>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 mb-1">
                  <span className="font-medium text-gray-600">
                    Description:
                  </span>
                </p>
                <p className="text-[10px] text-gray-600 line-clamp-2 leading-relaxed">
                  {job.description ?? ""}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              {isUser && (
                <button
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onEditClick) {
                      onEditClick();
                    }
                  }}
                  title="Edit"
                >
                  <Edit size={12} className="text-gray-500" />
                </button>
              )}
              {!isUser && (
                <button
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete?.();
                  }}
                  title="Delete"
                >
                  <Trash size={12} className="text-gray-500" />
                </button>
              )}
            </div>
          </div>

          {/* Key Metrics - Horizontal Compact */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Target size={12} className="text-emerald-600" />
              </div>
              <p className="text-xs font-bold text-gray-900">{needed}</p>
              <p className="text-[9px] text-gray-500">Needed</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Users size={12} className="text-blue-600" />
              </div>
              <p className="text-xs font-bold text-gray-900">{hired}</p>
              <p className="text-[9px] text-gray-500">Hired</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <DollarSign size={12} className="text-violet-600" />
              </div>
              <p className="text-xs font-bold text-gray-900">${job.salary}</p>
              <p className="text-[9px] text-gray-500">Salary</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp size={12} className="text-amber-600" />
              </div>
              <p className="text-xs font-bold text-gray-900">{hiringRate}%</p>
              <p className="text-[9px] text-gray-500">Rate</p>
            </div>
          </div>

          {/* Bottom Section - Characteristics */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            {job.characteristics && job.characteristics.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {job.characteristics.slice(0, 2).map((char, index) => (
                  <span
                    key={index}
                    className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-[9px] font-medium rounded"
                  >
                    {char}
                  </span>
                ))}
                {job.characteristics.length > 2 && (
                  <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[9px] font-medium rounded">
                    +{job.characteristics.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JobCard;
