"use client";

import React, { useRef } from "react";
import { Camera, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoUploadProps {
  value: string | File | null;
  onChange: (file: File | null, previewUrl: string | null) => void;
  label?: string;
  error?: string;
  className?: string;
  accept?: string;
}

export default function PhotoUpload({
  value,
  onChange,
  label = "Photo",
  error,
  className,
  accept = "image/*",
}: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const previewUrl =
    typeof value === "string"
      ? value
      : value instanceof File
        ? URL.createObjectURL(value)
        : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const url = URL.createObjectURL(file);
      onChange(file, url);
    } else {
      onChange(null, null);
    }
  };

  const handleClear = () => {
    onChange(null, null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={cn("space-y-2 w-full", className)}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="flex items-center gap-4">
        <div
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex h-24 w-24 shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 transition-colors hover:bg-gray-100",
            error ? "border-red-500" : "border-gray-300",
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <Camera size={28} className="text-gray-400" />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-xs font-medium text-[#5A6ACF] hover:text-[#4A5ABF]"
          >
            {previewUrl ? "Change photo" : "Upload photo"}
          </button>
          {previewUrl && (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-600"
            >
              <X size={12} />
              Remove
            </button>
          )}
        </div>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
