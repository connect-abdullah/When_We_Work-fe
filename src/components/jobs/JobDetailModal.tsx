"use client";

import React from "react";
import {
  X,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Users,
  Target,
  DollarSign,
  TrendingUp,
  Award,
  Edit,
} from "lucide-react";
import { JobSchema } from "@/types";

interface JobDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobSchema | null;
  onEdit?: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "inactive":
      return "bg-gray-50 text-gray-700 border-gray-200";
    case "on-leave":
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

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

const JobDetailModal: React.FC<JobDetailModalProps> = ({
  isOpen,
  onClose,
  job,
  onEdit,
}) => {
  if (!isOpen || !job) return null;

  const hiringRate =
    job.people_needed > 0
      ? Math.round((job.people_hired / job.people_needed) * 100)
      : 0;

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
                {job.job_name}
              </h2>
              <span
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${getStatusColor(job.status)}`}
              >
                {job.status === "on-leave"
                  ? "On Leave"
                  : job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-600">JOB:</span>{" "}
              {job.job_name}
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
              {job.description}
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Users size={16} className="text-blue-600" />
                <span className="text-xs text-gray-600">Hired</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {job.people_hired}
              </p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Target size={16} className="text-emerald-600" />
                <span className="text-xs text-gray-600">Needed</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {job.people_needed}
              </p>
            </div>
            <div className="p-4 bg-violet-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign size={16} className="text-violet-600" />
                <span className="text-xs text-gray-600">Salary</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                ${(job.salary / 1000).toFixed(0)}k
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

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Contact Information
              </h3>
              <div className="space-y-2">
                {job.email && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail size={16} className="text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 mb-0.5">Email</p>
                      <p className="text-sm text-gray-900 truncate">
                        {job.email}
                      </p>
                    </div>
                  </div>
                )}
                {job.phone && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone size={16} className="text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                      <p className="text-sm text-gray-900">{job.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Job Details */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Job Details
              </h3>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-0.5">Tone</p>
                  <p
                    className={`text-sm font-medium ${getToneColor(job.tone)}`}
                  >
                    {job.tone.charAt(0).toUpperCase() + job.tone.slice(1)}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-0.5">Salary Type</p>
                  <p className="text-sm font-medium text-gray-900">
                    {job.salary_type === "per_hour" ? "Per Hour" : "Fixed"}
                  </p>
                </div>
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
                {job.joinDate && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar size={16} className="text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 mb-0.5">Join Date</p>
                      <p className="text-sm text-gray-900">
                        {new Date(job.joinDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
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

          {/* Languages */}
          {job.languages && job.languages.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award size={16} className="text-gray-400" />
                <h3 className="text-sm font-semibold text-gray-700">
                  Languages
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {job.languages.map((lang, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-[#5A6ACF]/10 text-[#5A6ACF] text-sm font-medium rounded-lg"
                  >
                    {lang}
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
