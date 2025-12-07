"use client";

import React, { useMemo, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { PageHeader } from "@/components/ui";
import { Plus } from "lucide-react";
import { Job_Details } from "@/constants/jobs";
import { JobSchema } from "@/types";
import JobFilters from "@/components/jobs/JobFilters";
import JobGrid from "@/components/jobs/JobGrid";
import JobStats from "@/components/jobs/JobStats";
import JobModal from "@/components/jobs/JobModal";
import JobDetailModal from "@/components/jobs/JobDetailModal";

export default function JobPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobSchema | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailJob, setDetailJob] = useState<JobSchema | null>(null);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return Job_Details.filter((job) => {
      const matchesSearch =
        job.job_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.minimum_education.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || job.status === statusFilter;
      // Map "hourly" from filter to "per_hour" in schema
      const salaryTypeMatch =
        typeFilter === "all"
          ? true
          : typeFilter === "hourly"
            ? job.salary_type === "per_hour"
            : job.salary_type === typeFilter;
      return matchesSearch && matchesStatus && salaryTypeMatch;
    });
  }, [searchTerm, statusFilter, typeFilter]);

  // Calculate stats
  const totalJobs = Job_Details.length;
  const activeJobs = Job_Details.filter((a) => a.status === "active").length;
  const totalPeopleNeeded = Job_Details.reduce(
    (sum, a) => sum + a.people_needed,
    0
  );
  const totalPeopleHired = Job_Details.reduce(
    (sum, a) => sum + a.people_hired,
    0
  );
  const totalSalary = Job_Details.reduce((sum, a) => sum + a.salary, 0);

  const stats = [
    {
      title: "Total Jobs",
      value: totalJobs.toString(),
      change: "+3",
      changeType: "positive" as const,
      icon: "users",
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-50",
    },
    {
      title: "Active Jobs",
      value: activeJobs.toString(),
      change: "+2",
      changeType: "positive" as const,
      icon: "usercheck",
      iconColor: "text-green-600",
      iconBgColor: "bg-green-50",
    },
    {
      title: "People Needed",
      value: totalPeopleNeeded.toString(),
      change: "+24",
      changeType: "positive" as const,
      icon: "users",
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-50",
    },
    {
      title: "People Hired",
      value: totalPeopleHired.toString(),
      change: "+18",
      changeType: "positive" as const,
      icon: "usercheck",
      iconColor: "text-indigo-600",
      iconBgColor: "bg-indigo-50",
    },
    {
      title: "Total Salary",
      value: `$${(totalSalary / 1000).toFixed(0)}k`,
      change: "+18.5%",
      changeType: "positive" as const,
      icon: "dollarsign",
      iconColor: "text-orange-600",
      iconBgColor: "bg-orange-50",
    },
    {
      title: "Hiring Rate",
      value: `${((totalPeopleHired / totalPeopleNeeded) * 100).toFixed(1)}%`,
      change: "+2.5%",
      changeType: "positive" as const,
      icon: "trendingup",
      iconColor: "text-yellow-600",
      iconBgColor: "bg-yellow-50",
    },
  ];

  const handleCreateJob = (_jobData: Partial<JobSchema>) => {
    // console.log("Creating new job:", jobData);
    // TODO: Implement API call to create job
    // The jobData will contain all the form fields matching JobSchema
  };

  const handleOpenModal = (job?: JobSchema) => {
    setSelectedJob(job || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleOpenDetailModal = (job: JobSchema) => {
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

  const handleUpdateJob = (_jobData: Partial<JobSchema>) => {
    // console.log("Updating job:", selectedJob?.id, jobData);
    // TODO: Implement API call to update job
    // The jobData will contain all the form fields matching JobSchema
  };

  return (
    <div className="bg-[#F1F2F7] min-h-screen flex flex-row w-full">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-col w-full h-screen">
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
            <JobGrid
              jobs={filteredJobs}
              totalJobs={totalJobs}
              onEditClick={(job) => handleOpenModal(job)}
              onCardClick={handleOpenDetailModal}
            />
          </div>
        </div>
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
