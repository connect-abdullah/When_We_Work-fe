import React from "react";
import {
  AlertCircle,
  Award,
  Calendar,
  Clock,
  DollarSign,
  Globe,
  Instagram,
  LucideIcon,
  Mail,
  MessageCircle,
  MessageSquare,
  Percent,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";

// Source channel icons
export const getSourceIcon = (
  iconName: string,
  size: number = 12,
  className?: string
): React.ReactNode => {
  const iconMap: Record<string, LucideIcon> = {
    instagram: Instagram,
    messenger: MessageCircle,
    whatsapp: MessageCircle,
    sms: Mail,
    web: Globe,
  };

  const IconComponent = iconMap[iconName.toLowerCase()] || Globe;
  return <IconComponent size={size} className={className} />;
};

// Insight icons
export const getInsightIcon = (
  iconName: string,
  size: number = 14,
  className?: string
): React.ReactNode => {
  const iconMap: Record<string, LucideIcon> = {
    users: Users,
    usercheck: UserCheck,
    percent: Percent,
    messagesquare: MessageSquare,
    alertcircle: AlertCircle,
    clock: Clock,
    calendar: Calendar,
    trendingup: TrendingUp,
    dollarsign: DollarSign,
    award: Award,
  };

  const IconComponent = iconMap[iconName.toLowerCase()] || Users;
  return <IconComponent size={size} className={className} />;
};

// Source color helper
export const getSourceColor = (source: string): string => {
  switch (source.toLowerCase()) {
    case "instagram":
      return "bg-pink-50 text-pink-700 border-pink-200";
    case "messenger":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "whatsapp":
      return "bg-green-50 text-green-700 border-green-200";
    case "sms":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "web":
      return "bg-gray-50 text-gray-700 border-gray-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

// Status color helper
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "vip":
      return "bg-purple-100 text-purple-800";
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Currency formatter
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Date formatter
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
