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

export interface Booking {
  id: string;
  customerName: string;
  status: "Booked" | "Reserved" | "Cancelled";
  date: string;
  service: string;
  source: "instagram" | "messenger" | "whatsapp" | "sms" | "web";
}

export interface Chat {
  id: string;
  customerName: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  source: "instagram" | "messenger" | "whatsapp" | "sms" | "web";
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

export interface JobSchema {
  id: string;
  title: string;
  description: string;
  email: string;
  phone?: string;
  profileImage?: string;
  minimum_education: string;
  tone: "professional" | "friendly" | "casual" | "formal" | "empathetic";
  characteristics: string[];
  status: "active" | "inactive" | "completed" | "cancelled";
  job_type?: "contract" | "full_time" | "part_time" | "freelance";
  joinDate?: string;
  people_needed: number;
  people_hired: number;
  salary: number;
  salary_type: "per_hour" | "fixed";
  languages?: string[];
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
  middle_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

/** Admin signup – step 2 (contact & profile) */
export interface SignupStep2Data {
  phone: string;
  photo: string | null;
  language: string;
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
