'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { ArrowLeft, RotateCcw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { AuthLayout } from '@/components/auth';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface FormErrors {
  otp?: string;
}

const OTPContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const flag = searchParams.get('flag') === 'true';
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
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
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      newErrors.otp = 'Please enter the complete 6-digit code';
    } else if (!/^\d{6}$/.test(otpString)) {
      newErrors.otp = 'Please enter a valid 6-digit code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Clear error when user starts typing
    if (errors.otp) {
      setErrors(prev => ({ ...prev, otp: undefined }));
    }

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    
    setOtp(newOtp);
    
    // Focus the next empty input or the last input
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement actual OTP verification logic here
      const otpString = otp.join('');
      console.log('OTP verification:', otpString);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to appropriate page based on flag
      if (flag) {
        // If flag is true, user came from forgot password flow -> change password
        router.push('/auth/change-password');
      } else {
        // If flag is false, user came from signup flow -> business onboarding
        router.push('/business/onboarding');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setErrors({ otp: 'Invalid verification code. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = () => {
    setTimeLeft(300);
    setOtp(['', '', '', '', '', '']);
    setErrors({});
    // TODO: Implement resend OTP logic
    console.log('Resending OTP...');
  };

  return (
    <AuthLayout
      title={flag ? 'Verify your identity' : 'Verify your phone'}
      subtitle={
        flag 
          ? 'We\'ve sent a 6-digit verification code to verify your identity for password reset'
          : 'We\'ve sent a 6-digit verification code to your phone number'
      }
    >
      <form className="space-y-6 w-full" onSubmit={handleSubmit}>
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
                    className={`w-14 h-14 text-center text-xl font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A6ACF]/20 focus:border-[#5A6ACF] transition-all bg-white ${
                      errors.otp 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    required
                  />
                ))}
              </div>
              {errors.otp && (
                <p className="text-xs text-red-500 text-center">{errors.otp}</p>
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

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full py-3 text-sm font-medium"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
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

const OTPPage: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#5A6ACF] mx-auto" />
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <OTPContent />
    </Suspense>
  );
};

export default OTPPage;
