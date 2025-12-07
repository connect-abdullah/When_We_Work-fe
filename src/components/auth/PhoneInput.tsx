import React, { useState, useRef, useEffect } from 'react';
import { COUNTRY_CODES } from '@/constants/countrycodes';
import { parsePhoneNumber } from 'libphonenumber-js';

interface PhoneInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  error,
  required = false,
  className = "",
  icon
}) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState('+1');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getCountryFromCode = (code: string) => {
    return COUNTRY_CODES.find(country => country.code === code);
  };

  const getPhonePlaceholder = () => {
    const country = getCountryFromCode(selectedCountryCode);
    if (country?.country === 'US' || country?.country === 'CA') {
      return '1234567890';
    }
    return 'Enter phone number';
  };

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-center gap-2 ">
        {icon && <span className="text-gray-400">{icon}</span>}
        <label className="text-xs font-medium text-[#1F384C]">
          Phone Number
        </label>
        {required && <span className="text-red-500">*</span>}
      </div>
      <div className="flex text-xs m-1 text-gray-600">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center px-3 py-2 text-xs border border-gray-300 rounded-l-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5A6ACF] focus:border-transparent"
          >
            <span className="mr-1">{COUNTRY_CODES.find(c => c.code === selectedCountryCode)?.flag}</span>
            <span>{selectedCountryCode}</span>
            <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {COUNTRY_CODES.map((country) => (
                <button
                  key={`${country.code}-${country.country}`}
                  type="button"
                  onClick={() => {
                    setSelectedCountryCode(country.code);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2">{country.flag}</span>
                  <span className="mr-2">{country.code}</span>
                  <span className="text-gray-500">{country.country}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <input
          name="phone"
          type="tel"
          value={value}
          onChange={onChange}
          placeholder={getPhonePlaceholder()}
          className={`flex-1 px-3 py-2 text-xs border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#5A6ACF] focus:border-transparent ${
            error ? 'border-red-500' : ''
          }`}
          required={required}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
      {value && !error && (() => {
        try {
          const fullPhoneNumber = `${selectedCountryCode}${value}`;
          const phoneNumber = parsePhoneNumber(fullPhoneNumber);
          if (phoneNumber && phoneNumber.isValid()) {
            return (
              <div className="flex items-center text-xs text-green-600">
                <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {phoneNumber.formatInternational()}
              </div>
            );
          }
        } catch (error) {
          // Ignore parsing errors
        }
        return null;
      })()}
    </div>
  );
};

export default PhoneInput;
