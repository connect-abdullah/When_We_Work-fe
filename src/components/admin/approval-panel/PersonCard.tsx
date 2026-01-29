"use client";
import React from "react";
import { Button } from "@/components/ui";
import { Worker } from "@/components/admin/approval-panel/types";
import { Check, X } from "lucide-react";
import Image from "next/image";

interface PersonCardProps {
  person: Worker;
  onAccept: (personId: number) => void;
  onDecline: (personId: number) => void;
}

export default function PersonCard({
  person,
  onAccept,
  onDecline,
}: PersonCardProps) {
  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (status: Worker["availabilityStatus"]) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-700 border-green-200";
      case "unavailable":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusText = (status: Worker["availabilityStatus"]) => {
    switch (status) {
      case "available":
        return "Available";
      case "unavailable":
        return "Unavailable";
      case "pending":
        return "Pending";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-white hover:shadow-lg transition-all duration-200 group shadow-sm">
      <div className="space-y-3">
        {/* Header Section with Avatar and Info */}
        <div className="flex items-start gap-3">
          {/* Person Image/Avatar */}
          <div className="shrink-0">
            {person.image ? (
              <Image
                width={48}
                height={48}
                src={person.image}
                alt={person.name}
                className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-gray-100"
                priority
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-[#5A6ACF] to-[#4A5ABF] text-white rounded-full flex items-center justify-center font-semibold text-[11px] shadow-sm ring-2 ring-gray-100">
                {getInitials(person.name)}
              </div>
            )}
          </div>

          {/* Person Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[11px] font-semibold text-[#1F384C] truncate leading-tight">
              {person.name}
            </h3>
            <p className="text-[10px] text-[#5A6ACF] font-medium mt-1 truncate">
              {person.profession}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="pt-2 border-t border-gray-100">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-[9px] font-medium border ${getStatusColor(
              person.availabilityStatus
            )}`}
          >
            {getStatusText(person.availabilityStatus)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-1">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onAccept(person.id)}
            className="flex-1 h-8 cursor-pointer"
          >
            <Check size={12} />
            <span className="text-[10px] font-medium">Accept</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDecline(person.id)}
            className="flex-1 h-8 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 cursor-pointer"
          >
            <X size={12} />
            <span className="text-[10px] font-medium">Decline</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
