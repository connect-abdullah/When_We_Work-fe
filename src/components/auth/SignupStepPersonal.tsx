"use client";

import React from "react";
import { CheckCircle2, Lock, Mail, User } from "lucide-react";
import { Button, FormInput } from "@/components/ui";
import { PasswordInput } from "@/components/auth";
import type { SignupStep1Data } from "@/types";

interface SignupStepPersonalProps {
  data: SignupStep1Data;
  errors: Record<string, string>;
  onChange: (
    section: "step1"
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onBack?: () => void;
}

export default function SignupStepPersonal({
  data,
  errors,
  onChange,
  onNext,
  onBack,
}: SignupStepPersonalProps) {
  const isPasswordMatch =
    Boolean(data.confirm_password) && data.password === data.confirm_password;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <FormInput
          label="First name"
          name="first_name"
          value={data.first_name}
          onChange={onChange("step1")}
          error={errors.first_name}
          placeholder="First"
          required
          icon={<User size={14} className="text-gray-400" />}
        />
        <FormInput
          label="Middle (opt.)"
          name="middle_name"
          value={data.middle_name}
          onChange={onChange("step1")}
          error={errors.middle_name}
          placeholder="Middle"
          icon={<User size={14} className="text-gray-400" />}
        />
        <FormInput
          label="Last name"
          name="last_name"
          value={data.last_name}
          onChange={onChange("step1")}
          error={errors.last_name}
          placeholder="Last"
          required
          icon={<User size={14} className="text-gray-400" />}
        />
      </div>
      <FormInput
        label="Email"
        name="email"
        type="email"
        value={data.email}
        onChange={onChange("step1")}
        error={errors.email}
        placeholder="you@example.com"
        required
        icon={<Mail size={14} className="text-gray-400" />}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <PasswordInput
          name="password"
          value={data.password}
          onChange={onChange("step1")}
          placeholder="Password"
          label="Password"
          error={errors.password}
          required
          icon={<Lock size={14} className="text-gray-400" />}
        />
        <PasswordInput
          name="confirm_password"
          value={data.confirm_password}
          onChange={onChange("step1")}
          placeholder="Confirm"
          label="Confirm password"
          error={errors.confirm_password}
          required
          showMatchIndicator
          isMatch={isPasswordMatch}
          icon={<CheckCircle2 size={14} className="text-gray-400" />}
        />
      </div>
      <div className={onBack ? "flex gap-3 pt-2" : ""}>
        {onBack && (
          <Button
            type="button"
            variant="outline"
            size="md"
            className="flex-1 py-2.5"
            onClick={onBack}
          >
            Back
          </Button>
        )}
        <Button
          type="button"
          variant="primary"
          size="md"
          className={onBack ? "flex-1 py-2.5" : "w-full py-2.5"}
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
