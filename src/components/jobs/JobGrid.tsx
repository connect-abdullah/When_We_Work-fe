"use client";
import React from "react";
import { Users } from "lucide-react";
import { Card } from "@/components/ui";
import { JobSchema } from "@/types";
import JobCard from "@/components/jobs/JobCard";

interface JobGridProps {
  jobs: JobSchema[];
  totalJobs: number;
  onEditClick: (job: JobSchema) => void;
  onCardClick?: (job: JobSchema) => void;
}

const JobGrid: React.FC<JobGridProps> = ({ jobs, totalJobs, onEditClick, onCardClick }) => {
  if (jobs.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Users size={32} className="mx-auto mb-2 text-gray-400" />
        <h3 className="text-sm font-semibold text-gray-900 mb-1">
          No jobs found
        </h3>
        <p className="text-[10px] text-gray-600">
          Try adjusting your search or filters
        </p>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-2">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onEditClick={() => onEditClick(job)}
            onClick={() => onCardClick?.(job)}
          />
        ))}
      </div>

      {/* Results Count */}
      <div className="text-[10px] text-gray-500 mt-2 text-center">
        Showing {jobs.length} of {totalJobs} jobs
      </div>
    </>
  );
};

export default JobGrid;
