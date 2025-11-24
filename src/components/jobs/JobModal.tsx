"use client";

import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { Button, FormInput, FormTextarea } from "@/components/ui";
import { JobSchema } from "@/types";

interface JobModalProps {
  isOpen: boolean;
  job?: JobSchema | null;
  onClose: () => void;
  onSubmit: (jobData: Partial<JobSchema>) => void;
}

const JobModal: React.FC<JobModalProps> = ({
  isOpen,
  job,
  onClose,
  onSubmit,
}) => {
  const isEditMode = !!job;

  const [formData, setFormData] = useState<Partial<JobSchema>>({
    job_name: "",
    description: "",
    email: "",
    phone: "",
    minimum_education: "",
    tone: "professional",
    characteristics: [],
    status: "active",
    joinDate: "",
    people_needed: 0,
    people_hired: 0,
    salary: 0,
    salary_type: "per_hour",
    languages: [],
  });

  const [characteristicsInput, setCharacteristicsInput] = useState("");
  const [languagesInput, setLanguagesInput] = useState("");

  // Initialize form data when job changes
  useEffect(() => {
    if (job) {
      setFormData({
        job_name: job.job_name,
        description: job.description,
        email: job.email,
        phone: job.phone || "",
        minimum_education: job.minimum_education,
        tone: job.tone,
        characteristics: job.characteristics,
        status: job.status,
        joinDate: job.joinDate || "",
        people_needed: job.people_needed,
        people_hired: job.people_hired,
        salary: job.salary,
        salary_type: job.salary_type,
        languages: job.languages || [],
      });
      setCharacteristicsInput(job.characteristics.join(", "));
      setLanguagesInput((job.languages || []).join(", "));
    } else {
      // Reset to defaults for create mode
      setFormData({
        job_name: "",
        description: "",
        email: "",
        phone: "",
        minimum_education: "",
        tone: "professional",
        characteristics: [],
        status: "active",
        joinDate: "",
        people_needed: 0,
        people_hired: 0,
        salary: 0,
        salary_type: "per_hour",
        languages: [],
      });
      setCharacteristicsInput("");
      setLanguagesInput("");
    }
  }, [job, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    const characteristics = characteristicsInput
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);
    const languages = languagesInput
      .split(",")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    onSubmit({
      ...formData,
      characteristics,
      languages: languages.length > 0 ? languages : undefined,
    });
    onClose();
  };

  const isFormValid = () => {
    return (
      formData.job_name?.trim() !== "" &&
      formData.description?.trim() !== "" &&
      formData.email?.trim() !== "" &&
      formData.minimum_education?.trim() !== "" &&
      formData.people_needed !== undefined &&
      formData.people_hired !== undefined &&
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
            label="Job Name"
            name="job_name"
            type="text"
            value={formData.job_name || ""}
            onChange={(e) =>
              setFormData({ ...formData, job_name: e.target.value })
            }
            placeholder="Enter job name"
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
              label="Email"
              name="email"
              type="email"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="job@whenwework.com"
              required
            />

            <FormInput
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="+1 (555) 123-4567"
            />
          </div>

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

          <div>
            <label className="block text-[9px] font-medium text-gray-700 mb-1">
              Tone
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {(
                [
                  "professional",
                  "friendly",
                  "casual",
                  "formal",
                  "empathetic",
                ] as const
              ).map((tone) => (
                <button
                  key={tone}
                  type="button"
                  onClick={() => setFormData({ ...formData, tone })}
                  className={`px-2 py-1.5 text-[9px] font-medium rounded-lg border-2 transition-all ${
                    formData.tone === tone
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

          <div>
            <label className="block text-[9px] font-medium text-gray-700 mb-1">
              Status
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(["active", "inactive", "on-leave"] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFormData({ ...formData, status })}
                  className={`px-2 py-1.5 text-[9px] font-medium rounded-lg border-2 transition-all ${
                    formData.status === status
                      ? "border-[#5A6ACF] bg-[#5A6ACF]/10 text-[#5A6ACF]"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {status === "on-leave"
                    ? "On Leave"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label="People Needed"
              name="people_needed"
              type="number"
              value={formData.people_needed?.toString() || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  people_needed: parseInt(e.target.value) || 0,
                })
              }
              placeholder="0"
              required
            />

            <FormInput
              label="People Hired"
              name="people_hired"
              type="number"
              value={formData.people_hired?.toString() || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  people_hired: parseInt(e.target.value) || 0,
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
              value={formData.salary?.toString() || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  salary: parseInt(e.target.value) || 0,
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
                {(["per_hour", "fixed"] as const).map((type) => (
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
                    {type === "per_hour" ? "Per Hour" : "Fixed"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[9px] font-medium text-gray-700 mb-1">
              Languages (comma-separated)
            </label>
            <input
              type="text"
              value={languagesInput}
              onChange={(e) => setLanguagesInput(e.target.value)}
              placeholder="English, Spanish, French"
              className="w-full px-2 py-1.5 text-[9px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A6ACF]"
            />
          </div>

          <FormInput
            label="Join Date (optional)"
            name="joinDate"
            type="date"
            value={formData.joinDate || ""}
            onChange={(e) =>
              setFormData({ ...formData, joinDate: e.target.value })
            }
          />
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
