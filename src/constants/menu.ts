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
import { MenuItem } from "@/types";

export const TOP_MENU_ITEMS: MenuItem[] = [
  { label: "Dashboard", link: "/dashboard", icon: LayoutDashboard },
  { label: "Calendar", link: "/calendar", icon: Calendar },
  { label: "Approval Panel", link: "/approval-panel", icon: BookOpen },
  { label: "Workers", link: "/workers", icon: UserCheck },
  { label: "Jobs", link: "/jobs", icon: Users },
  { label: "Reminder", link: "/reminder", icon: Bell },
];

export const BOTTOM_MENU_ITEMS: MenuItem[] = [
  { label: "Settings", link: "/settings", icon: Settings },
  { label: "Logout", link: "/auth/login", icon: LogOut },
];
