"use client";

import React, { useMemo, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Button, Card, PageHeader } from "@/components/ui";
import { Job_Details } from "@/constants/jobs";
import { JobSchema } from "@/types";
import JobCard from "@/components/jobs/JobCard";
import JobFilters from "@/components/jobs/JobFilters";
import { Briefcase, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function JobApplicationPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTabId, setActiveTabId] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("active");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [hiredJobs] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState<string | null>(null);

  // Base filter for all jobs
  const baseFilteredJobs = useMemo(() => {
    return Job_Details.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
            ? job.salary_type === "per_hour"
            : job.salary_type === typeFilter;
      return matchesSearch && matchesStatus && salaryTypeMatch;
    });
  }, [searchTerm, statusFilter, typeFilter]);

  // Filter jobs based on active tab
  const filteredJobs = useMemo(() => {
    if (activeTabId === "applied") {
      return baseFilteredJobs.filter((job) => appliedJobs.has(job.id));
    }
    if (activeTabId === "hired") {
      return baseFilteredJobs.filter((job) => hiredJobs.has(job.id));
    }
    return baseFilteredJobs;
  }, [baseFilteredJobs, activeTabId, appliedJobs, hiredJobs]);

  const handleApply = async (jobId: string) => {
    setIsLoading(jobId);
    try {
      // TODO: Implement actual API call to apply for job
      // This would check if user is logged in and submit application
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAppliedJobs((prev) => new Set([...prev, jobId]));
      // You could show a success toast here
    } catch (error) {
      console.error("Error applying to job:", error);
      // You could show an error toast here
    } finally {
      setIsLoading(null);
    }
  };

  // Note: handleMarkAsHired would typically be called from backend when employer accepts application
  // For now, hired jobs are tracked separately and would come from API

  const renderJobCardWithApply = (job: JobSchema) => {
    const isApplied = appliedJobs.has(job.id);
    const isHired = hiredJobs.has(job.id);
    const isApplying = isLoading === job.id;

    return (
      <div key={job.id} className="flex flex-col">
        <div className="relative pb-12">
          <JobCard
            job={job}
            // Don't pass onEditClick to hide edit buttons
          />
        </div>
        {/* Apply Button */}
        <div className="px-3 -mt-10">
          {isHired ? (
            <Button
              variant="secondary"
              size="sm"
              className="w-full text-[10px] font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              disabled
            >
              <CheckCircle2 size={12} />
              Hired
            </Button>
          ) : isApplied ? (
            <Button
              variant="secondary"
              size="sm"
              className="w-full text-[10px] font-medium"
              disabled
            >
              <CheckCircle2 size={12} />
              Applied
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              className="w-full text-[10px] font-medium"
              onClick={(e) => {
                e.stopPropagation();
                handleApply(job.id);
              }}
              disabled={isApplying}
            >
              {isApplying ? "Applying..." : "Apply Now"}
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderJobsGrid = () => {
    if (filteredJobs.length === 0) {
      return (
        <Card className="p-8 text-center">
          <Briefcase size={32} className="mx-auto mb-2 text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            No jobs found
          </h3>
          <p className="text-[10px] text-gray-600">
            {activeTabId === "applied"
              ? "You haven't applied to any jobs yet"
              : activeTabId === "hired"
                ? "You haven't been hired for any jobs yet"
                : "Try adjusting your search or filters"}
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
          Showing {filteredJobs.length} of{" "}
          {activeTabId === "all"
            ? baseFilteredJobs.length
            : activeTabId === "applied"
              ? appliedJobs.size
              : hiredJobs.size}{" "}
          {activeTabId === "all"
            ? "jobs"
            : activeTabId === "applied"
              ? "applied jobs"
              : "hired jobs"}
        </div>
      </>
    );
  };

  const tabItems = [
    { id: "all", label: `All Jobs (${baseFilteredJobs.length})` },
    { id: "applied", label: `Applied (${appliedJobs.size})` },
    { id: "hired", label: `Hired (${hiredJobs.size})` },
  ];

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
            title="Job Applications"
            description="Browse and apply to available job opportunities"
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          />

          {/* Filters and Search */}
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

          {/* Tabs */}
          <div className="px-2 sm:px-4 mb-4">
            <div className="w-full">
              {/* Tab Headers */}
              <div className="flex border-b border-[#C8CBD9] mb-2">
                {tabItems.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTabId(tab.id)}
                    className={cn(
                      "px-3 py-1.5 text-[10px] font-medium transition-colors border-b-2",
                      activeTabId === tab.id
                        ? "text-[#5A6ACF] border-[#5A6ACF] bg-[#F1F2F7]"
                        : "text-[#5A6ACF]/70 border-transparent hover:text-[#5A6ACF] hover:border-[#5A6ACF]/30"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="w-full">{renderJobsGrid()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
