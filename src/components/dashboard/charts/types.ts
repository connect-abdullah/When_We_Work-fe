// Chart data types
export interface DailyData {
  day: string;
  booked: number;
  revenue: number;
}

export interface MonthlyData {
  month: string;
  consultation: number;
  medicalCheckup: number;
}

export interface DiagnosisData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

export interface TooltipPayload {
  name: string;
  value: number;
  color: string;
  payload?: {
    day?: string;
    month?: string;
    booked?: number;
    revenue?: number;
  };
}

export interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

export interface PlatformConversionData {
  platform: string;
  inquiries: number;
  conversions: number;
  conversionRate?: number;
}

