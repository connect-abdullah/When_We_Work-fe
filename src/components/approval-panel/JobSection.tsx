"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui";
import { Job } from "@/components/approval-panel/types";
import PersonCard from "@/components/approval-panel/PersonCard";

interface JobSectionProps {
  jobs: Job[];
  onAccept: (jobId: number, personId: number) => void;
  onDecline: (jobId: number, personId: number) => void;
}

export default function JobSection({
  jobs,
  onAccept,
  onDecline,
}: JobSectionProps) {
  const [expandedJobs, setExpandedJobs] = useState<Set<number>>(new Set());

  const toggleJob = (jobId: number) => {
    setExpandedJobs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const handleAccept = (jobId: number, personId: number) => {
    onAccept(jobId, personId);
  };

  const handleDecline = (jobId: number, personId: number) => {
    onDecline(jobId, personId);
  };

  if (jobs.length === 0) {
    return (
      <div className="text-center py-8 text-[10px] text-gray-500">
        No jobs found
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 gap-2">
        {jobs.map((job) => {
          const isExpanded = expandedJobs.has(job.id);
          const hasApplicants = job.applicants && job.applicants.length > 0;

          return (
            <Card
              key={job.id}
              className="border border-gray-100 hover:border-[#5A6ACF]/30 transition-all duration-200"
              padding="md"
            >
              {/* Job Header */}
              <button
                onClick={() => toggleJob(job.id)}
                className="w-full flex items-center justify-between gap-3 text-left group"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-[#1F384C] truncate">
                    {job.name}
                  </h3>
                  <span className="text-[11px] text-[#5A6ACF] font-medium px-1.5 py-0.5 bg-[#5A6ACF]/10 rounded shrink-0">
                    ID: {job.jobId}
                  </span>
                </div>

                {/* People Count */}
                <div className="text-right shrink-0">
                  <span className="text-[11px] font-medium text-[#1F384C]">
                  Workers Requirement: {job.acceptedCount}/{job.totalRequired} 
                  </span>
                </div>

                {/* Dropdown Arrow */}
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform shrink-0 ${
                    isExpanded ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {/* Applicants List */}
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  {hasApplicants ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {job.applicants.map((applicant) => (
                        <PersonCard
                          key={applicant.id}
                          person={applicant}
                          onAccept={() => handleAccept(job.id, applicant.id)}
                          onDecline={() => handleDecline(job.id, applicant.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-[9px] text-gray-500">
                      No applicants for this job yet
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

