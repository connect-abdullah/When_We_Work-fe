"use client";

import React, { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui";

interface SignupSuccessProps {
  onContinue: () => void;
}

export default function SignupSuccess({ onContinue }: SignupSuccessProps) {
  useEffect(() => {
    // Auto redirect after 3 seconds
    const timer = setTimeout(() => {
      onContinue();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="space-y-6 text-center py-8">
      <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <CheckCircle2 size={48} className="text-green-600" />
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Congratulations!
        </h3>
        <p className="text-base text-gray-600">
          You are successfully registered
        </p>
      </div>

      <div className="pt-4">
        <p className="text-sm text-gray-500 mb-4">
          Redirecting to your dashboard...
        </p>
        <Button
          type="button"
          variant="primary"
          size="md"
          className="px-8 py-2.5"
          onClick={onContinue}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
