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
export enum ToneRequirement {
  professional = "professional",
  casual = "casual",
  formal = "formal",
  friendly = "friendly",
  empathic = "empathetic",
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
    tone_requirement: ToneRequirement;
    characteristics?: string[];     // optional, may be undefined
    workers_required: number;
    workers_hired: number;
    salary: number;
    salary_type?: SalaryType;       // optional, may be undefined
    language?: string[];            // optional, may be undefined
    admin_id: number;
}

export interface JobGetSchema extends JobCreate {
  id: number;
}

/** Jobs list API response wrapper. */
export interface JobsListResponseApi {
  success: boolean;
  message: string;
  data: JobGetSchema[];
  errors: unknown;
}
