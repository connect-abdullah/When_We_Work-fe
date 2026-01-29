"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mail, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui";

interface SignupStepVerificationProps {
  email: string;
  onVerify: (code: string) => void;
  onBack: () => void;
  isLoading: boolean;
}

export default function SignupStepVerification({
  email,
  onVerify,
  onBack,
  isLoading,
}: SignupStepVerificationProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      return;
    } // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Clear error when user starts typing
    if (error) {
      setError("");
    }

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }

    setOtp(newOtp);

    // Focus the next empty input or the last input
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }
    onVerify(otpString);
  };

  const resendOTP = () => {
    setTimeLeft(300);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    // TODO: Implement resend OTP logic
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-[#5A6ACF]/10 rounded-full flex items-center justify-center mb-4">
          <Mail size={32} className="text-[#5A6ACF]" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Check your email
        </h3>
        <p className="text-sm text-gray-600">
          We've sent a 6-digit verification code to
        </p>
        <p className="text-sm font-medium text-gray-900 mt-1">
          {email}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-[#1F384C] block text-center">
            Enter verification code
          </label>
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el: HTMLInputElement | null) => {
                  inputRefs.current[index] = el;
                  return undefined;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A6ACF]/20 focus:border-[#5A6ACF] transition-all bg-white ${
                  error
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                disabled={isLoading}
              />
            ))}
          </div>
          {error && (
            <p className="text-xs text-red-500 text-center">{error}</p>
          )}
        </div>

        <div className="text-center">
          {timeLeft > 0 ? (
            <p className="text-xs text-gray-500">
              Resend code in {formatTime(timeLeft)}
            </p>
          ) : (
            <button
              type="button"
              onClick={resendOTP}
              className="inline-flex items-center text-xs text-[#5A6ACF] hover:text-[#4A5ABF] font-medium transition-colors"
            >
              <RotateCcw size={12} className="mr-1" />
              Resend verification code
            </button>
          )}
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
            onClick={handleSubmit}
            disabled={isLoading || otp.join("").length !== 6}
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </Button>
        </div>
      </div>
    </div>
  );
}
