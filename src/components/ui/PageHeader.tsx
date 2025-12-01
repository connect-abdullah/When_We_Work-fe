"use client";
import React from "react";
import { LucideIcon, Menu } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  button?: {
    label: string;
    icon?: LucideIcon;
    onClick?: () => void;
  };
  onMenuToggle?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  button,
  onMenuToggle,
}) => {
  const IconComponent = button?.icon;

  return (
    <div className="flex mx-4 flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Toggle */}
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={20} className="text-gray-700" />
          </button>
        )}
        <div>
          <h1 className="text-sm sm:text-base font-bold text-gray-700">
            {title}
          </h1>
          {description && (
            <p className="text-[10px] text-gray-600 mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {button && (
        <button
          onClick={button.onClick}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#5A6ACF] text-white rounded-lg hover:bg-[#5A6ACF]/90 transition-colors text-[10px] font-medium"
        >
          {IconComponent && <IconComponent size={12} />}
          {button.label}
        </button>
      )}
    </div>
  );
};

export default PageHeader;
