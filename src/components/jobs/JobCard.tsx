"use client";

import React from "react";
import Card from "@/components/ui/Card";
import { JobSchema } from "@/types";
import {
  Mail,
  Phone,
  TrendingUp,
  Target,
  DollarSign,
  UserCheck,
  Award,
  Edit,
  Trash,
} from "lucide-react";
import Image from "next/image";

interface JobCardProps {
  job: JobSchema;
  onEditClick?: () => void;
  onPlaygroundClick?: () => void;
}

const getToneColor = (tone: string) => {
  switch (tone) {
    case "professional":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "friendly":
      return "bg-green-100 text-green-700 border-green-200";
    case "casual":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "formal":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "empathetic":
      return "bg-pink-100 text-pink-700 border-pink-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700 border-green-300";
    case "inactive":
      return "bg-gray-100 text-gray-700 border-gray-300";
    case "on-leave":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
};

const JobCard: React.FC<JobCardProps> = ({
  job,
  onEditClick,
  onPlaygroundClick,
}) => {
  return (
    <Card className="p-1.5 hover:shadow-md transition-all duration-200 group relative">
      {/* Action Buttons - Appear on hover */}
      <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          className="p-1 bg-white border border-gray-200 rounded hover:border-[#5A6ACF] hover:bg-[#5A6ACF]/10 transition-colors shadow-sm"
          onClick={(e) => {
            e.stopPropagation();
            if (onEditClick) {
              onEditClick();
            }
          }}
          title="Edit Job"
        >
          <Edit size={10} className="text-gray-600 hover:text-[#5A6ACF]" />
        </button>
        <button
          className="p-1 bg-white border border-gray-200 rounded hover:border-green-500 hover:bg-green-50 transition-colors shadow-sm"
          onClick={(e) => {
            e.stopPropagation();
            if (onPlaygroundClick) {
              onPlaygroundClick();
            }
          }}
          title="Playground"
        >
          <Trash size={10} className="text-gray-600 hover:text-green-600" />
        </button>
      </div>

      {/* Header Section with Profile Image */}
      <div className="flex items-start gap-1.5 mb-1.5">
        <div className="relative shrink-0">
          {job.profileImage ? (
            <Image
              src={job.profileImage}
              alt={job.job_name}
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
              width={32}
              height={32}
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#5A6ACF] to-[#4A5ABF] flex items-center justify-center text-white font-semibold text-[9px] border border-gray-200">
              {job.job_name.charAt(0).toUpperCase()}
            </div>
          )}
          <div
            className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-white ${
              job.status === "active"
                ? "bg-green-500"
                : job.status === "inactive"
                  ? "bg-gray-400"
                  : "bg-yellow-500"
            }`}
          ></div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-0.5">
            <div className="flex-1 min-w-0 pr-8">
              <h3 className="text-[9px] font-semibold text-[#1F384C] truncate">
                {job.job_name}
              </h3>
              <p className="text-[9px] text-gray-600 truncate">
                {job.description}
              </p>
            </div>
          </div>

          {/* Tone & Status Badges */}
          <div className="flex items-center gap-0.5 flex-wrap">
            <span
              className={`inline-block px-1 py-0.5 rounded text-[9px] font-medium border ${getToneColor(job.tone)}`}
            >
              {job.tone.charAt(0).toUpperCase() + job.tone.slice(1)}
            </span>
            <span
              className={`inline-block px-1 py-0.5 rounded text-[9px] font-medium border ${getStatusColor(job.status)}`}
            >
              {job.status === "on-leave"
                ? "Leave"
                : job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Characteristics */}
      {job.characteristics && job.characteristics.length > 0 && (
        <div className="mb-1.5">
          <div className="flex flex-wrap gap-0.5">
            {job.characteristics.slice(0, 3).map((char, index) => (
              <span
                key={index}
                className="px-1 py-0.5 bg-gray-50 text-gray-700 text-[9px] font-medium rounded border border-gray-200"
              >
                {char}
              </span>
            ))}
            {job.characteristics.length > 3 && (
              <span className="px-1 py-0.5 bg-gray-50 text-gray-500 text-[9px] font-medium rounded border border-gray-200">
                +{job.characteristics.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Contact Info */}
      {(job.email || job.phone) && (
        <div className="flex items-center gap-1.5 mb-1.5 text-gray-600">
          {job.email && (
            <div className="flex items-center gap-0.5">
              <Mail size={8} className="text-gray-400" />
              <span className="text-[9px] truncate max-w-[80px]">
                {job.email}
              </span>
            </div>
          )}
          {job.phone && (
            <div className="flex items-center gap-0.5">
              <Phone size={8} className="text-gray-400" />
              <span className="text-[9px]">{job.phone}</span>
            </div>
          )}
        </div>
      )}

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-1 pt-1.5 border-t border-gray-200">
        <div className="flex items-center gap-0.5">
          <div className="p-0.5 bg-blue-50 rounded">
            <Target size={8} className="text-blue-600" />
          </div>
          <div>
            <p className="text-[9px] text-gray-600">Hired</p>
            <p className="text-[9px] font-bold text-gray-900">
              {job.people_hired}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-0.5">
          <div className="p-0.5 bg-green-50 rounded">
            <UserCheck size={8} className="text-green-600" />
          </div>
          <div>
            <p className="text-[9px] text-gray-600">Needed</p>
            <p className="text-[9px] font-bold text-gray-900">
              {job.people_needed}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-0.5">
          <div className="p-0.5 bg-purple-50 rounded">
            <DollarSign size={8} className="text-purple-600" />
          </div>
          <div>
            <p className="text-[9px] text-gray-600">Salary</p>
            <p className="text-[9px] font-bold text-gray-900">
              ${(job.salary / 1000).toFixed(0)}k
            </p>
          </div>
        </div>

        <div className="flex items-center gap-0.5">
          <div className="p-0.5 bg-orange-50 rounded">
            <TrendingUp size={8} className="text-orange-600" />
          </div>
          <div>
            <p className="text-[9px] text-gray-600">Type</p>
            <p className="text-[9px] font-bold text-gray-900">
              {job.salary_type === "per_hour" ? "Hourly" : "Per Job"}
            </p>
          </div>
        </div>
      </div>

      {/* Languages */}
      {job.languages && job.languages.length > 0 && (
        <div className="mt-1.5 pt-1.5 border-t border-gray-200">
          <div className="flex items-center gap-0.5 mb-0.5">
            <Award size={7} className="text-gray-400" />
            <span className="text-[9px] text-gray-600 font-medium">
              Languages
            </span>
          </div>
          <div className="flex flex-wrap gap-0.5">
            {job.languages.map((lang, index) => (
              <span
                key={index}
                className="px-1 py-0.5 bg-[#5A6ACF]/10 text-[#5A6ACF] text-[9px] font-medium rounded"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default JobCard;
