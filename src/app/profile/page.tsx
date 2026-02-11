"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  FormInput,
  FormSelect,
  FormTextarea,
  PageHeader,
} from "@/components/ui";
import PhotoUpload from "@/components/auth/PhotoUpload";
import PasswordInput from "@/components/auth/PasswordInput";
import SearchableMultiSelect from "@/components/ui/SearchableMultiSelect";
import { getUser, updateUser } from "@/lib/api/users";
import { Gender, UserGetSchema, UserUpdate } from "@/lib/api/users/schema";
import { ROLE_OPTIONS } from "@/constants/workers";
import { Lock, Mail, Phone } from "lucide-react";

const GENDER_OPTIONS: { value: Gender | ""; label: string }[] = [
  { value: Gender.male, label: "Male" },
  { value: Gender.female, label: "Female" },
  { value: Gender.other, label: "Other" },
];

// Convert File to base64 string
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserGetSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [originalPhotoUrl, setOriginalPhotoUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [originalFormData, setOriginalFormData] = useState<Partial<UserUpdate>>(
    {}
  );

  const [formData, setFormData] = useState<Partial<UserUpdate>>({
    first_name: "",
    last_name: "",
    email: "",
    password: null,
    phone: "",
    address: null,
    emergency_contact: null,
    gender: Gender.male,
    availability: true,
    worker_roles: [],
  });

  const getCurrentUserId = (): number | null => {
    if (typeof window === "undefined") {
      return null;
    }
    try {
      const userStr = localStorage.getItem("auth:user");
      if (userStr) {
        const userData = JSON.parse(userStr);
        return userData?.id ?? null;
      }
    } catch {
      return null;
    }
    return null;
  };

  const fetchUser = useCallback(async () => {
    const userId = getCurrentUserId();
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const userData = await getUser(userId);
      if (userData) {
        setUser(userData);
        const initialFormData = {
          first_name: userData.first_name || "",
          last_name: userData.last_name || "",
          email: userData.email || "",
          password: null,
          phone: userData.phone || "",
          address: userData.address ?? null,
          emergency_contact: userData.emergency_contact ?? null,
          gender: userData.gender,
          availability: userData.availability ?? true,
          worker_roles: userData.worker_roles ?? [],
        };
        setFormData(initialFormData);
        setOriginalFormData(initialFormData);
        setPhotoPreviewUrl(userData.photo ?? null);
        setOriginalPhotoUrl(userData.photo ?? null);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setErrors({ submit: "Failed to load profile data" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      const { [name]: _, ...rest } = errors;
      setErrors(rest);
    }
  };

  const handlePhotoChange = (file: File | null, previewUrl: string | null) => {
    setPhotoFile(file);
    setPhotoPreviewUrl(previewUrl);
  };

  const handleAvailabilityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      availability: e.target.value === "true",
    });
  };

  // Check if form has changes
  const hasChanges = () => {
    if (photoFile) {
      return true; // Photo changed
    }
    return JSON.stringify(formData) !== JSON.stringify(originalFormData);
  };

  const handleUpdate = async () => {
    const userId = getCurrentUserId();
    if (!userId) {
      setErrors({ submit: "User ID not found" });
      return;
    }

    setIsUpdating(true);
    setErrors({});

    try {
      const updatePayload: UserUpdate = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        // Email is not included - workers cannot change it
        password: formData.password || null,
        phone: formData.phone || "",
        address: formData.address || null,
        emergency_contact: formData.emergency_contact || null,
        gender: formData.gender,
        availability: formData.availability,
        worker_roles: formData.worker_roles || [],
      };

      // Convert photo file to base64 if a new file was selected
      if (photoFile) {
        const base64Photo = await fileToBase64(photoFile);
        updatePayload.photo = base64Photo;
      } else if (photoPreviewUrl && !photoFile) {
        // Keep existing photo if no new file selected
        updatePayload.photo = photoPreviewUrl;
      }

      const response = await updateUser(updatePayload);
      if (response?.success) {
        await fetchUser(); // Refresh user data
        setPhotoFile(null);
        setErrors({});
      } else {
        setErrors({ submit: response?.message || "Failed to update profile" });
      }
    } catch (error) {
      console.error("Update error:", error);
      setErrors({ submit: "Failed to update profile. Please try again." });
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col w-full h-full pt-4 px-2 sm:px-4 overflow-y-auto">
        <PageHeader
          title="Profile"
          description="View and manage your profile"
        />
        <div className="px-2 sm:px-4 pb-8 mt-4">
          <Card className="p-8 text-center">
            <p className="text-sm text-gray-600">Loading profile...</p>
          </Card>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col w-full h-full pt-4 px-2 sm:px-4 overflow-y-auto">
        <PageHeader
          title="Profile"
          description="View and manage your profile"
        />
        <div className="px-2 sm:px-4 pb-8 mt-4">
          <Card className="p-8 text-center">
            <p className="text-sm text-red-600">Failed to load profile data</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto">
      <div className="pt-4 px-2 sm:px-4">
        <PageHeader
          title="Profile"
          description="View and manage your profile"
        />
      </div>

      <div className="flex-1 px-2 sm:px-4 pb-8 mt-6 flex justify-center">
        <div className="w-full max-w-3xl">
          {/* White background container with shadow */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            {/* Header with Save Changes button */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-[#1F384C]">
                Profile Information
              </h2>
              <Button
                variant="primary"
                size="sm"
                onClick={handleUpdate}
                disabled={isUpdating || !hasChanges()}
                className="min-w-[120px]"
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>

            {errors.submit && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Profile Photo */}
              <div className="flex justify-center pb-6 border-b border-gray-100">
                <PhotoUpload
                  value={photoPreviewUrl || photoFile}
                  onChange={handlePhotoChange}
                  label="Profile Photo"
                  error={errors.photo}
                  disabled={false}
                />
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-gray-800 pb-2 border-b border-gray-200">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput
                    label="First Name"
                    name="first_name"
                    value={formData.first_name || ""}
                    onChange={handleInputChange}
                    error={errors.first_name}
                    required
                    disabled={false}
                  />
                  <FormInput
                    label="Last Name"
                    name="last_name"
                    value={formData.last_name || ""}
                    onChange={handleInputChange}
                    error={errors.last_name}
                    required
                    disabled={false}
                  />
                  <div className="sm:col-span-2">
                    <FormInput
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      error={errors.email}
                      required
                      disabled={true}
                      icon={<Mail size={16} className="text-gray-400" />}
                    />
                    <p className="text-xs text-gray-500 mt-1.5">
                      Email cannot be changed by workers. Only admins can update
                      email addresses.
                    </p>
                  </div>
                  <PasswordInput
                    label="Password"
                    name="password"
                    value={formData.password || ""}
                    onChange={handleInputChange}
                    error={errors.password}
                    placeholder="Leave blank to keep current password"
                    icon={<Lock size={16} className="text-gray-400" />}
                  />
                  <FormSelect
                    label="Gender"
                    name="gender"
                    options={GENDER_OPTIONS}
                    value={formData.gender || Gender.male}
                    onChange={handleInputChange}
                    error={errors.gender}
                    required
                    disabled={false}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-gray-800 pb-2 border-b border-gray-200">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <FormTextarea
                      label="Address"
                      name="address"
                      value={formData.address || ""}
                      onChange={handleInputChange}
                      error={errors.address}
                      disabled={false}
                      rows={3}
                    />
                  </div>
                  <FormInput
                    label="Phone"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleInputChange}
                    error={errors.phone}
                    placeholder="Phone number"
                    disabled={false}
                    icon={<Phone size={16} className="text-gray-400" />}
                  />
                  <FormInput
                    label="Emergency Contact"
                    name="emergency_contact"
                    value={formData.emergency_contact || ""}
                    onChange={handleInputChange}
                    error={errors.emergency_contact}
                    placeholder="Phone number"
                    disabled={false}
                  />
                </div>
              </div>

              {/* Work Information */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-gray-800 pb-2 border-b border-gray-200">
                  Work Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormSelect
                    label="Availability"
                    name="availability"
                    options={[
                      { value: "true", label: "Available" },
                      { value: "false", label: "Unavailable" },
                    ]}
                    value={String(formData.availability ?? true)}
                    onChange={handleAvailabilityChange}
                    disabled={false}
                  />
                </div>
                <div>
                  <SearchableMultiSelect
                    label="Worker Roles"
                    options={ROLE_OPTIONS}
                    selectedValues={formData.worker_roles || []}
                    onChange={(worker_roles) =>
                      setFormData({ ...formData, worker_roles })
                    }
                    placeholder="Select worker roles..."
                    disabled={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
