"use client";

import React from "react";
import Image from "next/image";
import Logo from "../../../public/Logo.png";
import { TOP_MENU_ITEMS, BOTTOM_MENU_ITEMS } from "@/constants/menu";
import { MenuItem } from "@/types";
import Link from "next/link";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  className,
  isOpen = true,
  onToggle,
}) => {
  const pathname = usePathname();

  const renderMenuItem = (item: MenuItem, index: number) => {
    const isActive =
      pathname === item.link || pathname.startsWith(item.link + "/");

    return (
      <Link href={item.link} passHref key={index}>
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
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        bg-[#29232f] h-screen px-4 py-6 transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        fixed lg:relative lg:translate-x-0
        w-[240px] z-50 shadow-lg
        ${className || ""}
      `}
      >
        {/* Close button for mobile */}
        <button
          onClick={onToggle}
          className="lg:hidden absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Logo */}
        <div className="mb-6 px-2">
          <Image
            src={Logo}
            alt="BookleeAI"
            width={100}
            height={100}
            className="rounded-lg"
          />
        </div>

        <div className="h-px bg-white/20 mb-4"></div>

        {/* Menu Section */}
        <div className="mb-6">
          <label className="text-[9px] font-semibold text-white/60 uppercase tracking-wider px-3 mb-2 block">
            Menu
          </label>
          <div className="space-y-1">{TOP_MENU_ITEMS.map(renderMenuItem)}</div>
        </div>

        {/* Settings Section */}
        <div>
          <label className="text-[9px] font-semibold text-white/60 uppercase tracking-wider px-3 mb-2 block">
            Settings
          </label>
          <div className="space-y-1">
            {BOTTOM_MENU_ITEMS.map(renderMenuItem)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
