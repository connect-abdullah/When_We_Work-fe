"use client";

import React from "react";
import LayoutShell from "@/components/layout/LayoutShell";
import { USER_SIDEBAR_CONFIG } from "@/constants/userMenu";

/**
 * Client-only wrapper that provides the user sidebar config to LayoutShell.
 * Must be used from Server Components instead of passing menuConfig (which
 * contains icon components and cannot be serialized).
 */
export default function UserLayoutShellWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutShell
      menuConfig={USER_SIDEBAR_CONFIG}
      excludePathPrefixes={["/admin", "/auth"]}
    >
      {children}
    </LayoutShell>
  );
}
