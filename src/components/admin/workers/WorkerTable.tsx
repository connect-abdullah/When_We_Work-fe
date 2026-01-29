"use client";
import React from "react";
import { Edit, Eye, Star, Trash2 } from "lucide-react";
import { Worker } from "@/components/admin/workers/WorkerPage";

interface WorkerTableProps {
  customers: Worker[];
  onView: (customer: Worker) => void;
  onEdit: (customer: Worker) => void;
  onDelete: (customer: Worker) => void;
  formatDate: (dateString: string) => string;
}

const WorkerTable: React.FC<WorkerTableProps> = ({
  customers,
  onView,
  onEdit,
  onDelete,
  formatDate,
}) => {
  if (customers.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-sm text-gray-400">No workers found</p>
      </div>
    );
  }

  const getFullName = (worker: Worker) => {
    return `${worker.first_name}${worker.middle_name ? ` ${worker.middle_name}` : ""} ${worker.last_name}`;
  };

  return (
    <div className="space-y-2">
      {customers?.map((customer) => (
        <div
          key={customer?.id}
          className="bg-white border border-gray-100 rounded-lg hover:shadow-md hover:bg-gray-50 cursor-pointer transition-shadow duration-150 shadow-sm py-2 px-4 space-y-4"
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-5 ">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-gray-500">
                Full Name
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {getFullName(customer)}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                  customer.is_available
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-gray-100 text-gray-600 border-gray-200"
                }`}
              >
                {customer.is_available ? "Available" : "Unavailable"}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                  customer.is_freelancer
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-purple-50 text-purple-700 border-purple-200"
                }`}
              >
                {customer.is_freelancer ? "Freelancer" : "Full-time"}
              </span>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-50 border border-yellow-200">
                <Star size={12} className="text-yellow-500" />
                <span className="text-[10px] font-semibold text-gray-800">
                  {customer?.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-5 gap-5 items-start">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wide text-gray-400">
                Contact Info
              </p>
              <p className="text-[10px] text-gray-600">
                Email: {customer.email}
              </p>
              <p className="text-[10px] text-gray-600">
                Phone: {customer.phone || "—"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wide text-gray-400">
                Address
              </p>
              <p className="text-[10px] text-gray-600 leading-relaxed">
                {customer.address || "—"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wide text-gray-400">
                Date Joined
              </p>
              <p className="text-[10px] text-gray-600">
                {formatDate(customer.date_joined)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wide text-gray-400">
                Emergency Contact
              </p>
              <p className="text-[10px] text-gray-600">
                {customer.emergency_contact || "—"}
              </p>
            </div>
            {/* Actions */}
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => onView(customer)}
                className="inline-flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-[#1F384C] border border-gray-200 hover:border-[#1F384C] rounded-lg px-3 py-1.5 transition-colors"
              >
                <Eye size={12} />
              </button>
              <button
                onClick={() => onEdit(customer)}
                className="inline-flex items-center gap-1 text-xs font-medium text-[#1D9A6C] border border-[#1D9A6C]/20 bg-[#E6FBF1] rounded-lg px-3 py-1.5 hover:border-[#1D9A6C]/40 transition-colors"
              >
                <Edit size={12} />
              </button>
              <button
                onClick={() => onDelete(customer)}
                className="inline-flex items-center gap-1 text-xs font-medium text-[#E54D2E] border border-[#E54D2E]/20 bg-[#FFE9E3] rounded-lg px-3 py-1.5 hover:border-[#E54D2E]/40 transition-colors"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkerTable;
