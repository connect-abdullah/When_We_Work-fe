"use client";

import React from "react";
import { PageHeader } from "@/components/ui";
import JobCalendar from "@/components/shared/JobCalendar";

export default function CalendarPage() {
  return (
    <div className="flex flex-col w-full h-full pt-4 px-2 sm:px-4 overflow-y-auto">
      <PageHeader
        title="Job Calendar"
        description="View all available jobs and their schedules"
      />

      <div className="px-2 sm:px-4 pb-8 mt-4">
        <JobCalendar showApplyButton={true} />
      </div>
    </div>
  );
}
