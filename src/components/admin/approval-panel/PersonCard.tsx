"use client";

import React from "react";
import { Button } from "@/components/ui";
import type { ApprovalPanelItem } from "@/lib/api/job-applications/schema";
import { Check, X } from "lucide-react";

interface PersonCardProps {
  item: ApprovalPanelItem;
  onAccept: () => void | Promise<void>;
  onDecline: () => void | Promise<void>;
  isUpdating?: boolean;
}

function getStatusColor(
  availability: boolean,
  approved_status?: ApprovalPanelItem["approved_status"],
) {
  if (approved_status === "approved") {
    return "bg-green-100 text-green-700 border-green-200";
  }
  if (approved_status === "rejected") {
    return "bg-red-100 text-red-700 border-red-200";
  }
  return availability
    ? "bg-green-100 text-green-700 border-green-200"
    : "bg-gray-100 text-gray-700 border-gray-200";
}

function getStatusText(
  availability: boolean,
  approved_status?: ApprovalPanelItem["approved_status"],
) {
  if (approved_status === "approved") {
    return "Accepted";
  }
  if (approved_status === "rejected") {
    return "Rejected";
  }
  return availability ? "Available" : "Unavailable";
}

export default function PersonCard({
  item,
  onAccept,
  onDecline,
  isUpdating = false,
}: PersonCardProps) {
  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const isDecided =
    item.approved_status === "approved" || item.approved_status === "rejected";
  const showActions = !isDecided && !isUpdating;

  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-white hover:shadow-lg transition-all duration-200 group shadow-sm">
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="shrink-0">
            <div className="w-12 h-12 bg-linear-to-br from-[#5A6ACF] to-[#4A5ABF] text-white rounded-full flex items-center justify-center font-semibold text-[11px] shadow-sm ring-2 ring-gray-100">
              {getInitials(item.worker_name)}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[11px] font-semibold text-[#1F384C] truncate leading-tight">
              {item.worker_name}
            </h3>
            <p className="text-[10px] text-[#5A6ACF] font-medium mt-1 truncate">
              {item.employment_type ?? "—"}
            </p>
            <p className="text-[9px] text-gray-500 mt-0.5 truncate">
              {item.worker_email}
            </p>
            {item.gender && (
              <p className="text-[9px] text-gray-500 mt-0.5 capitalize">
                {item.gender}
              </p>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-[9px] font-medium border ${getStatusColor(
              item.availability,
              item.approved_status,
            )}`}
          >
            {getStatusText(item.availability, item.approved_status)}
          </span>
        </div>

        <div className="flex gap-2 pt-1">
          {showActions ? (
            <>
              <Button
                variant="primary"
                size="sm"
                onClick={onAccept}
                className="flex-1 h-8 cursor-pointer"
              >
                <Check size={12} />
                <span className="text-[10px] font-medium">Accept</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onDecline}
                className="flex-1 h-8 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 cursor-pointer"
              >
                <X size={12} />
                <span className="text-[10px] font-medium">Decline</span>
              </Button>
            </>
          ) : isUpdating ? (
            <p className="text-[10px] text-gray-500 py-1">Updating...</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
