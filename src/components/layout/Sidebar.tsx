"use client";

import React from "react";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import { MenuItem, type SidebarMenuConfig } from "@/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";
import { clearAuthStorage } from "@/lib/auth";

export type { SidebarMenuConfig };

interface SidebarProps {
  menuConfig: SidebarMenuConfig;
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({
  menuConfig,
  className,
  isOpen = true,
  onToggle,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    topItems,
    bottomItems,
    topSectionLabel = "Menu",
    bottomSectionLabel = "Account",
    logoAlt = "WhenWeWork",
  } = menuConfig;

  const handleLogout = () => {
    clearAuthStorage();
    router.push("/auth/login");
  };

  const renderMenuItem = (item: MenuItem, index: number) => {
    const isActive =
      pathname === item.link || pathname.startsWith(item.link + "/");
    const isLogout = item.label === "Logout";

    const content = (
      <div
        className={`
          flex flex-row items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
          ${
            isActive
              ? "bg-white text-[#5A6ACF] shadow-sm"
              : "text-white/80 hover:bg-white/10 hover:text-white"
          }
        `}
      >
        <item.icon size={14} />
        <span className="text-[10px] font-medium">{item.label}</span>
      </div>
    );

    if (isLogout) {
      return (
        <button
          type="button"
          onClick={handleLogout}
          key={index}
          className="w-full text-left"
        >
          {content}
        </button>
      );
    }

    return (
      <Link href={item.link} passHref key={index}>
        {content}
      </Link>
    );
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <div
        className={`
        bg-[#29232f] h-screen px-4 py-6 transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        fixed lg:relative lg:translate-x-0
        w-[240px] z-50 shadow-lg
        ${className || ""}
      `}
      >
        <button
          onClick={onToggle}
          className="lg:hidden absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="mb-6 px-2">
          <Image
            src={Logo}
            alt={logoAlt}
            width={100}
            height={100}
            className="rounded-lg"
          />
        </div>

        <div className="h-px bg-white/20 mb-4" />

        <div className="mb-6">
          <label className="text-[9px] font-semibold text-white/60 uppercase tracking-wider px-3 mb-2 block">
            {topSectionLabel}
          </label>
          <div className="space-y-1">{topItems.map(renderMenuItem)}</div>
        </div>

        <div>
          <label className="text-[9px] font-semibold text-white/60 uppercase tracking-wider px-3 mb-2 block">
            {bottomSectionLabel}
          </label>
          <div className="space-y-1">{bottomItems.map(renderMenuItem)}</div>
        </div>
      </div>
    </>
  );
}
