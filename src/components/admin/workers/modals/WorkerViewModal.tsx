"use client";
import React from "react";
import { Award, Briefcase, Mail, MapPin, Phone, Shield, X } from "lucide-react";
import { EmploymentType, UserGetSchema } from "@/lib/api/users/schema";

interface WorkerViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: UserGetSchema | null;
}

const WorkerViewModal: React.FC<WorkerViewModalProps> = ({
  isOpen,
  onClose,
  customer,
}) => {
  if (!isOpen || !customer) {
    return null;
  }

  const getFullName = () => {
    return `${customer.first_name} ${customer.last_name}`.trim();
  };

  const availability = customer.availability ?? true;
  const availabilityBadge = availability
    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
    : "bg-rose-50 text-rose-700 border-rose-100";

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-semibold text-[#1F384C]">
                {getFullName()}
              </h2>
              <span
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${availabilityBadge}`}
              >
                {availability ? "Available" : "Unavailable"}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-medium border bg-blue-50 text-blue-700 border-blue-100">
                {customer.employment_type === EmploymentType.freelancer
                  ? "Freelancer"
                  : customer.employment_type?.replace("_", " ")}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-700">
              {customer.user_role}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                User Role
              </p>
              <p className="text-sm font-bold text-gray-900">
                {customer.user_role}
              </p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                Availability
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {availability ? "Open to Work" : "Not Available"}
              </p>
            </div>
            <div className="p-4 bg-violet-50 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Briefcase size={14} className="text-violet-600" />
                <p className="text-xs text-gray-600 uppercase tracking-wide">
                  Employment
                </p>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {customer.employment_type?.replace("_", " ")}
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Briefcase size={14} className="text-amber-600" />
                <p className="text-xs text-gray-600 uppercase tracking-wide">
                  Roles
                </p>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {(customer.worker_roles?.length ?? 0) > 0
                  ? (customer.worker_roles ?? [])[0]
                  : "Unassigned"}
              </p>
            </div>
          </div>

          {/* Contact information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail size={16} className="text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 mb-0.5">Email</p>
                    <p className="text-sm text-gray-900 truncate">
                      {customer.email}
                    </p>
                  </div>
                </div>
                {customer.phone && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone size={16} className="text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                      <p className="text-sm text-gray-900">{customer.phone}</p>
                    </div>
                  </div>
                )}
                {customer.address && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin size={16} className="text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 mb-0.5">Address</p>
                      <p className="text-sm text-gray-900 leading-relaxed">
                        {customer.address}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 mb-0.5">Gender</p>
                    <p className="text-sm text-gray-900">{customer.gender}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Work Information
              </h3>
              <div className="space-y-3">
                {customer.emergency_contact && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Shield size={16} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">
                        Emergency Contact
                      </p>
                      <p className="text-sm text-gray-900">
                        {customer.emergency_contact}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Award size={16} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">
                      Employment Type
                    </p>
                    <p className="text-sm text-gray-900">
                      {customer.employment_type?.replace("_", " ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Roles */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Assigned Roles
            </h3>
            {(customer.worker_roles?.length ?? 0) > 0 ? (
              <div className="flex flex-wrap gap-2">
                {(customer.worker_roles ?? []).map((role: string) => (
                  <span
                    key={role}
                    className="px-3 py-1.5 bg-[#5A6ACF]/10 text-[#5A6ACF] text-sm font-medium rounded-lg"
                  >
                    {role}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No roles assigned</p>
            )}
          </div>

          {/* Remarks */}
          {customer.remarks && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Remarks
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl">
                {customer.remarks}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerViewModal;
