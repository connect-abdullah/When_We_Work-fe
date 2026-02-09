"use client";
import React, { useEffect, useState } from "react";
import { Button, FormInput, FormSelect, Modal } from "@/components/ui";
import SearchableMultiSelect from "@/components/ui/SearchableMultiSelect";
import {
  EmploymentType,
  Gender,
  UserGetSchema,
  UserRoleEnum,
  UserUpdate,
} from "@/lib/api/users/schema";
import { ROLE_OPTIONS } from "@/constants/workers";

interface WorkerEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: UserGetSchema | null;
  isEditMode: boolean;
  onSave?: (workerData: Partial<UserUpdate>) => void | Promise<void>;
}

const GENDER_OPTIONS: { value: Gender | ""; label: string }[] = [
  { value: "", label: "Select gender" },
  { value: Gender.male, label: "Male" },
  { value: Gender.female, label: "Female" },
  { value: Gender.other, label: "Other" },
];

const EMPLOYMENT_OPTIONS: { value: EmploymentType; label: string }[] = [
  { value: EmploymentType.full_time, label: "Full-time" },
  { value: EmploymentType.part_time, label: "Part-time" },
  { value: EmploymentType.contract, label: "Contract" },
  { value: EmploymentType.freelancer, label: "Freelancer" },
];

// user_role: always "worker" by default, no dropdown in UI

const WorkerEditModal: React.FC<WorkerEditModalProps> = ({
  isOpen,
  onClose,
  customer,
  isEditMode,
  onSave,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<UserUpdate>>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: null,
    gender: Gender.male,
    availability: true,
    employment_type: EmploymentType.full_time,
    user_role: UserRoleEnum.worker,
    emergency_contact: null,
    worker_roles: [],
    remarks: null,
  });

  useEffect(() => {
    if (customer && isEditMode) {
      setFormData({
        first_name: customer.first_name || "",
        last_name: customer.last_name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        address: customer.address ?? null,
        gender: customer.gender,
        availability: customer.availability ?? true,
        employment_type: customer.employment_type,
        user_role: UserRoleEnum.worker,
        emergency_contact: customer.emergency_contact ?? null,
        worker_roles: customer.worker_roles ?? [],
        remarks: customer.remarks ?? null,
      });
    } else {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: null,
        gender: Gender.male,
        availability: true,
        employment_type: EmploymentType.full_time,
        user_role: UserRoleEnum.worker,
        emergency_contact: null,
        worker_roles: [],
        remarks: null,
      });
    }
  }, [customer, isEditMode, isOpen]);

  const handleSubmit = async () => {
    if (!formData.first_name || !formData.last_name || !formData.email) {
      alert(
        "Please fill in all required fields (First Name, Last Name, Email)"
      );
      return;
    }

    if ((formData.worker_roles ?? []).length === 0) {
      alert("Please select at least one role");
      return;
    }

    if (onSave) {
      setIsSubmitting(true);
      try {
        await Promise.resolve(onSave(formData));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Worker" : "Add New Worker"}
    >
      <div className="space-y-5 max-h-[75vh] overflow-y-auto pr-2">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="First Name"
              placeholder="First name"
              value={formData.first_name || ""}
              onChange={(e) =>
                setFormData({ ...formData, first_name: e.target.value })
              }
              required
            />
            <FormInput
              label="Last Name"
              placeholder="Last name"
              value={formData.last_name || ""}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">
            Contact Details
          </h3>

          <FormInput
            label="Email"
            type="email"
            placeholder="email@example.com"
            value={formData.email || ""}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Phone"
              placeholder="+1 (555) 000-0000"
              value={formData.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <FormInput
              label="Emergency Contact"
              placeholder="+1 (555) 000-0000"
              value={formData.emergency_contact || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  emergency_contact: e.target.value || null,
                })
              }
            />
          </div>

          <FormInput
            label="Address"
            placeholder="Street address, City, State, ZIP"
            value={formData.address || ""}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value || null })
            }
          />
          <FormSelect
            label="Gender"
            options={GENDER_OPTIONS}
            value={formData.gender || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                gender: (e.target.value || "male") as Gender,
              })
            }
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">
            Work Information
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              label="Availability"
              options={[
                { value: "true", label: "Available" },
                { value: "false", label: "Unavailable" },
              ]}
              value={String(formData.availability ?? true)}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  availability: e.target.value === "true",
                })
              }
            />

            <FormSelect
              label="Employment Type"
              options={EMPLOYMENT_OPTIONS}
              value={formData.employment_type ?? "full_time"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  employment_type:
                    (e.target.value as EmploymentType) ?? "full_time",
                })
              }
            />
          </div>

          <SearchableMultiSelect
            label="Roles"
            options={ROLE_OPTIONS}
            selectedValues={formData.worker_roles || []}
            onChange={(worker_roles) =>
              setFormData({ ...formData, worker_roles })
            }
            placeholder="Select worker roles..."
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Remarks
          </label>
          <textarea
            value={formData.remarks || ""}
            onChange={(e) =>
              setFormData({ ...formData, remarks: e.target.value || null })
            }
            placeholder="Additional notes or remarks about the worker..."
            rows={3}
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            <span className="text-sm font-medium">
              {isSubmitting
                ? "Saving..."
                : isEditMode
                  ? "Update Worker"
                  : "Add Worker"}
            </span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            className="px-6"
          >
            <span className="text-sm font-medium">Cancel</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default WorkerEditModal;
