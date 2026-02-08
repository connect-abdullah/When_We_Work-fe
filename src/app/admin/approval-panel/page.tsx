"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, PageHeader, SearchInput } from "@/components/ui";
import { JobSection } from "@/components/admin/approval-panel";
import {
  getApprovalPanel,
  updateApprovalPanelStatus,
} from "@/lib/api/job-applications";
import { JobApplicationStatus, ApprovalPanelItem } from "@/lib/api/job-applications/schema";
import type { ApprovalPanelJobGroup } from "@/components/admin/approval-panel/types";

function groupByJob(items: ApprovalPanelItem[]): ApprovalPanelJobGroup[] {
  const byJob = new Map<number, { job_name: string; items: ApprovalPanelItem[] }>();
  for (const item of items) {
    const existing = byJob.get(item.job_id);
    if (existing) {
      existing.items.push(item);
    } else {
      byJob.set(item.job_id, {
        job_name: item.job_name,
        items: [item],
      });
    }
  }
  return Array.from(byJob.entries())
    .map(([job_id, { job_name, items }]) => ({ job_id, job_name, items }))
    .sort((a, b) => a.job_id - b.job_id);
}

export default function ApprovalPanelPage() {
  const [groups, setGroups] = useState<ApprovalPanelJobGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  const fetchApprovalPanel = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getApprovalPanel();
      const list = res?.data ?? [];
      setGroups(groupByJob(list));
    } catch {
      setGroups([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApprovalPanel();
  }, [fetchApprovalPanel]);

  const filteredGroups = useMemo(() => {
    if (!searchTerm.trim()) {
      return groups;
    }
    const searchLower = searchTerm.toLowerCase().trim();
    return groups.filter(
      (g) =>
        g.job_name.toLowerCase().includes(searchLower) ||
        String(g.job_id).includes(searchTerm),
    );
  }, [groups, searchTerm]);

  const handleStatusChange = useCallback(
    async (
      jobId: number,
      applicationId: number,
      workerId: number,
      isApproved: boolean,
    ) => {
      setUpdating(applicationId);
      try {
        await updateApprovalPanelStatus({
          id: applicationId,
          job_id: jobId,
          worker_id: workerId,
          approved_status: isApproved
            ? JobApplicationStatus.approved
            : JobApplicationStatus.rejected,
        });
        await fetchApprovalPanel();
      } catch {
        // Error handled by API / could toast
      } finally {
        setUpdating(null);
      }
    },
    [fetchApprovalPanel],
  );

  const handleAccept = useCallback(
    (jobId: number, applicationId: number, workerId: number) =>
      handleStatusChange(jobId, applicationId, workerId, true),
    [handleStatusChange],
  );

  const handleDecline = useCallback(
    (jobId: number, applicationId: number, workerId: number) =>
      handleStatusChange(jobId, applicationId, workerId, false),
    [handleStatusChange],
  );

  return (
    <div className="flex flex-col w-full h-full pt-4 px-2 sm:px-4 overflow-y-auto">
      <PageHeader
        title="Approval Panel"
        description="Review and manage job applications"
      />

      <div className="px-2 sm:px-4 pb-8 mt-4 space-y-3">
        <Card className="bg-white border border-gray-100" padding="sm">
          <SearchInput
            placeholder="Search jobs by name or ID..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </Card>

        {loading ? (
          <div className="text-center py-8 text-sm text-gray-500">
            Loading...
          </div>
        ) : (
          <JobSection
            groups={filteredGroups}
            onAccept={handleAccept}
            onDecline={handleDecline}
            updatingApplicationId={updating}
          />
        )}
      </div>
    </div>
  );
}
