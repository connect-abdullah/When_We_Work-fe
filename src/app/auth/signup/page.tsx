"use client";

import React, { useState } from "react";
import { User, Mail, Phone, Lock, CheckCircle2 } from "lucide-react";
import { Button, FormInput } from "@/components/ui";
import { AuthLayout, PasswordInput, PhoneInput } from "@/components/auth";
import Link from "next/link";
import { parsePhoneNumber } from "libphonenumber-js";
import { useRouter } from "next/navigation";

// Country codes data

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

const SignupPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation using libphonenumber-js
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      try {
        // Note: PhoneInput component handles country code internally
        const phoneNumber = parsePhoneNumber(formData.phone);

        if (!phoneNumber || !phoneNumber.isValid()) {
          newErrors.phone = "Please enter a valid phone number";
        }
      } catch (error) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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

  const getFullPhoneNumber = () => {
    // PhoneInput component handles the full phone number internally
    return formData.phone;
  };

  const isPasswordMatch = () => {
    return (
      formData.confirmPassword && formData.password === formData.confirmPassword
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement actual signup logic here
      const signupData = {
        ...formData,
        phone: getFullPhoneNumber(), // This will be in E.164 format (e.g., +1234567890)
      };
      console.log("Signup data with international phone number:", signupData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to OTP page with flag=false for new signup
      router.push("/auth/otp?flag=false");
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle={
        <>
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-[#5A6ACF] hover:text-[#4A5ABF]"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form className="space-y-5 w-full" onSubmit={handleSubmit}>
        <FormInput
          label="Full Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
          placeholder="Enter your full name"
          required
          icon={<User size={14} className="text-gray-400" />}
        />

        <FormInput
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          placeholder="Enter your email"
          required
          icon={<Mail size={14} className="text-gray-400" />}
        />

        <PhoneInput
          value={formData.phone}
          onChange={handleInputChange}
          error={errors.phone}
          required
          icon={<Phone size={14} className="text-gray-400" />}
        />

        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Create a password"
          label="Password"
          error={errors.password}
          required
          icon={<Lock size={14} className="text-gray-400" />}
        />

        <PasswordInput
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm your password"
          label="Confirm Password"
          error={errors.confirmPassword}
          required
          showMatchIndicator={true}
          isMatch={isPasswordMatch()}
          icon={<CheckCircle2 size={14} className="text-gray-400" />}
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full py-3 text-sm font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>

        <div className="text-center pt-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            By creating an account, you agree to our{" "}
            <Link
              href="/terms"
              className="text-[#5A6ACF] hover:text-[#4A5ABF] font-medium"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-[#5A6ACF] hover:text-[#4A5ABF] font-medium"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignupPage;
