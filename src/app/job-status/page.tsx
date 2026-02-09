"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, PageHeader } from "@/components/ui";
import { JobCard, JobDetailModal } from "@/components/admin/jobs";
import { getJobStatusPanel } from "@/lib/api/job-applications";
import { JobApplicationStatus } from "@/lib/api/job-applications/schema";
import type { JobStatusPanelItem } from "@/lib/api/job-applications/schema";
import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export default function JobStatusPage() {
  const [statusData, setStatusData] = useState<JobStatusPanelItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<JobApplicationStatus>(
    JobApplicationStatus.applied,
  );
  const [detailJob, setDetailJob] = useState<JobStatusPanelItem | null>(null);

  const fetchJobStatus = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getJobStatusPanel();
      setStatusData(res?.data ?? []);
    } catch {
      setStatusData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobStatus();
  }, [fetchJobStatus]);

  const filteredJobs = useMemo(() => {
    return statusData.filter((item) => item.approved_status === activeTab);
  }, [statusData, activeTab]);

  const counts = useMemo(() => {
    return {
      applied: statusData.filter(
        (item) => item.approved_status === JobApplicationStatus.applied,
      ).length,
      rejected: statusData.filter(
        (item) => item.approved_status === JobApplicationStatus.rejected,
      ).length,
      approved: statusData.filter(
        (item) => item.approved_status === JobApplicationStatus.approved,
      ).length,
    };
  }, [statusData]);

  const renderJobsGrid = () => {
    if (loading) {
      return (
        <Card className="p-8 text-center">
          <p className="text-sm text-gray-600">Loading job status...</p>
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
            {activeTab === JobApplicationStatus.applied
              ? "You haven't applied to any jobs yet"
              : activeTab === JobApplicationStatus.rejected
                ? "You don't have any rejected applications"
                : "You don't have any approved applications"}
          </p>
        </Card>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-2">
          {filteredJobs.map((item) => {
            const job = item.job_details;
            return (
              <JobCard
                key={`${item.approved_status}-${job.id}`}
                job={{
                  id: job.id,
                  title: job.title,
                  description: job.description,
                  status: job.status as any,
                  minimum_education: job.minimum_education,
                  job_category: job.job_category as any,
                  characteristics: job.characteristics ?? undefined,
                  workers_required: job.workers_required,
                  salary: job.salary,
                  salary_type: undefined,
                  from_date_time: job.from_date_time,
                  to_date_time: job.to_date_time,
                  workers_hired: job.workers_hired,
                }}
                isApplied={item.approved_status === JobApplicationStatus.applied}
                isHired={item.approved_status === JobApplicationStatus.approved}
                onClick={() => setDetailJob(item)}
              />
            );
          })}
        </div>
        <div className="text-[10px] text-gray-500 mt-2 text-center">
          Showing {filteredJobs.length} of {counts[activeTab]}{" "}
          {activeTab === JobApplicationStatus.applied
            ? "applied jobs"
            : activeTab === JobApplicationStatus.rejected
              ? "rejected jobs"
              : "approved jobs"}
        </div>
      </>
    );
  };

  const tabItems = [
    {
      id: JobApplicationStatus.applied,
      label: `Applied (${counts.applied})`,
    },
    {
      id: JobApplicationStatus.rejected,
      label: `Rejected (${counts.rejected})`,
    },
    {
      id: JobApplicationStatus.approved,
      label: `Approved (${counts.approved})`,
    },
  ];

  return (
    <div className="flex flex-col w-full h-full pt-4 px-2 sm:px-4 overflow-y-auto">
      <PageHeader
        title="Job Status"
        description="View the status of your job applications"
      />

      <div className="px-2 sm:px-4 pb-8 mt-4">
        <div className="w-full">
          <div className="flex border-b border-[#C8CBD9] mb-2">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-3 py-1.5 text-[10px] font-medium transition-colors border-b-2",
                  activeTab === tab.id
                    ? "text-[#5A6ACF] border-[#5A6ACF] bg-[#F1F2F7]"
                    : "text-[#5A6ACF]/70 border-transparent hover:text-[#5A6ACF] hover:border-[#5A6ACF]/30",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="w-full">{renderJobsGrid()}</div>
        </div>
      </div>

      {detailJob && (
        <JobDetailModal
          isOpen={Boolean(detailJob)}
          job={{
            id: detailJob.job_details.id,
            title: detailJob.job_details.title,
            description: detailJob.job_details.description,
            status: detailJob.job_details.status as any,
            minimum_education: detailJob.job_details.minimum_education,
            job_category: detailJob.job_details.job_category as any,
            characteristics: detailJob.job_details.characteristics ?? undefined,
            workers_required: detailJob.job_details.workers_required,
            salary: detailJob.job_details.salary,
            salary_type: undefined,
            from_date_time: detailJob.job_details.from_date_time,
            to_date_time: detailJob.job_details.to_date_time,
            workers_hired: detailJob.job_details.workers_hired,
          }}
          onClose={() => setDetailJob(null)}
        />
      )}
    </div>
  );
}
