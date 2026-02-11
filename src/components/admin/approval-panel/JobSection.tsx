"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui";
import type { ApprovalPanelJobGroup } from "@/components/admin/approval-panel/types";
import PersonCard from "@/components/admin/approval-panel/PersonCard";

interface JobSectionProps {
  groups: ApprovalPanelJobGroup[];
  onAccept: (
    job_id: number,
    applicationId: number,
    worker_id: number
  ) => void | Promise<void>;
  onDecline: (
    job_id: number,
    applicationId: number,
    worker_id: number
  ) => void | Promise<void>;
  updatingApplicationId?: number | null;
}

export default function JobSection({
  groups,
  onAccept,
  onDecline,
  updatingApplicationId = null,
}: JobSectionProps) {
  const [expandedJobIds, setExpandedJobIds] = useState<Set<number>>(new Set());

  const toggleJob = (job_id: number) => {
    setExpandedJobIds((prev) => {
      const next = new Set(prev);
      if (next.has(job_id)) {
        next.delete(job_id);
      } else {
        next.add(job_id);
      }
      return next;
    });
  };

  if (groups.length === 0) {
    return (
      <div className="text-center py-8 text-[10px] text-gray-500">
        No jobs found
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 gap-2">
        {groups.map((group) => {
          const isExpanded = expandedJobIds.has(group.job_id);
          const first = group.items[0];
          const workers_required =
            first?.workers_required ?? group.items.length;
          const workers_hired = first?.workers_hired ?? 0;

          return (
            <Card
              key={group.job_id}
              className="border border-gray-100 hover:border-[#5A6ACF]/30 transition-all duration-200"
              padding="md"
            >
              <button
                onClick={() => toggleJob(group.job_id)}
                className="w-full flex items-center justify-between gap-3 text-left group"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-[#1F384C] truncate">
                    {group.job_name}
                  </h3>
                  <span className="text-[11px] text-[#5A6ACF] font-medium px-1.5 py-0.5 bg-[#5A6ACF]/10 rounded shrink-0">
                    ID: {group.job_id}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] font-medium text-[#1F384C]">
                    Workers: {workers_hired}/{workers_required}
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform shrink-0 ${
                    isExpanded ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  {group.items.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {group.items.map((item) => (
                        <PersonCard
                          key={item.id}
                          item={item}
                          onAccept={() =>
                            onAccept(group.job_id, item.id, item.worker_id)
                          }
                          onDecline={() =>
                            onDecline(group.job_id, item.id, item.worker_id)
                          }
                          isUpdating={updatingApplicationId === item.id}
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
