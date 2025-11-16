import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  label: string;
  link: string;
  icon: LucideIcon;
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
  status: 'Booked' | 'Reserved' | 'Cancelled';
  date: string;
  service: string;
  source: 'instagram' | 'messenger' | 'whatsapp' | 'sms' | 'web';
}

export interface Chat {
  id: string;
  customerName: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  source: 'instagram' | 'messenger' | 'whatsapp' | 'sms' | 'web';
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
  status: 'Completed' | 'Pending' | 'Failed';
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

export interface SalesRepresentative {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
  education: string;
  tone: 'professional' | 'friendly' | 'casual' | 'formal' | 'empathetic';
  characteristics: string[];
  status: 'active' | 'inactive' | 'on-leave';
  joinDate: string;
  assignedCustomers: number;
  appointmentsClosed: number;
  dealsWon: number;
  conversionRate: number;
  revenue: number;
  rating: number;
  specialties?: string[];
  languages?: string[];
  bio?: string;
}
