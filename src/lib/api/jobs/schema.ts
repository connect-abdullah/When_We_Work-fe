export enum JobCategory {
  full_time = "full_time",
  part_time = "part_time",
  contract = "contract",
  freelancer = "freelancer",
}
export enum JobStatus {
  active = "active",
  inactive = "inactive",
  completed = "completed",
  cancelled = "cancelled",
}
export enum SalaryType {
  hourly = "hourly",
  fixed = "fixed",
}

export interface JobCreate {
  title: string;
  description: string;
  status: JobStatus;
  minimum_education: string;
  job_category: JobCategory;
  characteristics?: string[]; // optional, may be undefined
  workers_required: number;
  salary: number;
  salary_type?: SalaryType; // optional, may be undefined
  language?: string[]; // optional, may be undefined
  /** ISO datetime string (e.g. from datetime-local or toISOString) */
  from_date_time: string;
  /** ISO datetime string */
  to_date_time: string;
}

export interface JobGetSchema extends JobCreate {
  id: number;
  /** Read-only: backend sets/increments; never sent on create or update from frontend. */
  workers_hired?: number;
}

/** Jobs list API response wrapper. */
export interface JobsListResponseApi {
  success: boolean;
  message: string;
  data: JobGetSchema[];
  errors: unknown;
}

/** Single job API response wrapper (create/update). */
export interface JobSingleResponseApi {
  success: boolean;
  message: string;
  data: JobGetSchema;
  errors: unknown;
}
