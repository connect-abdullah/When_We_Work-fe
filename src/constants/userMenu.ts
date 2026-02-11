import {
  Briefcase,
  Calendar,
  ClipboardCheck,
  DollarSign,
  LogOut,
  User,
} from "lucide-react";
import { MenuItem, type SidebarMenuConfig } from "@/types";

export const USER_TOP_MENU_ITEMS: MenuItem[] = [
  { label: "Revenue", link: "/revenue", icon: DollarSign },
  { label: "Job Application", link: "/job-application", icon: Briefcase },
  { label: "Job Status", link: "/job-status", icon: ClipboardCheck },
  { label: "Calendar", link: "/calendar", icon: Calendar },
];

export const USER_BOTTOM_MENU_ITEMS: MenuItem[] = [
  { label: "View Profile", link: "/profile", icon: User },
  { label: "Logout", link: "/auth/login", icon: LogOut },
];

export const USER_SIDEBAR_CONFIG: SidebarMenuConfig = {
  topItems: USER_TOP_MENU_ITEMS,
  bottomItems: USER_BOTTOM_MENU_ITEMS,
  topSectionLabel: "Menu",
  bottomSectionLabel: "Account",
  logoAlt: "WhenWeWork",
};
