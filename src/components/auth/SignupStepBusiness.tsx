"use client";

import React from "react";
import { Building2, Mail, MapPin, Phone } from "lucide-react";
import { Button, FormInput, FormTextarea } from "@/components/ui";
import type { SignupBusinessData } from "@/types";

interface SignupStepBusinessProps {
  data: SignupBusinessData;
  errors: Record<string, string>;
  onChange: (
    section: "business"
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export default function SignupStepBusiness({
  data,
  errors,
  onChange,
  onSubmit,
  onBack,
  isLoading,
}: SignupStepBusinessProps) {
  return (
    <div className="space-y-4">
      <FormInput
        label="Business name"
        name="business_name"
        value={data.business_name}
        onChange={onChange("business")}
        error={errors.business_name}
        placeholder="Business name"
        required
        icon={<Building2 size={14} className="text-gray-400" />}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormInput
          label="Business email"
          name="email"
          type="email"
          value={data.email}
          onChange={onChange("business")}
          error={errors.business_email}
          placeholder="business@example.com"
          required
          icon={<Mail size={14} className="text-gray-400" />}
        />
        <FormInput
          label="Business phone"
          name="phone"
          type="tel"
          value={data.phone}
          onChange={onChange("business")}
          error={errors.business_phone}
          placeholder="+1 234 567 8900"
          required
          icon={<Phone size={14} className="text-gray-400" />}
        />
      </div>
      <FormInput
        label="Address"
        name="address"
        value={data.address}
        onChange={onChange("business")}
        error={errors.address}
        placeholder="Street address"
        required
        icon={<MapPin size={14} className="text-gray-400" />}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <FormInput
          label="City"
          name="city"
          value={data.city}
          onChange={onChange("business")}
          error={errors.city}
          placeholder="City"
          required
        />
        <FormInput
          label="State"
          name="state"
          value={data.state}
          onChange={onChange("business")}
          error={errors.state}
          placeholder="State"
          required
        />
        <FormInput
          label="ZIP"
          name="zip_code"
          value={data.zip_code}
          onChange={onChange("business")}
          error={errors.zip_code}
          placeholder="ZIP"
          required
        />
      </div>
      <FormInput
        label="Country"
        name="country"
        value={data.country}
        onChange={onChange("business")}
        error={errors.country}
        placeholder="Country"
        required
      />
      <FormTextarea
        label="Description (optional)"
        name="description"
        value={data.description}
        onChange={onChange("business")}
        error={errors.description}
        placeholder="Brief description"
      />
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
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Next"}
        </Button>
      </div>
    </div>
  );
}
