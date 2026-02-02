"use client";

import React, { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { Button, FormInput } from "@/components/ui";
import {
  AuthLayout,
  LoginAsAdminToggle,
  PasswordInput,
} from "@/components/auth";
import { loginAdmin, loginWorker } from "@/lib/api/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  submit?: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginAsAdmin, setLoginAsAdmin] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
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
    setErrors((prev) => ({ ...prev, submit: undefined }));

    try {
      const payload = { email: formData.email, password: formData.password };
      const response = loginAsAdmin ? await loginAdmin(payload) : await loginWorker(payload);
      try {
      const { access_token, ...userWithoutToken } = response?.data ?? {};
      localStorage.setItem("auth:token", response?.data?.access_token);
      localStorage.setItem("auth:user", JSON.stringify(userWithoutToken));
      } catch (error) {
        console.error("Error saving user data:", error);
      }
      if(response?.success === true) {
        router.push(loginAsAdmin ? "/admin/dashboard" : "/job-application");
      } else {
        setErrors((prev) => ({
          submit: response?.message
        }));
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "Invalid email or password. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-[#5A6ACF] hover:text-[#4A5ABF]"
          >
            Sign up
          </Link>
        </>
      }
    >
      <form className="space-y-5 w-full" onSubmit={handleSubmit}>
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

        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          label="Password"
          error={errors.password}
          required
          icon={<Lock size={14} className="text-gray-400" />}
        />

        <LoginAsAdminToggle
          checked={loginAsAdmin}
          onChange={setLoginAsAdmin}
          disabled={isLoading}
        />

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-[#5A6ACF] focus:ring-[#5A6ACF] border-gray-300 rounded cursor-pointer"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 text-sm text-gray-600 cursor-pointer"
            >
              Remember me
            </label>
          </div>
          <Link
            href="/auth/forgot-password"
            className="text-sm text-[#5A6ACF] hover:text-[#4A5ABF] font-medium transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {errors.submit && (
          <p className="text-sm text-red-500 text-center">{errors.submit}</p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full py-3 text-sm font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>

        <div className="text-center pt-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            By signing in, you agree to our{" "}
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

export default LoginPage;
