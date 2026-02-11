"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";
import { Card } from "@/components/ui";
import { getJobs } from "@/lib/api/jobs";
import type { JobGetSchema } from "@/lib/api/jobs/schema";
import {
  createJobApplication,
  getJobApplications,
} from "@/lib/api/job-applications";
import {
  JobApplicationCreate,
  JobApplicationStatus,
} from "@/lib/api/job-applications/schema";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  GraduationCap,
  Target,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

interface JobCalendarProps {
  /** Whether to show the apply button in the job detail modal */
  showApplyButton?: boolean;
  /** Optional callback when a job is applied (only used if showApplyButton is true) */
  onJobApplied?: (jobId: number) => void;
}

export default function JobCalendar({
  showApplyButton = false,
  onJobApplied,
}: JobCalendarProps) {
  const [jobs, setJobs] = useState<JobGetSchema[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<JobGetSchema | null>(null);
  const [isApplying, setIsApplying] = useState<number | null>(null);
  const calendarRef = useRef<FullCalendar>(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const [jobsList, applicationsRes] = await Promise.all([
        getJobs(),
        showApplyButton ? getJobApplications() : Promise.resolve(null),
      ]);
      setJobs(jobsList ?? []);
      if (showApplyButton && applicationsRes) {
        const appliedIds =
          applicationsRes?.data?.map((a) => a.job_id).filter(Boolean) ?? [];
        setAppliedJobs(new Set(appliedIds));
      }
    } catch {
      setJobs([]);
      setAppliedJobs(new Set());
    } finally {
      setLoading(false);
    }
  }, [showApplyButton]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Convert jobs to calendar events
  const calendarEvents = jobs
    .filter((job) => job.status === "active") // Only show active jobs
    .map((job) => {
      const start = job.from_date_time ? new Date(job.from_date_time) : null;
      const end = job.to_date_time ? new Date(job.to_date_time) : null;

      if (!start || !end) {
        return null;
      }

      const isApplied = showApplyButton && appliedJobs.has(job.id);

      return {
        id: String(job.id),
        title: job.title,
        start: start.toISOString(),
        end: end.toISOString(),
        extendedProps: {
          job: job,
        },
        backgroundColor: isApplied
          ? "#9CA3AF" // Gray if applied
          : "#5A6ACF", // Blue if not applied
        borderColor: isApplied ? "#6B7280" : "#4A5ABF",
        textColor: "#FFFFFF",
      };
    })
    .filter(Boolean) as Array<{
    id: string;
    title: string;
    start: string;
    end: string;
    extendedProps: { job: JobGetSchema };
    backgroundColor: string;
    borderColor: string;
    textColor: string;
  }>;

  const handleEventClick = (clickInfo: EventClickArg) => {
    const job = clickInfo.event.extendedProps.job as JobGetSchema;
    if (job) {
      setSelectedJob(job);
    }
  };

  const handleApply = async (jobId: number) => {
    if (!showApplyButton) {
        return;
      }

    setIsApplying(jobId);
    const payload: JobApplicationCreate = {
      job_id: jobId,
      approved_status: JobApplicationStatus.applied,
    };
    try {
      const response = await createJobApplication(payload);
      if (response?.success) {
        setAppliedJobs((prev) => new Set([...prev, jobId]));
        await fetchJobs(); // Refresh to update calendar colors
        setSelectedJob(null); // Close modal after applying
        onJobApplied?.(jobId);
      }
    } catch {
      // handle error
    } finally {
      setIsApplying(null);
    }
  };

  const handlePrevious = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.prev();
    }
  };

  const handleNext = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.next();
    }
  };

  const handleToday = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.today();
    }
  };

  return (
    <>
      {/* Calendar Controls */}
      <Card className="bg-white p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleToday}
              className="px-3 py-1.5 bg-[#5A6ACF] hover:bg-[#5A6ACF]/90 text-white rounded-md text-[10px] font-medium transition-colors"
            >
              Today
            </button>
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevious}
                className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ChevronLeft size={16} className="text-gray-600" />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ChevronRight size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
          {showApplyButton && (
            <div className="flex items-center gap-4 text-[10px] text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#5A6ACF]"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#9CA3AF]"></div>
                <span>Applied</span>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Calendar */}
      {loading ? (
        <Card className="p-8 text-center">
          <p className="text-sm text-gray-600">Loading calendar...</p>
        </Card>
      ) : (
        <Card className="bg-white p-4">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "",
              center: "title",
              right: "",
            }}
            events={calendarEvents}
            eventClick={handleEventClick}
            height="auto"
            eventDisplay="block"
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }}
            slotMinTime="00:00:00"
            slotMaxTime="24:00:00"
            allDaySlot={false}
            weekends={true}
            editable={false}
            selectable={false}
            dayMaxEvents={true}
            moreLinkClick="popover"
          />
        </Card>
      )}

      {/* Job Detail Modal */}
      {selectedJob && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-semibold text-[#1F384C]">
                    {selectedJob.title ?? ""}
                  </h2>
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                      selectedJob.status === "active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-gray-50 text-gray-700 border-gray-200"
                    }`}
                  >
                    {(selectedJob.status ?? "inactive")
                      .charAt(0)
                      .toUpperCase() +
                      (selectedJob.status ?? "inactive").slice(1)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Description
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {selectedJob.description ?? ""}
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={16} className="text-blue-600" />
                    <span className="text-xs text-gray-600">Hired</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedJob.workers_hired ?? 0}
                  </p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Target size={16} className="text-emerald-600" />
                    <span className="text-xs text-gray-600">Needed</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedJob.workers_required ?? 0}
                  </p>
                </div>
                <div className="p-4 bg-violet-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign size={16} className="text-violet-600" />
                    <span className="text-xs text-gray-600">Salary</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    ${selectedJob.salary ?? 0}
                  </p>
                </div>
                <div className="p-4 bg-amber-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={16} className="text-amber-600" />
                    <span className="text-xs text-gray-600">Hiring Rate</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedJob.workers_required
                      ? Math.round(
                          ((selectedJob.workers_hired ?? 0) /
                            selectedJob.workers_required) *
                            100,
                        )
                      : 0}
                    %
                  </p>
                </div>
              </div>

              {/* Job Details */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Job Details
                </h3>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-0.5">Salary Type</p>
                    <p className="text-sm font-medium text-gray-900">
                      {(selectedJob.salary_type ?? "hourly") === "hourly"
                        ? "Per Hour"
                        : "Fixed"}
                    </p>
                  </div>
                  {selectedJob.from_date_time && selectedJob.to_date_time && (
                    <div className="flex gap-3 p-3 bg-slate-50/80 rounded-lg border border-slate-100">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white border border-slate-100 shrink-0">
                        <Clock
                          size={18}
                          className="text-slate-500"
                          strokeWidth={2}
                        />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Schedule
                        </p>
                        <div className="space-y-1 text-sm text-slate-800 tabular-nums">
                          <p>
                            <span className="text-slate-500 font-medium">
                              From
                            </span>{" "}
                            {new Date(selectedJob.from_date_time).toLocaleString()}
                          </p>
                          <p>
                            <span className="text-slate-500 font-medium">To</span>{" "}
                            {new Date(selectedJob.to_date_time).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedJob.minimum_education && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <GraduationCap size={16} className="text-gray-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 mb-0.5">
                          Minimum Education
                        </p>
                        <p className="text-sm text-gray-900">
                          {selectedJob.minimum_education}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Characteristics */}
              {selectedJob.characteristics &&
                selectedJob.characteristics.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      Characteristics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.characteristics.map((char, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg"
                        >
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            {/* Apply Button Section - Only shown if showApplyButton is true */}
            {showApplyButton && (
              <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4">
                {appliedJobs.has(selectedJob.id) ? (
                  <button
                    disabled
                    className="w-full px-4 py-2.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium cursor-not-allowed"
                  >
                    Already Applied
                  </button>
                ) : (
                  <button
                    onClick={() => handleApply(selectedJob.id)}
                    disabled={isApplying === selectedJob.id}
                    className="w-full px-4 py-2.5 bg-[#5A6ACF] hover:bg-[#5A6ACF]/90 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isApplying === selectedJob.id ? "Applying..." : "Apply Now"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
