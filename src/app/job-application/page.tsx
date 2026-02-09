"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, PageHeader } from "@/components/ui";
import { JobCard, JobDetailModal, JobFilters } from "@/components/admin/jobs";
import {
  createJobApplication,
  getJobApplications,
} from "@/lib/api/job-applications";
import { getJobs } from "@/lib/api/jobs";
import type { JobGetSchema } from "@/lib/api/jobs/schema";
import { Briefcase } from "lucide-react";
import {
  JobApplicationCreate,
  JobApplicationStatus,
} from "@/lib/api/job-applications/schema";

export default function JobApplicationPage() {
  const [jobs, setJobs] = useState<JobGetSchema[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("active");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<number | null>(null);
  const [detailJob, setDetailJob] = useState<JobGetSchema | null>(null);

  const fetchJobs = useCallback(async () => {
    setJobsLoading(true);
    try {
      const [list, applicationsRes] = await Promise.all([
        getJobs(),
        getJobApplications(),
      ]);
      setJobs(list ?? []);
      const appliedIds =
        applicationsRes?.data?.map((a) => a.job_id).filter(Boolean) ?? [];
      setAppliedJobs(new Set(appliedIds));
    } catch {
      setJobs([]);
      setAppliedJobs(new Set());
    } finally {
      setJobsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Exclude jobs that have already been applied to
      if (appliedJobs.has(job.id)) {
        return false;
      }
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.minimum_education
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || job.status === statusFilter;
      const salaryTypeMatch =
        typeFilter === "all"
          ? true
          : typeFilter === "hourly"
            ? job.salary_type === "hourly"
            : job.salary_type === typeFilter;
      return matchesSearch && matchesStatus && salaryTypeMatch;
    });
  }, [jobs, searchTerm, statusFilter, typeFilter, appliedJobs]);

  const handleApply = async (jobId: number) => {
    setIsLoading(jobId);
    const payload: JobApplicationCreate = {
      job_id: jobId,
      approved_status: JobApplicationStatus.applied,
    };
    try {
      const response = await createJobApplication(payload);
      if (response?.success) {
        setAppliedJobs((prev) => new Set([...prev, jobId]));
        // Refresh the list to remove the applied job from view
        await fetchJobs();
      }
    } catch {
      // handle error
    } finally {
      setIsLoading(null);
    }
  };

  const renderJobCardWithApply = (job: JobGetSchema) => (
    <JobCard
      key={job.id}
      job={job}
      isApplying={isLoading === job.id}
      onApply={() => handleApply(job.id)}
      onClick={() => setDetailJob(job)}
    />
  );

  const renderJobsGrid = () => {
    if (jobsLoading) {
      return (
        <Card className="p-8 text-center">
          <p className="text-sm text-gray-600">Loading jobs...</p>
        </Card>
      );
    }
    if (filteredJobs.length === 0) {
      return (
        <Card className="p-8 text-center">
          <Briefcase size={32} className="mx-auto mb-2 text-gray-400" />
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
          {filteredJobs.map((job) => renderJobCardWithApply(job))}
        </div>
        <div className="text-[10px] text-gray-500 mt-2 text-center">
          Showing {filteredJobs.length} of {jobs.length} jobs
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col w-full h-full pt-4 px-2 sm:px-4 overflow-y-auto">
      <PageHeader
        title="Job Applications"
        description="Browse and apply to available job opportunities"
      />

      <div className="px-2 sm:px-4 mb-4">
        <JobFilters
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          typeFilter={typeFilter}
          onSearchChange={setSearchTerm}
          onStatusFilterChange={(status) =>
            setStatusFilter(status as "all" | "active" | "inactive")
          }
          onTypeFilterChange={setTypeFilter}
        />
      </div>

      <div className="px-2 sm:px-4 mb-4">
        <div className="w-full">{renderJobsGrid()}</div>
      </div>

      <JobDetailModal
        isOpen={Boolean(detailJob)}
        job={detailJob}
        onClose={() => setDetailJob(null)}
      />
    </div>
  );
}
