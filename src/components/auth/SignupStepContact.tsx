"use client";

import React from "react";
import { Globe, Phone, User } from "lucide-react";
import { Button, FormSelect } from "@/components/ui";
import { PhoneInput, PhotoUpload } from "@/components/auth";
import { GENDERS, LANGUAGES } from "@/constants/auth";
import type { SignupStep2Data } from "@/types";

interface SignupStepContactProps {
  data: SignupStep2Data;
  errors: Record<string, string>;
  onChange: (
    section: "step2"
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onPhotoChange: (file: File | null, previewUrl: string | null) => void;
  photoValue: File | string | null;
  onNext: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

export default function SignupStepContact({
  data,
  errors,
  onChange,
  onPhotoChange,
  photoValue,
  onNext,
  onBack,
  isLoading = false,
}: SignupStepContactProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <PhoneInput
          value={data.phone}
          onChange={onChange("step2")}
          error={errors.phone}
          required
          icon={<Phone size={14} className="text-gray-400" />}
        />
        <FormSelect
          label="Language"
          name="language"
          value={data.language}
          onChange={onChange("step2")}
          error={errors.language}
          required
          options={LANGUAGES.map((l) => ({ value: l.value, label: l.label }))}
          icon={<Globe size={14} className="text-gray-400" />}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormSelect
          label="Gender"
          name="gender"
          value={data.gender}
          onChange={onChange("step2")}
          error={errors.gender}
          required
          options={GENDERS.map((g) => ({ value: g.value, label: g.label }))}
          icon={<User size={14} className="text-gray-400" />}
        />
        <div>
          <PhotoUpload
            value={photoValue}
            onChange={onPhotoChange}
            label="Photo (optional)"
            error={errors.photo}
          />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          size="md"
          className="flex-1 py-2.5"
          onClick={onBack}
          disabled={isLoading}
        >
          Back
        </Button>
        <Button
          type="button"
          variant="primary"
          size="md"
          className="flex-1 py-2.5"
          onClick={onNext}
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Complete"}
        </Button>
      </div>
    </div>
  );
}
