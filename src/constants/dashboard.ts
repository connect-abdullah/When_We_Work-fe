import { Booking, Chat, Payment, SalesAgent } from '@/types';

export interface DashboardCardData {
  title: string;
  value: string;
  bgColor: string;
  iconName: 'DollarSign' | 'Calendar' | 'Users' | 'Workflow';
  iconColor: string;
}

export const DASHBOARD_CARDS: DashboardCardData[] = [
  {
    title: "Total Revenue",
    value: "$20,000",
    bgColor: "bg-green-100",
    iconName: "DollarSign",
    iconColor: "text-green-600"
  },
  {
    title: "Total Bookings", 
    value: "120",
    bgColor: "bg-blue-100",
    iconName: "Calendar",
    iconColor: "text-blue-600"
  },
  {
    title: "Total Customers",
    value: "20", 
    bgColor: "bg-yellow-100",
    iconName: "Users",
    iconColor: "text-yellow-600"
  },
  {
    title: "New Customers",
    value: "20",
    bgColor: "bg-purple-100", 
    iconName: "Workflow",
    iconColor: "text-purple-600"
  },
  {
    title: "Returning Customers",
    value: "40",
    bgColor: "bg-red-100", 
    iconName: "Workflow",
    iconColor: "text-purple-600"
  }
];
