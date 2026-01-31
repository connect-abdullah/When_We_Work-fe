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
import type {
  AdminSignupPayload,
  SignupBusinessData,
  SignupStep1Data,
  SignupStep2Data,
} from "@/types";

const defaultStep1: SignupStep1Data = {
  first_name: "",
  middle_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const defaultStep2: SignupStep2Data = {
  phone: "",
  photo: null,
  language: "en",
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
  { label: "Personal" },
  { label: "Contact" },
  { label: "Business" },
  { label: "Verify" },
];

export default function SignupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [step1, setStep1] = useState<SignupStep1Data>(defaultStep1);
  const [step2, setStep2] = useState<SignupStep2Data>(defaultStep2);
  const [business, setBusiness] = useState<SignupBusinessData>(defaultBusiness);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange =
    (section: "step1" | "step2" | "business") =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
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
    if (!step2.language) {
      e.language = "Required";
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
    let isValid = false;
    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    }

    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1 && currentStep < 5) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleBusinessSubmit = async () => {
    if (!validateStep3()) {
      return;
    }
    setIsLoading(true);
    try {
      const photoUrl = photoPreviewUrl ?? null;
      const _payload: AdminSignupPayload = {
        ...step1,
        ...step2,
        photo: photoUrl,
        business,
      };
      // TODO: API call to register admin with _payload
      await new Promise((r) => setTimeout(r, 1000));
      // Move to verification step
      setCurrentStep(4);
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (_code: string) => {
    setIsLoading(true);
    try {
      // TODO: API call to verify code with _code parameter
      await new Promise((r) => setTimeout(r, 1000));
      // Show success screen
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Verification failed" });
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
                  <SignupStepPersonal
                    data={step1}
                    errors={errors}
                    onChange={handleChange}
                    onNext={handleNext}
                  />
                )}

                {currentStep === 2 && (
                  <SignupStepContact
                    data={step2}
                    errors={errors}
                    onChange={handleChange}
                    onPhotoChange={handlePhotoChange}
                    photoValue={photoFile ?? photoPreviewUrl}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}

                {currentStep === 3 && (
                  <SignupStepBusiness
                    data={business}
                    errors={errors}
                    onChange={handleChange}
                    onSubmit={handleBusinessSubmit}
                    onBack={handleBack}
                    isLoading={isLoading}
                  />
                )}

                {currentStep === 4 && (
                  <SignupStepVerification
                    email={step1.email}
                    onVerify={handleVerify}
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
