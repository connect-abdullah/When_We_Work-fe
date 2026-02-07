"use client";

import React from "react";
import {
  Clock,
  DollarSign,
  Edit,
  GraduationCap,
  Target,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import type { JobGetSchema } from "@/lib/api/jobs/schema";

interface JobDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobGetSchema | null;
  onEdit?: () => void;
}

const dateOpt = { month: "short", day: "numeric", year: "numeric" } as const;
const timeOpt = { hour: "numeric", minute: "2-digit", hour12: true } as const;

function formatJobTimingForModal(
  fromIso: string | undefined,
  toIso: string | undefined,
): { from: string; to: string } {
  if (!fromIso && !toIso) return { from: "—", to: "—" };
  try {
    const from = fromIso ? new Date(fromIso) : null;
    const to = toIso ? new Date(toIso) : null;
    const fmt = (d: Date) =>
      `${d.toLocaleDateString(undefined, dateOpt)}, ${d.toLocaleTimeString(undefined, timeOpt)}`;
    if (!from && to) return { from: "—", to: fmt(to) };
    if (from && !to) return { from: fmt(from), to: "—" };
    if (!from || !to) return { from: "—", to: "—" };
    return { from: fmt(from), to: fmt(to) };
  } catch {
    return { from: "—", to: "—" };
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "inactive":
      return "bg-gray-50 text-gray-700 border-gray-200";
    case "completed":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "cancelled":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const JobDetailModal: React.FC<JobDetailModalProps> = ({
  isOpen,
  onClose,
  job,
  onEdit,
}) => {
  if (!isOpen || !job) {
    return null;
  }

  const needed = job.workers_required ?? 0;
  const hired = job.workers_hired ?? 0;
  const hiringRate = needed > 0 ? Math.round((hired / needed) * 100) : 0;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-semibold text-[#1F384C]">
                {job.title ?? ""}
              </h2>
              <span
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${getStatusColor(job.status ?? "inactive")}`}
              >
                {(job.status ?? "inactive").charAt(0).toUpperCase() +
                  (job.status ?? "inactive").slice(1)}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-600">JOB:</span>{" "}
              {job.title ?? ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                onClick={onEdit}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Edit Job"
              >
                <Edit size={18} className="text-gray-600" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Description
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {job.description ?? ""}
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Users size={16} className="text-blue-600" />
                <span className="text-xs text-gray-600">Hired</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{hired}</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Target size={16} className="text-emerald-600" />
                <span className="text-xs text-gray-600">Needed</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{needed}</p>
            </div>
            <div className="p-4 bg-violet-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign size={16} className="text-violet-600" />
                <span className="text-xs text-gray-600">Salary</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                ${job.salary ?? 0}
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-amber-600" />
                <span className="text-xs text-gray-600">Hiring Rate</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{hiringRate}%</p>
            </div>
          </div>

          {/* Job Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Job Details
            </h3>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-0.5">Salary Type</p>
                <p className="text-sm font-medium text-gray-900">
                  {(job.salary_type ?? "hourly") === "hourly"
                    ? "Per Hour"
                    : "Fixed"}
                </p>
              </div>
              {(job.from_date_time || job.to_date_time) && (() => {
                const { from, to } = formatJobTimingForModal(job.from_date_time, job.to_date_time);
                return (
                  <div className="flex gap-3 p-3 bg-slate-50/80 rounded-lg border border-slate-100">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white border border-slate-100 shrink-0">
                      <Clock size={18} className="text-slate-500" strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Schedule</p>
                      <div className="space-y-1 text-sm text-slate-800 tabular-nums">
                        <p><span className="text-slate-500 font-medium">From</span> {from}</p>
                        <p><span className="text-slate-500 font-medium">To</span> {to}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
              {job.minimum_education && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <GraduationCap size={16} className="text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 mb-0.5">
                      Minimum Education
                    </p>
                    <p className="text-sm text-gray-900">
                      {job.minimum_education}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Characteristics */}
          {job.characteristics && job.characteristics.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Characteristics
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.characteristics.map((char, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg"
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;
