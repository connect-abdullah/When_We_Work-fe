import { LucideIcon } from "lucide-react";

export interface MenuItem {
  label: string;
  link: string;
  icon: LucideIcon;
}

export interface SidebarMenuConfig {
  topItems: MenuItem[];
  bottomItems: MenuItem[];
  topSectionLabel?: string;
  bottomSectionLabel?: string;
  logoAlt?: string;
}

export interface DashboardCard {
  title: string;
  value: string;
  bgColor: string;
  icon: React.ReactNode;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Payment {
  id: string;
  customerName: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
  date: string;
  service: string;
}

export interface SalesAgent {
  id: string;
  name: string;
  avatar?: string;
  appointmentsClosed: number;
  dealsWon: number;
  conversionRate: number;
  revenue: number;
}

/** Admin signup – step 1 (personal) */
export interface SignupStep1Data {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

/** Admin signup – step 2 (contact & profile) */
export interface SignupStep2Data {
  phone: string;
  photo: string | null;
  gender: string;
}

/** Admin signup – step 3 (business) */
export interface SignupBusinessData {
  business_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  description: string;
}

export interface AdminSignupPayload extends SignupStep1Data, SignupStep2Data {
  business: SignupBusinessData;
}
