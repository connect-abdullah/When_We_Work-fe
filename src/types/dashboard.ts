// Dashboard-specific type definitions

export type DateRange = "today" | "7days" | "30days" | "custom";

export interface DateRangeOption {
  value: DateRange;
  label: string;
}

export const DATE_RANGE_OPTIONS: DateRangeOption[] = [
  { value: "today", label: "Today" },
  { value: "7days", label: "Last 7 days" },
  { value: "30days", label: "Last 30 days" },
];
