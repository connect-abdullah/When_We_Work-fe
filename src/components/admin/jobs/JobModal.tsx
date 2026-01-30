"use client";

import React, { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { Button, FormInput, FormTextarea } from "@/components/ui";
import {
  JobCategory,
  JobGetSchema,
  JobStatus,
  SalaryType,
  ToneRequirement,
} from "@/lib/api/jobs/schema";
import JobTypeSelect from "./JobTypeSelect";
import JobStatusSelect from "./JobStatusSelect";

interface JobModalProps {
  isOpen: boolean;
  job?: JobGetSchema | null;
  onClose: () => void;
  onSubmit: (jobData: Partial<JobGetSchema>) => void;
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
    tone_requirement: ToneRequirement.professional,
    characteristics: [],
    status: JobStatus.active,
    job_category: undefined,
    workers_required: 0,
    workers_hired: 0,
    salary: 0,
    salary_type: SalaryType.hourly,
  });

  const [characteristicsInput, setCharacteristicsInput] = useState("");

  // Initialize form data when job changes
  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title ?? "",
        description: job.description ?? "",
        minimum_education: job.minimum_education ?? "",
        tone_requirement: job.tone_requirement ?? ToneRequirement.professional,
        characteristics: job.characteristics ?? [],
        status: job.status ?? JobStatus.active,
        job_category: job.job_category,
        workers_required: job.workers_required ?? 0,
        workers_hired: job.workers_hired ?? 0,
        salary: job.salary ?? 0,
        salary_type: job.salary_type ?? SalaryType.hourly,
      });
      setCharacteristicsInput((job.characteristics ?? []).join(", "));
    } else {
      setFormData({
        title: "",
        description: "",
        minimum_education: "",
        tone_requirement: ToneRequirement.professional,
        characteristics: [],
        status: JobStatus.active,
        job_category: undefined,
        workers_required: 0,
        workers_hired: 0,
        salary: 0,
        salary_type: SalaryType.hourly,
      });
      setCharacteristicsInput("");
    }
  }, [job, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = () => {
    const characteristics = characteristicsInput
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    onSubmit({
      ...formData,
      characteristics: characteristics.length > 0 ? characteristics : undefined,
    });
    onClose();
  };

  const isFormValid = () => {
    return (
      (formData.title?.trim() ?? "") !== "" &&
      (formData.description?.trim() ?? "") !== "" &&
      (formData.minimum_education?.trim() ?? "") !== "" &&
      formData.workers_required !== undefined &&
      formData.workers_hired !== undefined &&
      formData.salary !== undefined
    );
  };

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
              Tone
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {[
                ToneRequirement.professional,
                ToneRequirement.friendly,
                ToneRequirement.casual,
                ToneRequirement.formal,
                ToneRequirement.empathic,
              ].map((tone) => (
                <button
                  key={tone}
                  type="button"
                  onClick={() => setFormData({ ...formData, tone_requirement: tone })}
                  className={`px-2 py-1.5 text-[9px] font-medium rounded-lg border-2 transition-all ${
                    formData.tone_requirement === tone
                      ? "border-[#5A6ACF] bg-[#5A6ACF]/10 text-[#5A6ACF]"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tone.charAt(0).toUpperCase() + tone.slice(1)}
                </button>
              ))}
            </div>
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
                status: (value ? (value as JobStatus) : JobStatus.active),
              })
            }
            required
          />

          <div className="grid grid-cols-2 gap-3">
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
              label="Workers Hired"
              name="workers_hired"
              type="number"
              value={formData.workers_hired?.toString() ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  workers_hired: parseInt(e.target.value, 10) || 0,
                })
              }
              placeholder="0"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label="Salary"
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

            <div>
              <label className="block text-[9px] font-medium text-gray-700 mb-1">
                Salary Type
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[SalaryType.hourly, SalaryType.fixed].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, salary_type: type })
                    }
                    className={`px-2 py-1.5 text-[9px] font-medium rounded-lg border-2 transition-all ${
                      formData.salary_type === type
                        ? "border-[#5A6ACF] bg-[#5A6ACF]/10 text-[#5A6ACF]"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {type === SalaryType.hourly ? "Hourly" : "Fixed"}
                  </button>
                ))}
              </div>
            </div>
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
            disabled={!isFormValid()}
            className="text-[9px] px-3 py-1 bg-green-600 hover:bg-green-700"
          >
            <Check size={12} className="mr-1" />
            {isEditMode ? "Update Job" : "Create Job"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
