'use client';

import React, { useState } from 'react';
import { Lock, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';
import { AuthLayout, PasswordInput } from '@/components/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const ChangePasswordPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Current password validation
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    // New password validation
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'New password must be at least 8 characters';
    } else if (formData.newPassword === formData.currentPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const isPasswordMatch = () => {
    return formData.confirmPassword && formData.newPassword === formData.confirmPassword;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement actual change password logic here
      console.log('Change password data:', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to login page after successful password change
      router.push('/auth/login');
    } catch (error) {
      console.error('Change password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Change your password"
      subtitle="Enter your current password and choose a new one"
    >
      <form className="space-y-5 w-full" onSubmit={handleSubmit}>
            <PasswordInput
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              placeholder="Enter your current password"
              label="Current Password"
              error={errors.currentPassword}
              required
              icon={<Lock size={14} className="text-gray-400" />}
            />

            <PasswordInput
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="Enter your new password"
              label="New Password"
              error={errors.newPassword}
              required
              icon={<Lock size={14} className="text-gray-400" />}
            />

            <PasswordInput
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your new password"
              label="Confirm New Password"
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
              {isLoading ? 'Updating Password...' : 'Update Password'}
            </Button>

            <div className="text-center">
              <Link 
                href="/auth/login" 
                className="inline-flex items-center text-xs text-[#5A6ACF] hover:text-[#4A5ABF] font-medium transition-colors"
              >
                <ArrowLeft size={12} className="mr-1" />
                Back to Login
              </Link>
            </div>
          </form>
    </AuthLayout>
  );
};

export default ChangePasswordPage;
