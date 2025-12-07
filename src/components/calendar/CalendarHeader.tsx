"use client";

// ============================================================================
// HEADER COMPONENT
// ============================================================================
// This component contains the main navigation bar with all the controls:
// - Today button (jumps to current date and centers current time)
// - Date navigation (previous/next day)
// - Team members button
// - Filter dropdown (select which staff members to show)
// - Settings, refresh, and add buttons

import {
  FaCalendarAlt,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaCog,
  FaSyncAlt,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

// ============================================================================
// INTERFACES
// ============================================================================
interface CalendarHeaderProps {
  onFilterChange: (selectedResources: string[]) => void;
  onDateChange: (date: Date) => void;
}

// ============================================================================
// MAIN HEADER COMPONENT
// ============================================================================
export default function CalendarHeader({
  onFilterChange,
  onDateChange,
}: CalendarHeaderProps) {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  // Control filter dropdown visibility
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Track which staff members are selected in the filter
  const [selectedResources, setSelectedResources] = useState<string[]>([
    "abril",
    "allan",
    "bianca",
  ]);

  // Track the current date being displayed
  const [currentDate, setCurrentDate] = useState(new Date());

  // Reference to filter dropdown for outside click detection
  const filterRef = useRef<HTMLDivElement>(null);

  // ============================================================================
  // STAFF MEMBERS DATA
  // ============================================================================

  const resources = [
    { id: "abril", name: "Abril Lewis" },
    { id: "allan", name: "Allan Hicks" },
    { id: "bianca", name: "Bianca West" },
  ];

  // ============================================================================
  // EFFECTS
  // ============================================================================

  /**
   * Close filter dropdown when clicking outside
   * This provides better UX by automatically closing the dropdown
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Toggle a staff member in the filter selection
   * @param resourceId - ID of the staff member to toggle
   */
  const handleResourceToggle = (resourceId: string) => {
    const newSelection = selectedResources.includes(resourceId)
      ? selectedResources.filter((id) => id !== resourceId) // Remove if already selected
      : [...selectedResources, resourceId]; // Add if not selected

    setSelectedResources(newSelection);
    onFilterChange(newSelection);
  };

  /**
   * Select all staff members in the filter
   */
  const handleSelectAll = () => {
    const allResources = resources.map((r) => r.id);
    setSelectedResources(allResources);
    onFilterChange(allResources);
  };

  /**
   * Deselect all staff members in the filter
   */
  const handleSelectNone = () => {
    setSelectedResources([]);
    onFilterChange([]);
  };

  /**
   * Navigate to the previous day
   */
  const handlePreviousDate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
    onDateChange(newDate);
  };

  /**
   * Navigate to the next day
   */
  const handleNextDate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
    onDateChange(newDate);
  };

  /**
   * Jump to today's date and center the current time
   * This is the main "Today" button functionality
   */
  const handleToday = () => {
    const today = new Date();
    // console.log("Today button clicked, setting date to:", today);
    setCurrentDate(today);
    onDateChange(today);

    // Add visual feedback to the button
    const button = document.querySelector("[data-today-button]") as HTMLElement;
    if (button) {
      button.style.transform = "scale(0.95)";
      button.style.backgroundColor = "#10b981";
      setTimeout(() => {
        button.style.transform = "scale(1)";
        button.style.backgroundColor = "";
      }, 150);
    }
  };

  /**
   * Format date for display in the header
   * @param date - Date to format
   * @returns Formatted date string (e.g., "Mon, Dec 16")
   */
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-9 py-6 shadow-sm">
      <div className="flex items-center justify-between">
        {/* ====================================================================
            LEFT SECTION - Navigation Controls
        ==================================================================== */}
        <div className="flex items-center gap-6">
          {/* TODAY BUTTON */}
          <button
            data-today-button
            onClick={handleToday}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-all duration-150 border border-gray-200 text-base hover:shadow-md active:scale-95"
          >
            Today
          </button>
          {/* DATE NAVIGATION */}
          <div className="flex items-center bg-gray-100 rounded-full border border-gray-200">
            <button
              onClick={handlePreviousDate}
              className="p-3 hover:bg-gray-200 rounded-l-full transition-colors"
              title="Previous day"
            >
              <FaChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="px-6 py-3 text-gray-700 font-medium text-base">
              {formatDate(currentDate)}
            </div>
            <button
              onClick={handleNextDate}
              className="p-3 hover:bg-gray-200 rounded-r-full transition-colors"
              title="Next day"
            >
              <FaChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          {/* TEAM MEMBERS BUTTON */}
          <button
            className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors border border-gray-200"
            title="Team Members"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
          {/* FILTER DROPDOWN */}
          <div className="relative" ref={filterRef}>
            <button
              className={`p-3 rounded-full transition-colors border border-gray-200 flex items-center gap-2 ${
                selectedResources.length < resources.length
                  ? "bg-blue-100 hover:bg-blue-200 text-blue-700"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              title="Filter Staff Members"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              {selectedResources.length < resources.length && (
                <span className="text-sm font-medium">
                  {selectedResources.length}
                </span>
              )}
            </button>
            {/* FILTER DROPDOWN MENU */}
            {isFilterOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-3 border-b border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-900">
                      Filter Resources
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSelectAll}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        All
                      </button>
                      <button
                        onClick={handleSelectNone}
                        className="text-xs text-gray-600 hover:text-gray-800"
                      >
                        None
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  {resources.map((resource) => (
                    <label
                      key={resource.id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedResources.includes(resource.id)}
                        onChange={() => handleResourceToggle(resource.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">
                        {resource.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* ====================================================================
            CENTER SECTION - Empty space for layout balance
        ==================================================================== */}
        <div className="flex-1"></div>
        {/* ====================================================================
            RIGHT SECTION - Action Buttons
        ==================================================================== */}
        <div className="flex items-center gap-6">
          {/* SETTINGS BUTTON */}
          <button
            className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors border border-gray-200"
            title="Settings"
          >
            <FaCog className="w-5 h-5" />
          </button>
          {/* CALENDAR WITH CLOCK BUTTON */}
          <button
            className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors relative border border-gray-200"
            title="Calendar Settings"
          >
            <FaCalendarAlt className="w-5 h-5" />
            <FaClock className="w-3 h-3 absolute -top-1 -right-1 text-gray-500" />
          </button>
          {/* REFRESH BUTTON */}
          <button
            className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors border border-gray-200"
            title="Refresh"
          >
            <FaSyncAlt className="w-5 h-5" />
          </button>
          {/* VIEW SELECTOR */}
          <div className="flex items-center bg-gray-100 rounded-full border border-gray-200">
            <div className="px-6 py-3 text-gray-700 font-medium text-base">
              Day
            </div>
            <button
              className="p-3 hover:bg-gray-200 rounded-r-full transition-colors"
              title="Change View"
            >
              <FaChevronDown className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          {/* ADD BUTTON */}
          <button
            className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-medium transition-colors flex items-center gap-2 text-base"
            title="Add Event"
          >
            Add
            <FaChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
