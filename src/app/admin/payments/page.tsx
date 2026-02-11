"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, PageHeader, Button } from "@/components/ui";
import {
  getAdminRevenue,
  updateAdminRevenueStatus,
} from "@/lib/api/job-applications";
import type {
  AdminRevenueJobItem,
  PaymentStatus,
} from "@/lib/api/job-applications/schema";
import { Calendar, DollarSign, ChevronDown } from "lucide-react";

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

const PAYMENT_STATUS_OPTIONS: { value: PaymentStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
  { value: "rejected", label: "Rejected" },
];

const getStatusClasses = (status: PaymentStatus) => {
  switch (status) {
    case "paid":
      return {
        badge: "bg-emerald-50 text-emerald-700 border border-emerald-100",
        dot: "bg-emerald-500",
      };
    case "rejected":
      return {
        badge: "bg-red-50 text-red-700 border border-red-100",
        dot: "bg-red-500",
      };
    case "pending":
    default:
      return {
        badge: "bg-yellow-50 text-yellow-700 border border-yellow-100",
        dot: "bg-yellow-400",
      };
  }
};

export default function AdminPaymentsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<AdminRevenueJobItem[]>([]);
  const [updatingIndex, setUpdatingIndex] = useState<number | null>(null);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAdminRevenue();
      if (res?.success && Array.isArray(res.data)) {
        setRows(res.data);
      } else {
        setRows([]);
        setError(res?.message || "Failed to load payments");
      }
    } catch {
      setRows([]);
      setError("Failed to load payments");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const pendingTotal = useMemo(
    () =>
      rows.reduce(
        (sum, job) =>
          job.payment_status === "pending" ? sum + (job.salary ?? 0) : sum,
        0
      ),
    [rows]
  );

  const handleStatusChange = async (
    index: number,
    status: PaymentStatus,
    job: AdminRevenueJobItem
  ) => {
    // Optimistically update UI
    setRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], payment_status: status };
      return next;
    });

    setUpdatingIndex(index);
    try {
      if (!job.worker_id) {
        setError("Worker ID is missing. Cannot update status.");
        setUpdatingIndex(null);
        // Revert optimistic update
        setRows((prev) => {
          const next = [...prev];
          next[index] = { ...next[index], payment_status: job.payment_status };
          return next;
        });
        return;
      }

      const response = await updateAdminRevenueStatus({
        job_id: job.job_id,
        worker_id: job.worker_id,
        payment_status: status,
      });

      if (!response?.success) {
        // Revert on error
        setRows((prev) => {
          const next = [...prev];
          next[index] = { ...next[index], payment_status: job.payment_status };
          return next;
        });
        setError(response?.message || "Failed to update payment status");
      }
    } catch (err) {
      // Revert on error
      setRows((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], payment_status: job.payment_status };
        return next;
      });
      setError("Failed to update payment status. Please try again.");
    } finally {
      setUpdatingIndex(null);
    }
  };

  return (
    <div className="flex flex-col w-full h-full pt-4 px-2 sm:px-4 overflow-y-auto">
      <PageHeader
        title="Payments"
        description="Manage and review worker payments for completed jobs"
      />

      <div className="px-2 sm:px-4 mt-4 mb-6 space-y-4">
        {/* Summary + actions */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)] gap-4">
          <Card className="p-5 flex items-center justify-between bg-white shadow-md">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Pending Payments
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <DollarSign className="w-5 h-5 text-[#5A6ACF]" />
                <p className="text-3xl font-semibold text-[#1F384C]">
                  {pendingTotal.toLocaleString()}
                </p>
              </div>
              <p className="mt-2 text-[11px] text-gray-500">
                Across {rows.length} job{rows.length === 1 ? "" : "s"}
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
                onClick={fetchPayments}
                disabled={loading}
              >
                {loading ? "Refreshing..." : "Refresh"}
              </Button>
            </div>
          </Card>
        </div>

        {/* Payments table */}
        {loading ? (
          <Card className="p-8 text-center bg-white shadow-sm">
            <p className="text-sm text-gray-600">Loading payments...</p>
          </Card>
        ) : error ? (
          <Card className="p-8 text-center bg-white shadow-sm">
            <p className="text-sm text-red-600">{error}</p>
          </Card>
        ) : rows.length === 0 ? (
          <Card className="p-8 text-center bg-white shadow-sm">
            <p className="text-sm text-gray-600">
              No payment records available yet.
            </p>
          </Card>
        ) : (
          <Card className="p-0 overflow-hidden bg-white shadow-sm">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-[#1F384C]">
                  Pending payments by job
                </h3>
                <p className="text-xs text-gray-500">
                  Update payment status for each job as invoices are processed
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
                    <th className="px-4 py-3 font-medium text-gray-700">
                      Worker
                    </th>
                    <th className="px-4 py-3 font-medium text-gray-700">
                      Worker Email
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
                  {rows.map((job, index) => (
                    <tr
                      key={`${job.job_id}-${job.worker_id ?? "no-worker"}-${job.from_date_time}`}
                      className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-800 text-sm">
                        {job.job_name}
                      </td>
                      <td className="px-4 py-3 text-gray-800 text-sm">
                        {job.worker_name || "-"}
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-xs">
                        {job.worker_email || "-"}
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
                          const { badge, dot } = getStatusClasses(
                            job.payment_status
                          );
                          const currentLabel =
                            PAYMENT_STATUS_OPTIONS.find(
                              (o) => o.value === job.payment_status
                            )?.label || job.payment_status;

                          return (
                            <div className="inline-flex relative">
                              {/* Visible colored pill that looks like a status dropdown */}
                              <div
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium border cursor-pointer ${
                                  badge
                                } ${
                                  updatingIndex === index
                                    ? "opacity-60 cursor-not-allowed"
                                    : "hover:shadow-sm"
                                }`}
                              >
                                <span
                                  className={`h-2.5 w-2.5 rounded-full ${dot}`}
                                />
                                <span>{currentLabel}</span>
                                <ChevronDown
                                  size={12}
                                  className="ml-1 text-current opacity-70"
                                />
                              </div>

                              {/* Actual native select overlayed, invisible but clickable */}
                              <select
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                value={job.payment_status}
                                disabled={updatingIndex === index}
                                onChange={(e) =>
                                  handleStatusChange(
                                    index,
                                    e.target.value as PaymentStatus,
                                    job
                                  )
                                }
                              >
                                {PAYMENT_STATUS_OPTIONS.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            </div>
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
