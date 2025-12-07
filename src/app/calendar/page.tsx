"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import MyCalendar from "@/components/calendar/MyCalendar";
import { Card } from "@/components/ui";
import {
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react";

export default function CalendarPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filteredResources, setFilteredResources] = useState<string[]>([
    "abril",
    "allan",
    "bianca",
  ]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Calendar stats
  const _stats = [
    {
      title: "Today's Bookings",
      value: "18",
      change: "+3",
      changeType: "positive" as const,
      icon: <Calendar size={14} />,
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-50",
    },
    {
      title: "Pending",
      value: "5",
      change: "+2",
      changeType: "positive" as const,
      icon: <Clock size={14} />,
      iconColor: "text-orange-600",
      iconBgColor: "bg-orange-50",
    },
    {
      title: "Confirmed",
      value: "13",
      change: "+1",
      changeType: "positive" as const,
      icon: <CheckCircle size={14} />,
      iconColor: "text-green-600",
      iconBgColor: "bg-green-50",
    },
    {
      title: "Total This Week",
      value: "87",
      change: "+12%",
      changeType: "positive" as const,
      icon: <TrendingUp size={14} />,
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-50",
    },
  ];

  const resources = [
    { id: "abril", name: "Abril Lewis" },
    { id: "allan", name: "Allan Hicks" },
    { id: "bianca", name: "Bianca West" },
  ];

  const handlePreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const toggleResource = (resourceId: string) => {
    const newSelection = filteredResources.includes(resourceId)
      ? filteredResources.filter((id) => id !== resourceId)
      : [...filteredResources, resourceId];
    setFilteredResources(newSelection);
  };

  return (
    <div className="bg-[#F1F2F7] min-h-screen flex flex-row w-full">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-col w-full h-screen">
        <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex flex-col w-full h-full px-2 sm:px-4 overflow-y-auto">
          {/* Calendar Controls */}
          <div className="m-1 sm:m-2">
            <Card className="bg-white p-2">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                {/* Left: Date Navigation */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToday}
                    className="px-3 py-1.5 bg-[#5A6ACF] hover:bg-[#5A6ACF]/90 text-white rounded-md text-[9px] font-medium transition-colors"
                  >
                    Today
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handlePreviousDay}
                      className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <ChevronLeft size={14} className="text-gray-600" />
                    </button>
                    <span className="text-[10px] font-medium text-[#1F384C] min-w-[200px] text-center">
                      {formatDate(selectedDate)}
                    </span>
                    <button
                      onClick={handleNextDay}
                      className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <ChevronRight size={14} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                  {/* Staff Filter */}
                  <div className="relative">
                    <button
                      onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[9px] font-medium transition-colors ${
                        filteredResources.length < resources.length
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Users size={12} />
                      <span>Staff ({filteredResources.length})</span>
                      <Filter size={10} />
                    </button>

                    {showFilterDropdown && (
                      <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <div className="p-2">
                          <p className="text-[9px] font-medium text-gray-700 mb-1.5 px-2">
                            Filter Staff
                          </p>
                          {resources.map((resource) => (
                            <label
                              key={resource.id}
                              className="flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={filteredResources.includes(
                                  resource.id
                                )}
                                onChange={() => toggleResource(resource.id)}
                                className="w-3 h-3 text-[#5A6ACF] border-gray-300 rounded focus:ring-[#5A6ACF]"
                              />
                              <span className="text-[10px] text-gray-700">
                                {resource.name}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#5A6ACF] hover:bg-[#5A6ACF]/90 text-white rounded-md text-[9px] font-medium transition-colors">
                    <Plus size={12} />
                    New Booking
                  </button>
                </div>
              </div>
            </Card>
          </div>

          {/* Calendar */}
          <div className="m-1 sm:m-2 flex-1">
            <MyCalendar
              filteredResources={filteredResources}
              selectedDate={selectedDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
