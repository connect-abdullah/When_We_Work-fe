"use client";
import React, { useEffect, useState } from "react";
import { Button, FormInput, FormSelect, Modal } from "@/components/ui";
import SearchableMultiSelect from "@/components/ui/SearchableMultiSelect";
import { Worker } from "@/components/admin/workers/WorkerPage";

interface WorkerEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Worker | null;
  isEditMode: boolean;
  onSave?: (workerData: Partial<Worker>) => void;
}

// Available role options
const ROLE_OPTIONS = [
  "Plumber",
  "Electrician",
  "Carpenter",
  "Painter",
  "HVAC Technician",
  "Welder",
  "General Labor",
  "Decorator",
  "Fabricator",
  "Mason",
  "Roofer",
  "Landscaper",
  "Mechanic",
  "Tile Setter",
  "Drywall Installer",
];

const WorkerEditModal: React.FC<WorkerEditModalProps> = ({
  isOpen,
  onClose,
  customer,
  isEditMode,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<Worker>>({
    first_name: "",
    middle_name: null,
    last_name: "",
    email: "",
    phone: null,
    address: null,
    gender: null,
    rating: 4.0,
    is_available: true,
    is_freelancer: false,
    emergency_contact: null,
    roles: [],
    remarks: null,
  });

  // Initialize form data from worker
  useEffect(() => {
    if (customer && isEditMode) {
      setFormData({
        first_name: customer.first_name || "",
        middle_name: customer.middle_name || null,
        last_name: customer.last_name || "",
        email: customer.email || "",
        phone: customer.phone || null,
        address: customer.address || null,
        gender: customer.gender || null,
        rating: customer.rating || 4.0,
        is_available: customer.is_available ?? true,
        is_freelancer: customer.is_freelancer ?? false,
        emergency_contact: customer.emergency_contact || null,
        roles: customer.roles || [],
        remarks: customer.remarks || null,
      });
    } else {
      setFormData({
        first_name: "",
        middle_name: null,
        last_name: "",
        email: "",
        phone: null,
        address: null,
        gender: null,
        rating: 4.0,
        is_available: true,
        is_freelancer: false,
        emergency_contact: null,
        roles: [],
        remarks: null,
      });
    }
  }, [customer, isEditMode, isOpen]);

  const handleSubmit = () => {
    if (!formData.first_name || !formData.last_name || !formData.email) {
      alert(
        "Please fill in all required fields (First Name, Last Name, Email)"
      );
      return;
    }

    if ((formData.roles || []).length === 0) {
      alert("Please select at least one role");
      return;
    }

    if (onSave) {
      onSave(formData);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Worker" : "Add New Worker"}
    >
      <div className="space-y-5 max-h-[75vh] overflow-y-auto pr-2">
        {/* Name Fields */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">
            Personal Information
          </h3>
          <div className="grid grid-cols-3 gap-4">
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
              label="Middle Name"
              placeholder="Middle name"
              value={formData.middle_name || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  middle_name: e.target.value || null,
                })
              }
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

        {/* Contact Information */}
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
                setFormData({ ...formData, phone: e.target.value || null })
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
            options={[
              { value: "", label: "Select gender" },
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Other", label: "Other" },
              { value: "Prefer not to say", label: "Prefer not to say" },
            ]}
            value={formData.gender || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                gender: e.target.value || null,
              })
            }
          />
        </div>

        {/* Work Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">
            Work Information
          </h3>

          <div className="grid grid-cols-3 gap-4">
            <FormInput
              label="Rating"
              type="number"
              placeholder="4.0"
              value={formData.rating?.toString() || "4.0"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rating: parseFloat(e.target.value) || 4.0,
                })
              }
              min="0"
              max="5"
              step="0.1"
            />

            <FormSelect
              label="Availability"
              options={[
                { value: "true", label: "Available" },
                { value: "false", label: "Unavailable" },
              ]}
              value={String(formData.is_available ?? true)}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  is_available: e.target.value === "true",
                })
              }
            />

            <FormSelect
              label="Employment Type"
              options={[
                { value: "true", label: "Freelancer" },
                { value: "false", label: "Full-time" },
              ]}
              value={String(formData.is_freelancer ?? false)}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  is_freelancer: e.target.value === "true",
                })
              }
            />
          </div>

          <SearchableMultiSelect
            label="Roles"
            options={ROLE_OPTIONS}
            selectedValues={formData.roles || []}
            onChange={(roles) => setFormData({ ...formData, roles })}
            placeholder="Select worker roles..."
            required
          />
        </div>

        {/* Remarks */}
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

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={handleSubmit}
          >
            <span className="text-sm font-medium">
              {isEditMode ? "Update Worker" : "Add Worker"}
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
