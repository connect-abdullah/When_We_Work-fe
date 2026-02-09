"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import type { SidebarMenuConfig } from "@/types";

interface LayoutShellProps {
  children: React.ReactNode;
  menuConfig: SidebarMenuConfig;
  /** Optional header (e.g. Navbar). Rendered above main content when sidebar is shown. */
  header?: React.ReactNode;
  /** When set, sidebar is hidden on paths that start with any of these (e.g. ["/admin", "/auth"]). */
  excludePathPrefixes?: string[];
}

export default function LayoutShell({
  children,
  menuConfig,
  header,
  excludePathPrefixes,
}: LayoutShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const shouldHideSidebar =
    excludePathPrefixes?.some((p) => pathname?.startsWith(p)) ?? false;

  if (shouldHideSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="bg-[#F1F2F7] h-screen flex flex-row w-full overflow-hidden">
      <Sidebar
        menuConfig={menuConfig}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex flex-col flex-1 w-full h-screen overflow-hidden">
        {header}
        <div className="flex flex-col w-full h-full flex-1 min-h-0 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
