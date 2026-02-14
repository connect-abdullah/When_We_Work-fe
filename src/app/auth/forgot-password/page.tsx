"use client";

import React, { useState } from "react";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import { Button, FormInput } from "@/components/ui";
import { AuthLayout } from "@/components/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/lib/api/users";

interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
}

const ForgotPasswordPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await forgotPassword(formData);
      if(response.success){
        setIsEmailSent(true);
      }

      // Show success state
    } catch (error) {
      console.error("Forgot password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle={
          <>
            We&apos;ve sent a password reset link to{" "}
            <span className="font-medium text-gray-900">{formData.email}</span>
          </>
        }
        showLogo={false}
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-900">
              Check your email
            </h3>
            <p className="text-xs text-gray-600">
              We&apos;ve sent a password reset link to{" "}
              <span className="font-medium text-gray-900">
                {formData.email}
              </span>
            </p>
          </div>
          <p className="text-xs text-gray-500 pt-2">
            Didn&apos;t receive the email? Check your spam folder or{" "}
            <button
              onClick={() => {
                setIsEmailSent(false);
                setFormData({ email: "" });
              }}
              className="text-[#5A6ACF] hover:text-[#4A5ABF] font-medium transition-colors"
            >
              try again
            </button>
          </p>
          <div className="pt-4 space-y-2">
            <Link href="/auth/login" className="block">
              <Button variant="primary" size="sm" className="w-full">
                <ArrowLeft size={14} className="mr-2" />
                Back to Sign In
              </Button>
            </Link>
            {/* <button
              onClick={() => router.push("/auth/otp?flag=true")}
              className="text-xs text-[#5A6ACF] hover:text-[#4A5ABF] font-medium transition-colors"
            >
              Continue to verification
            </button> */}
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="No worries! Enter your email address and we'll send you a reset link."
    >
      <form className="space-y-5 w-full" onSubmit={handleSubmit}>
        <FormInput
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          placeholder="Enter your email address"
          required
          icon={<Mail size={14} className="text-gray-400" />}
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full py-3 text-sm font-medium mt-2"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </Button>

        <div className="text-center">
          <Link
            href="/auth/login"
            className="inline-flex items-center text-xs text-[#5A6ACF] hover:text-[#4A5ABF] font-medium transition-colors"
          >
            <ArrowLeft size={12} className="mr-1" />
            Back to Sign In
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
