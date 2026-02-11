"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, PageHeader, Button } from "@/components/ui";
import { getWorkerRevenue } from "@/lib/api/job-applications";
import type {
  PaymentStatus,
  WorkerRevenueJobItem,
} from "@/lib/api/job-applications/schema";
import { Calendar, Download, DollarSign } from "lucide-react";

const formatDateTime = (iso: string) => {
  try {
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

const getStatusClasses = (status: PaymentStatus) => {
  switch (status) {
    case "paid":
      return {
        badge: "bg-emerald-50 text-emerald-700 border border-emerald-100",
        dot: "bg-emerald-500",
        label: "Paid",
      };
    case "rejected":
      return {
        badge: "bg-red-50 text-red-700 border border-red-100",
        dot: "bg-red-500",
        label: "Rejected",
      };
    case "pending":
    default:
      return {
        badge: "bg-yellow-50 text-yellow-700 border border-yellow-100",
        dot: "bg-yellow-400",
        label: "Pending",
      };
  }
};

export default function WorkerRevenuePage() {
  const [allJobs, setAllJobs] = useState<WorkerRevenueJobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRevenue = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getWorkerRevenue();
      if (res?.success && Array.isArray(res.data)) {
        setAllJobs(res.data);
      } else {
        setAllJobs([]);
        setError(res?.message || "Failed to load revenue");
      }
    } catch {
      setAllJobs([]);
      setError("Failed to load revenue");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRevenue();
  }, [fetchRevenue]);

  const totalAmount = useMemo(
    () =>
      allJobs.reduce(
        (sum, job) =>
          job.payment_status === "paid" ? sum + (job.salary ?? 0) : sum,
        0
      ),
    [allJobs]
  );

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };
  return (
    <div className="flex flex-col w-full h-full pt-4 px-2 sm:px-4 overflow-y-auto">
      <PageHeader
        title="Revenue"
        description="View your earnings from completed and approved jobs"
      />

      <div className="px-2 sm:px-4 mt-4 mb-6 space-y-4">
        {/* Summary + actions */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)] gap-4">
          <Card className="p-5 flex items-center justify-between bg-white shadow-md">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Total Earnings (PAID)
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <DollarSign className="w-5 h-5 text-[#5A6ACF]" />
                <p className="text-3xl font-semibold text-[#1F384C]">
                  {totalAmount.toLocaleString()}
                </p>
              </div>
              <p className="mt-2 text-[11px] text-gray-500">
                Across {allJobs.length} job{allJobs.length === 1 ? "" : "s"}
              </p>
            </div>
          </Card>

          <Card className="p-4 flex flex-col justify-between bg-white shadow-md">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-2">Actions</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchRevenue}
                disabled={loading}
              >
                {loading ? "Refreshing..." : "Refresh"}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handlePrint}
                className="flex items-center gap-2"
              >
                <Download size={14} />
                <span>Print</span>
              </Button>
            </div>
          </Card>
        </div>

        {/* Jobs table */}
        {loading ? (
          <Card className="p-8 text-center bg-white shadow-sm">
            <p className="text-sm text-gray-600">Loading revenue...</p>
          </Card>
        ) : error ? (
          <Card className="p-8 text-center bg-white shadow-sm">
            <p className="text-sm text-red-600">{error}</p>
          </Card>
        ) : allJobs.length === 0 ? (
          <Card className="p-8 text-center bg-white shadow-sm">
            <p className="text-sm text-gray-600">
              No revenue data available yet.
            </p>
          </Card>
        ) : (
          <Card className="p-0 overflow-hidden bg-white shadow-sm">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-[#1F384C]">
                  Job revenue breakdown
                </h3>
                <p className="text-xs text-gray-500">
                  Detailed view of each job contributing to your earnings
                </p>
              </div>
            </div>
            <div className="min-w-full overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 font-medium text-gray-700">
                      Job Name
                    </th>
                    <th className="px-4 py-3 font-medium text-gray-700 text-right">
                      Salary
                    </th>
                    <th className="px-4 py-3 font-medium text-gray-700">
                      From
                    </th>
                    <th className="px-4 py-3 font-medium text-gray-700">To</th>
                    <th className="px-4 py-3 font-medium text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allJobs.map((job) => (
                    <tr
                      key={`${job.job_id}-${job.from_date_time}`}
                      className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-800 text-sm">
                        {job.job_name}
                      </td>
                      <td className="px-4 py-3 text-gray-800 text-sm text-right">
                        {job.salary.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-xs">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} className="text-gray-400" />
                          {formatDateTime(job.from_date_time)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-xs">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} className="text-gray-400" />
                          {formatDateTime(job.to_date_time)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-800 text-sm">
                        {(() => {
                          const { badge, dot, label } = getStatusClasses(
                            job.payment_status
                          );
                          return (
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${badge}`}
                            >
                              <span
                                className={`h-2.5 w-2.5 rounded-full ${dot}`}
                              />
                              {label}
                            </span>
                          );
                        })()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
