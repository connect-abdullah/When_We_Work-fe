"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LoginAsAdminToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export default function LoginAsAdminToggle({
  checked,
  onChange,
  disabled = false,
  className,
}: LoginAsAdminToggleProps) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3 py-2", className)}
    >
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <span className="text-sm text-gray-600">Login as admin</span>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label="Login as admin"
          disabled={disabled}
          onClick={() => onChange(!checked)}
          className={cn(
            "relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-[#5A6ACF]/30 focus:ring-offset-2",
            checked ? "bg-[#5A6ACF]" : "bg-gray-200",
            disabled && "opacity-50 cursor-not-allowed",
          )}
        >
          <span
            className={cn(
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition",
              checked ? "translate-x-5" : "translate-x-0.5",
            )}
          />
        </button>
      </label>
    </div>
  );
}
