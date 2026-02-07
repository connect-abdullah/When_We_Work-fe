"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui";
import {
  SignupStepBusiness,
  SignupStepContact,
  SignupStepPersonal,
  SignupStepVerification,
  SignupSuccess,
  StepIndicator,
} from "@/components/auth";
import { createUser } from "@/lib/api/users";
import { createBusiness } from "@/lib/api/business";
import type { BusinessCreate } from "@/lib/api/business/schema";
import { Gender, UserRoleEnum } from "@/lib/api/users/schema";
import type {
  SignupBusinessData,
  SignupStep1Data,
  SignupStep2Data,
} from "@/types";

const VERIFICATION_BYPASS_CODE = "111111";

const defaultStep1: SignupStep1Data = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const defaultStep2: SignupStep2Data = {
  phone: "",
  photo: null,
  gender: "",
};

const defaultBusiness: SignupBusinessData = {
  business_name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip_code: "",
  country: "",
  description: "",
};

const STEPS = [
  { label: "Business" },
  { label: "Verify" },
  { label: "Personal" },
  { label: "Contact" },
];

export default function SignupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [step1, setStep1] = useState<SignupStep1Data>(defaultStep1);
  const [step2, setStep2] = useState<SignupStep2Data>(defaultStep2);
  const [business, setBusiness] = useState<SignupBusinessData>(defaultBusiness);
  const [createdBusinessId, setCreatedBusinessId] = useState<number | null>(
    null,
  );
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange =
    (section: "step1" | "step2" | "business") =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement >,
    ) => {
      const { name, value } = e.target;
      if (section === "step1") {
        setStep1((prev) => ({ ...prev, [name]: value }));
      } else if (section === "step2") {
        setStep2((prev) => ({ ...prev, [name]: value }));
      } else {
        setBusiness((prev) => ({ ...prev, [name]: value }));
      }
      if (errors[name]) {
        const { [name]: _, ...rest } = errors;
        setErrors(rest);
      }
    };

  const handlePhotoChange = (file: File | null, previewUrl: string | null) => {
    setPhotoFile(file);
    setPhotoPreviewUrl(previewUrl);
  };

  const validateStep1 = (): boolean => {
    const e: Record<string, string> = {};
    if (!step1.first_name.trim()) {
      e.first_name = "Required";
    }
    if (!step1.last_name.trim()) {
      e.last_name = "Required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!step1.email.trim()) {
      e.email = "Required";
    } else if (!emailRegex.test(step1.email)) {
      e.email = "Invalid email";
    }
    if (!step1.password) {
      e.password = "Required";
    } else if (step1.password.length < 8) {
      e.password = "Min 8 characters";
    }
    if (!step1.confirm_password) {
      e.confirm_password = "Required";
    } else if (step1.password !== step1.confirm_password) {
      e.confirm_password = "Passwords don't match";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = (): boolean => {
    const e: Record<string, string> = {};
    if (!step2.phone?.trim()) {
      e.phone = "Required";
    }
    if (!step2.gender) {
      e.gender = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = (): boolean => {
    const e: Record<string, string> = {};
    if (!business.business_name?.trim()) {
      e.business_name = "Required";
    }
    if (!business.email?.trim()) {
      e.business_email = "Required";
    }
    if (!business.phone?.trim()) {
      e.business_phone = "Required";
    }
    if (!business.address?.trim()) {
      e.address = "Required";
    }
    if (!business.city?.trim()) {
      e.city = "Required";
    }
    if (!business.state?.trim()) {
      e.state = "Required";
    }
    if (!business.zip_code?.trim()) {
      e.zip_code = "Required";
    }
    if (!business.country?.trim()) {
      e.country = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 3) {
      if (validateStep1()) {
        setCurrentStep(4);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1 && currentStep < 5) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleBusinessSubmit = () => {
    if (!validateStep3()) {
      return;
    }
    setCurrentStep(2);
  };

  const handleVerify = async (code: string) => {
    if (code !== VERIFICATION_BYPASS_CODE) {
      setErrors({ submit: "Invalid code. Use 111111 to continue." });
      return;
    }
    setIsLoading(true);
    setErrors({});
    try {
      const businessPayload: BusinessCreate = {
        business_name: business.business_name,
        email: business.email,
        phone: business.phone,
        address: business.address,
        city: business.city,
        state: business.state,
        zip_code: business.zip_code,
        country: business.country,
        description: business.description ?? null,
      };
      const created = await createBusiness(businessPayload);
      if (created?.success === true) {
        setCreatedBusinessId(created?.data?.id);
      }
      setCurrentStep(3);
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Could not create business. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteSignup = async () => {
    if (!validateStep1() || !validateStep2()) {
      return;
    }
    if (createdBusinessId == null) {
      setErrors({ submit: "Business not created. Please go back and verify." });
      return;
    }
    setIsLoading(true);
    setErrors({});
    try {
      const genderValue =
        step2.gender === "prefer_not_to_say" ? Gender.other : (step2.gender as Gender);
      const userPayload = {
        first_name: step1.first_name,
        last_name: step1.last_name,
        email: step1.email,
        password: step1.password,
        phone: step2.phone,
        photo: photoPreviewUrl ?? null,
        gender: genderValue,
        user_role: UserRoleEnum.admin,
        business_id: createdBusinessId ?? undefined,
      };

      const created = await createUser(userPayload);
      if (created?.success === true) {
        const { access_token, ...userWithoutToken } = created.data;
        localStorage.setItem("auth:token", access_token);
        localStorage.setItem("auth:user", JSON.stringify(userWithoutToken.user));
        setShowSuccess(true);
      }
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Could not create account. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueToDashboard = () => {
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-linear-to-br from-[#5A6ACF]/15 via-[#5A6ACF]/5 to-transparent rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-linear-to-tl from-[#4A5ABF]/15 via-purple-400/10 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="w-full max-w-2xl relative z-10">
        <Card className="bg-white/95 backdrop-blur-md border-white/20 shadow-xl">
          <div className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Signup</h2>
              <p className="text-sm text-gray-600 mt-1">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-[#5A6ACF] hover:text-[#4A5ABF]"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {!showSuccess && (
              <StepIndicator
                steps={STEPS}
                currentStep={currentStep}
                className="mb-8"
              />
            )}

            {showSuccess ? (
              <SignupSuccess onContinue={handleContinueToDashboard} />
            ) : (
              <>
                    {currentStep === 1 && (
                  <SignupStepBusiness
                    data={business}
                    errors={errors}
                    onChange={handleChange}
                    onSubmit={handleBusinessSubmit}
                    onBack={handleBack}
                    isLoading={isLoading}
                  />
                )}

                {currentStep === 2 && (
                  <SignupStepVerification
                    email={business.email}
                    onVerify={handleVerify}
                    onBack={handleBack}
                    isLoading={isLoading}
                  />
                )}

                {currentStep === 3 && (
                  <SignupStepPersonal
                    data={step1}
                    errors={errors}
                    onChange={handleChange}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}

                {currentStep === 4 && (
                  <SignupStepContact
                    data={step2}
                    errors={errors}
                    onChange={handleChange}
                    onPhotoChange={handlePhotoChange}
                    photoValue={photoFile ?? photoPreviewUrl}
                    onNext={handleCompleteSignup}
                    onBack={handleBack}
                    isLoading={isLoading}
                  />
                )}

                {errors.submit && (
                  <p className="text-sm text-red-500 text-center mt-4">
                    {errors.submit}
                  </p>
                )}

                {currentStep < 4 && (
                  <p className="text-center text-xs text-gray-500 pt-4">
                    Workers sign in with credentials provided by your admin.
                  </p>
                )}
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
