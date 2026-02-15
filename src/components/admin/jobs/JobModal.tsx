"use client";

import React, { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { Button, FormInput, FormTextarea } from "@/components/ui";
import {
  JobCategory,
  JobGetSchema,
  JobStatus,
  SalaryType,
} from "@/lib/api/jobs/schema";
import JobTypeSelect from "./JobTypeSelect";
import JobStatusSelect from "./JobStatusSelect";

interface JobModalProps {
  isOpen: boolean;
  job?: JobGetSchema | null;
  onClose: () => void;
  onSubmit: (jobData: Partial<JobGetSchema>) => void | Promise<void>;
}

const JobModal: React.FC<JobModalProps> = ({
  isOpen,
  job,
  onClose,
  onSubmit,
}) => {
  const isEditMode = Boolean(job);

  const [formData, setFormData] = useState<Partial<JobGetSchema>>({
    title: "",
    description: "",
    minimum_education: "",
    characteristics: [],
    status: JobStatus.active,
    job_category: undefined,
    workers_required: 0,
    salary: 0,
    salary_type: SalaryType.fixed,
    from_date_time: "",
    to_date_time: "",
  });

  const [characteristicsInput, setCharacteristicsInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data when job changes
  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title ?? "",
        description: job.description ?? "",
        minimum_education: job.minimum_education ?? "",
        characteristics: job.characteristics ?? [],
        status: job.status ?? JobStatus.active,
        job_category: job.job_category,
        workers_required: job.workers_required ?? 0,
        salary: job.salary ?? 0,
        salary_type: job.salary_type ?? SalaryType.fixed,
        from_date_time: job.from_date_time
          ? new Date(job.from_date_time).toISOString().slice(0, 16)
          : "",
        to_date_time: job.to_date_time
          ? new Date(job.to_date_time).toISOString().slice(0, 16)
          : "",
      });
      setCharacteristicsInput((job.characteristics ?? []).join(", "));
    } else {
      setFormData({
        title: "",
        description: "",
        minimum_education: "",
        characteristics: [],
        status: JobStatus.active,
        job_category: undefined,
        workers_required: 0,
        salary: 0,
        salary_type: SalaryType.fixed,
      });
      setCharacteristicsInput("");
    }
  }, [job, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async () => {
    const characteristics = characteristicsInput
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);
    const payload: Partial<JobGetSchema> = {
      ...formData,
      characteristics: characteristics.length > 0 ? characteristics : undefined,
    };
    setIsSubmitting(true);
    try {
      await onSubmit(payload);
      // Parent closes modal on success via handleCloseModal
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      (formData.title?.trim() ?? "") !== "" &&
      (formData.description?.trim() ?? "") !== "" &&
      (formData.minimum_education?.trim() ?? "") !== "" &&
      formData.workers_required !== undefined &&
      formData.salary !== undefined &&
      (formData.from_date_time?.trim() ?? "") !== "" &&
      (formData.to_date_time?.trim() ?? "") !== ""
    );
  };

  const _toISO = (local: string) =>
    local ? new Date(local).toISOString() : "";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b border-gray-200">
          <h2 className="text-sm font-bold text-gray-900">
            {isEditMode ? "Edit Job" : "Create New Job"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <FormInput
            label="Title"
            name="title"
            type="text"
            value={formData.title || ""}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Enter title for the job"
            required
          />

          <FormTextarea
            label="Description"
            name="description"
            value={formData.description || ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Job description"
            rows={3}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label="Minimum Education"
              name="minimum_education"
              type="text"
              value={formData.minimum_education || ""}
              onChange={(e) =>
                setFormData({ ...formData, minimum_education: e.target.value })
              }
              placeholder="e.g., High School Diploma, BA, MBA"
              required
            />

            <JobTypeSelect
              value={formData.job_category ?? ""}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  job_category: value ? (value as JobCategory) : undefined,
                })
              }
            />
          </div>

          <div>
            <label className="block text-[9px] font-medium text-gray-700 mb-1">
              Characteristics (comma-separated)
            </label>
            <input
              type="text"
              value={characteristicsInput}
              onChange={(e) => setCharacteristicsInput(e.target.value)}
              placeholder="Patient, Detail-oriented, Problem-solver"
              className="w-full px-2 py-1.5 text-[9px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A6ACF]"
            />
          </div>

          <JobStatusSelect
            value={formData.status ?? ""}
            onChange={(value) =>
              setFormData({
                ...formData,
                status: value ? (value as JobStatus) : JobStatus.active,
              })
            }
            required
          />

          <FormInput
            label="Workers Needed"
            name="workers_required"
            type="number"
            value={formData.workers_required?.toString() ?? ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                workers_required: parseInt(e.target.value, 10) || 0,
              })
            }
            placeholder="0"
            required
          />

          <FormInput
            label="Salary (fixed)"
            name="salary"
            type="number"
            value={formData.salary?.toString() ?? ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                salary: parseInt(e.target.value, 10) || 0,
              })
            }
            placeholder="0"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label="From (date & time)"
              name="from_date_time"
              type="datetime-local"
              value={formData.from_date_time ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  from_date_time: e.target.value,
                })
              }
              required
            />
            <FormInput
              label="To (date & time)"
              name="to_date_time"
              type="datetime-local"
              value={formData.to_date_time ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  to_date_time: e.target.value,
                })
              }
              required
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-2 p-3 border-t border-gray-200 bg-gray-50">
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            className="text-[9px] px-3 py-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            disabled={!isFormValid() || isSubmitting}
            className="text-[9px] px-3 py-1 bg-green-600 hover:bg-green-700"
          >
            <Check size={12} className="mr-1" />
            {isSubmitting
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
                ? "Update Job"
                : "Create Job"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
