import React from "react";
import { Bell, Search, Menu, User } from "lucide-react";
import Input from "@/components/ui/Input";

interface NavbarProps {
  className?: string;
  onMenuToggle?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ className, onMenuToggle }) => {
  return (
    <>
      <div
        className={`h-[80px] flex flex-row items-center px-4 mb-2 sm:px-6 justify-between bg-white border-b p-4 border-gray-200 ${className || ""}`}
      >
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-gray-600 hover:text-[#5A6ACF] transition-colors rounded-lg hover:bg-gray-50"
        >
          <Menu size={20} />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-md lg:max-w-lg flex flex-row items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 mx-2 lg:mx-4 border border-gray-200 focus-within:border-[#5A6ACF] focus-within:bg-white transition-all">
          <Search size={14} className="text-gray-400 shrink-0" />
          <Input
            type="text"
            placeholder="Search..."
            className="w-full p-0 text-[10px] font-medium hover:outline-none focus-visible:outline-none text-[#1F384C] placeholder:text-gray-400 border-0 focus:ring-0 bg-transparent"
          />
        </div>

        {/* Right Side Actions */}
        <div className="flex flex-row items-center gap-3">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-[#5A6ACF] hover:bg-gray-50 rounded-lg transition-all">
            <Bell size={16} />
            {/* Notification Badge */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* User Profile */}
          <button className="flex items-center gap-2 p-1.5 pr-3 hover:bg-gray-50 rounded-lg transition-all">
            <div className="w-8 h-8 bg-linear-to-br from-[#5A6ACF] to-[#4A5ABF] rounded-full flex items-center justify-center text-white shadow-sm">
              <User size={14} />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-[10px] font-semibold text-[#1F384C] leading-tight">
                Admin User
              </p>
              <p className="text-[8px] text-gray-500">admin@whenwework.com</p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
