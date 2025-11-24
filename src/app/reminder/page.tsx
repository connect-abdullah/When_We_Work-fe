import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function ReminderPage() {
  return (
    <div className="bg-[#F1F2F7] font-poppins  min-h-screen flex flex-row w-full">
      {/* Sidebar */}

      <Sidebar />

      <div className="flex flex-col w-full h-screen ">
        {/* Header */}
        <Navbar />

        <div className="flex flex-col w-full h-full px-4">
          <h1 className="text-xl font-medium text-[#1F384C] p-4">Reminder</h1>
          <p>Coming soon...</p>
        </div>
      </div>
    </div>
  );
}
