import {
  Bell,
  BookOpen,
  Calendar,
  LayoutDashboard,
  LogOut,
  Settings,
  UserCheck,
  Users,
} from "lucide-react";
import { MenuItem, type SidebarMenuConfig } from "@/types";

export const ADMIN_TOP_MENU_ITEMS: MenuItem[] = [
  { label: "Dashboard", link: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Calendar", link: "/admin/calendar", icon: Calendar },
  { label: "Approval Panel", link: "/admin/approval-panel", icon: BookOpen },
  { label: "Workers", link: "/admin/workers", icon: UserCheck },
  { label: "Jobs", link: "/admin/jobs", icon: Users },
  { label: "Reminder", link: "/admin/reminder", icon: Bell },
];

export const ADMIN_BOTTOM_MENU_ITEMS: MenuItem[] = [
  { label: "Settings", link: "/admin/settings", icon: Settings },
  { label: "Logout", link: "/auth/login", icon: LogOut },
];

export const ADMIN_SIDEBAR_CONFIG: SidebarMenuConfig = {
  topItems: ADMIN_TOP_MENU_ITEMS,
  bottomItems: ADMIN_BOTTOM_MENU_ITEMS,
  topSectionLabel: "Menu",
  bottomSectionLabel: "Settings",
  logoAlt: "WhenWeWork",
};
