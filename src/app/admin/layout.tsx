"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { ADMIN_SIDEBAR_CONFIG } from "@/constants/adminMenu";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-[#F1F2F7] min-h-screen flex flex-row w-full">
      <Sidebar
        menuConfig={ADMIN_SIDEBAR_CONFIG}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-col w-full h-screen">
        <div className="flex flex-col w-full h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
