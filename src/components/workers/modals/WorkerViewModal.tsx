"use client";
import React from "react";
import {
  X,
  Star,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Shield,
  Award,
} from "lucide-react";
import { Worker } from "../WorkerPage";

interface WorkerViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Worker | null;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const WorkerViewModal: React.FC<WorkerViewModalProps> = ({
  isOpen,
  onClose,
  customer,
}) => {
  if (!isOpen || !customer) return null;

  const getFullName = () => {
    return `${customer.first_name}${customer.middle_name ? ` ${customer.middle_name}` : ""} ${customer.last_name}`;
  };

  const availabilityBadge = customer.is_available
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
                {customer.is_available ? "Available" : "Unavailable"}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-medium border bg-blue-50 text-blue-700 border-blue-100">
                {customer.is_freelancer ? "Freelancer" : "Full-time"}
              </span>
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Star size={14} className="text-yellow-500" />
              <span className="font-medium text-gray-700">
                {customer.rating.toFixed(1)} / 5.0
              </span>
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
          {/* Key metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                Rating
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {customer.rating.toFixed(1)}
              </p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                Availability
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {customer.is_available ? "Open to Work" : "Not Available"}
              </p>
            </div>
            <div className="p-4 bg-violet-50 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Calendar size={14} className="text-violet-600" />
                <p className="text-xs text-gray-600 uppercase tracking-wide">
                  Joined
                </p>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {formatDate(customer.date_joined)}
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
                {customer.roles.length > 0 ? customer.roles[0] : "Unassigned"}
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
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Work Information
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-0.5">Performance</p>
                  <p className="text-xl font-bold text-gray-900">
                    {customer.rating.toFixed(1)} / 5.0
                  </p>
                </div>
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
                      {customer.is_freelancer ? "Freelancer" : "Full-time"}
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
            {customer.roles && customer.roles.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {customer.roles.map((role) => (
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
