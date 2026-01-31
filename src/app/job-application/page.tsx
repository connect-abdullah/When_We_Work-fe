"use client";

import React, { useMemo, useState } from "react";
import { Button, Card, PageHeader } from "@/components/ui";
import { Job_Details } from "@/constants/jobs";
import JobCard from "@/components/admin/jobs/JobCard";
import JobFilters from "@/components/admin/jobs/JobFilters";
import type { JobGetSchema } from "@/lib/api/jobs/schema";
import { Briefcase, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function JobApplicationPage() {
  const [activeTabId, setActiveTabId] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("active");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [appliedJobs, setAppliedJobs] = useState<Set<number>>(new Set());
  const [hiredJobs] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState<number | null>(null);

  const baseFilteredJobs = useMemo(() => {
    return Job_Details.filter((job) => {
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
  }, [searchTerm, statusFilter, typeFilter]);

  const filteredJobs = useMemo(() => {
    if (activeTabId === "applied") {
      return baseFilteredJobs.filter((job) => appliedJobs.has(job.id));
    }
    if (activeTabId === "hired") {
      return baseFilteredJobs.filter((job) => hiredJobs.has(job.id));
    }
    return baseFilteredJobs;
  }, [baseFilteredJobs, activeTabId, appliedJobs, hiredJobs]);

  const handleApply = async (jobId: number) => {
    setIsLoading(jobId);
    try {
      // TODO: Implement actual API call to apply for job
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAppliedJobs((prev) => new Set([...prev, jobId]));
    } catch {
      // handle error
    } finally {
      setIsLoading(null);
    }
  };

  const renderJobCardWithApply = (job: JobGetSchema) => {
    const isApplied = appliedJobs.has(job.id);
    const isHired = hiredJobs.has(job.id);
    const isApplying = isLoading === job.id;

    return (
      <div key={job.id} className="flex flex-col">
        <div className="relative pb-12">
          <JobCard job={job} isUser={true} />
        </div>
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
        <div className="w-full">
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
          <div className="w-full">{renderJobsGrid()}</div>
        </div>
      </div>
    </div>
  );
}
