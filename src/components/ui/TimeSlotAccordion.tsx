"use client";

import React from "react";

interface TimeSlotAccordionProps {
  title: string;
  icon: string;
  iconBg: string;
  slots: string[];
  isExpanded: boolean;
  selectedSlot: string;
  onToggle: () => void;
  onSlotSelect: (slot: string) => void;
  slotsCount?: number;
}

const TimeSlotAccordion: React.FC<TimeSlotAccordionProps> = ({
  title,
  icon,
  iconBg,
  slots,
  isExpanded,
  selectedSlot,
  onToggle,
  onSlotSelect,
  slotsCount,
}) => {
  const displayCount = slotsCount ?? slots.length;

  return (
    <>
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-1.5 rounded-lg border transition-all ${
          isExpanded
            ? "border-[#5A6ACF] shadow-[0_0_0_2px_rgba(90,106,207,0.25)]"
            : "border-gray-200"
        }`}
      >
        <div className="flex items-center gap-1">
          <div
            className={`w-5 h-5 ${iconBg} rounded-full flex items-center justify-center`}
          >
            <span className="text-white text-[10px]">{icon}</span>
          </div>
          <div className="text-left">
            <div className="text-[10px] font-semibold text-gray-900">
              {title}
            </div>
            <div className="text-[8px] text-gray-500">
              {displayCount} available slots
            </div>
          </div>
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isExpanded ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.937a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isExpanded && (
        <div className="grid grid-cols-2 gap-2">
          {slots.map((slot) => (
            <button
              key={slot}
              onClick={() => onSlotSelect(slot)}
              className={`p-1 rounded-md border text-[10px] transition-all ${
                selectedSlot === slot
                  ? "border-[#5A6ACF] bg-[#5A6ACF] text-white"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default TimeSlotAccordion;
