"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/ui";
import { Plus } from "lucide-react";
import type { JobCreate, JobGetSchema } from "@/lib/api/jobs/schema";
import { createJob, deleteJob, getJobs, updateJob } from "@/lib/api/jobs";
import JobFilters from "@/components/admin/jobs/JobFilters";
import JobGrid from "@/components/admin/jobs/JobGrid";
import JobStats from "@/components/admin/jobs/JobStats";
import JobModal from "@/components/admin/jobs/JobModal";
import JobDetailModal from "@/components/admin/jobs/JobDetailModal";

export default function JobPage() {
  const [jobs, setJobs] = useState<JobGetSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobGetSchema | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailJob, setDetailJob] = useState<JobGetSchema | null>(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getJobs();
      setJobs(Array.isArray(data) ? data : []);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const title = (job.title ?? "").toLowerCase();
      const education = (job.minimum_education ?? "").toLowerCase();
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        title.includes(term) ||
        education.includes(term);
      const matchesStatus =
        statusFilter === "all" || job.status === statusFilter;
      const salaryTypeMatch =
        typeFilter === "all" || job.salary_type === typeFilter;
      return matchesSearch && matchesStatus && salaryTypeMatch;
    });
  }, [jobs, searchTerm, statusFilter, typeFilter]);

  // Calculate stats from API data
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((a) => a.status === "active").length;
  const totalPeopleNeeded = jobs.reduce(
    (sum, a) => sum + (a.workers_required ?? 0),
    0,
  );
  const totalPeopleHired = jobs.reduce(
    (sum, a) => sum + (a.workers_hired ?? 0),
    0,
  );
  const stats = [
    {
      title: "Total Jobs",
      value: totalJobs.toString(),
      change: "",
      changeType: "neutral" as const,
      icon: "users",
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-50",
    },
    {
      title: "Active Jobs",
      value: activeJobs.toString(),
      change: "",
      changeType: "neutral" as const,
      icon: "usercheck",
      iconColor: "text-green-600",
      iconBgColor: "bg-green-50",
    },
    {
      title: "People Needed",
      value: totalPeopleNeeded.toString(),
      change: "",
      changeType: "neutral" as const,
      icon: "users",
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-50",
    },
    {
      title: "People Hired",
      value: totalPeopleHired.toString(),
      change: "",
      changeType: "neutral" as const,
      icon: "usercheck",
      iconColor: "text-indigo-600",
      iconBgColor: "bg-indigo-50",
    },
  ];

  const handleCreateJob = async (jobData: Partial<JobGetSchema>) => {
    try {
      const payload: JobCreate = {
        title: jobData.title ?? "",
        description: jobData.description ?? "",
        status: (jobData.status as JobCreate["status"]) ?? ("active" as JobCreate["status"]),
        minimum_education: jobData.minimum_education ?? "",
        job_category: (jobData.job_category as JobCreate["job_category"]) ?? ("full_time" as JobCreate["job_category"]),
        tone_requirement: (jobData.tone_requirement as JobCreate["tone_requirement"]) ?? ("professional" as JobCreate["tone_requirement"]),
        characteristics: jobData.characteristics,
        workers_required: jobData.workers_required ?? 0,
        workers_hired: jobData.workers_hired ?? 0,
        salary: jobData.salary ?? 0,
        salary_type: (jobData.salary_type as JobCreate["salary_type"]) ?? ("hourly" as JobCreate["salary_type"]),
        admin_id: 2, // TODO: from auth
      };
      await createJob(payload);
      await fetchJobs();
      handleCloseModal();
    } catch {
      // TODO: show error toast
    }
  };

  const handleOpenModal = (job?: JobGetSchema) => {
    setSelectedJob(job ?? null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleOpenDetailModal = (job: JobGetSchema) => {
    setDetailJob(job);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setDetailJob(null);
  };

  const handleEditFromDetail = () => {
    if (detailJob) {
      setIsDetailModalOpen(false);
      setSelectedJob(detailJob);
      setIsModalOpen(true);
    }
  };

  const handleUpdateJob = async (jobData: Partial<JobGetSchema>) => {
    if (selectedJob?.id == null) {
      return;
    }
    try {
      const payload = { ...selectedJob, ...jobData, admin_id: 2 } as JobGetSchema;
      await updateJob(payload, selectedJob.id);
      await fetchJobs();
      handleCloseModal();
    } catch {
      // TODO: show error toast
    }
  };

  const handleDeleteJob = async (job: JobGetSchema) => {
    if (job?.id == null) {
      return;
    }
    if (!window.confirm(`Delete job "${job.title ?? "this job"}"?`)) {
      return;
    }
    try {
      await deleteJob(job.id);
      if (detailJob?.id === job.id) {
        handleCloseDetailModal();
      }
      await fetchJobs();
    } catch {
      // TODO: show error toast
    }
  };

  return (
    <div className="flex flex-col w-full h-full pt-4 px-2 sm:px-4 overflow-y-auto">
      {/* Header */}
          <PageHeader
            title="Jobs"
            description="Manage and view your sales team performance"
            button={{
              label: "Add New Job",
              icon: Plus,
              onClick: () => handleOpenModal(),
            }}
          />

          {/* Stats Cards */}
          <JobStats stats={stats} />

          {/* Filters and Search */}
          <div className="px-2 sm:px-4 mb-2">
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

          {/* Jobs Grid */}
          <div className="px-2 sm:px-4 mb-2">
            {loading ? (
              <div className="py-12 text-center text-sm text-gray-500">
                Loading jobs...
              </div>
            ) : (
              <JobGrid
                jobs={filteredJobs}
                totalJobs={totalJobs}
                onEditClick={(job) => handleOpenModal(job)}
                onCardClick={handleOpenDetailModal}
                onDeleteClick={handleDeleteJob}
              />
            )}
          </div>

      {/* Job Modal - Used for both create and edit */}
      <JobModal
        isOpen={isModalOpen}
        job={selectedJob || undefined}
        onClose={handleCloseModal}
        onSubmit={selectedJob ? handleUpdateJob : handleCreateJob}
      />

      {/* Job Detail Modal */}
      <JobDetailModal
        isOpen={isDetailModalOpen}
        job={detailJob}
        onClose={handleCloseDetailModal}
        onEdit={handleEditFromDetail}
      />
    </div>
  );
}
