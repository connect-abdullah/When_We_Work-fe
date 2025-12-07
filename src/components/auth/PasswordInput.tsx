import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  showMatchIndicator?: boolean;
  isMatch?: boolean | "";
  className?: string;
  icon?: React.ReactNode;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  value,
  onChange,
  placeholder = "Enter password",
  label,
  error,
  required = false,
  showMatchIndicator = false,
  isMatch = false,
  className = "",
  icon
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`space-y-2 w-full ${className}`}>
      {label && (
        <div className="flex items-center gap-2">
          {icon && <span className="text-gray-400 shrink-0">{icon}</span>}
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
          {required && <span className="text-red-500 text-sm">*</span>}
        </div>
      )}
      <div className="relative">
        <input
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 pr-12 text-sm border text-gray-900 placeholder:text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A6ACF]/20 focus:border-[#5A6ACF] transition-all bg-white ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
          }`}
          required={required}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-600 transition-colors"
        >
          {showPassword ? (
            <EyeOff size={18} className="text-gray-400" />
          ) : (
            <Eye size={18} className="text-gray-400" />
          )}
        </button>
      </div>
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
      {showMatchIndicator && value && isMatch && (
        <div className="flex items-center text-xs text-green-600">
          <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Passwords match
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
