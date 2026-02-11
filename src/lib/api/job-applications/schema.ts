export enum JobApplicationStatus {
  applied = "applied",
  approved = "approved",
  rejected = "rejected",
}

export interface JobApplicationCreate {
  job_id: number;
  approved_status?: JobApplicationStatus;
}
export interface JobApplicationRead {
  id: number;
  job_id: number;
  worker_id: number;
  approved_status?: JobApplicationStatus;
}

export interface JobApplicationResponse {
  success: boolean;
  message: string;
  data?: JobApplicationRead;
  errors: unknown;
}
export interface JobApplicationListResponse {
  success: boolean;
  message: string;
  data?: JobApplicationRead[];
  errors: unknown;
}

/** GET /job_applications/approval-panel – item per application (worker + job). id required for PUT. */
export interface ApprovalPanelItem {
  id: number;
  job_id: number;
  job_name: string;
  worker_id: number;
  worker_name: string;
  worker_email: string;
  availability: boolean;
  gender: string;
  employment_type?: string | null;
  approved_status?: JobApplicationStatus;
  workers_required?: number;
  workers_hired?: number | null;
}

export interface ApprovalPanelListResponse {
  success: boolean;
  message: string;
  data?: ApprovalPanelItem[];
  errors: unknown;
}

/** PUT /job_applications/approval-panel – update application status. */
export interface ApprovalPanelUpdatePayload {
  id: number;
  job_id: number;
  worker_id: number;
  approved_status: JobApplicationStatus;
}

/** GET /job_applications/job-application-status-panel – job status panel for user side. */
export interface JobStatusPanelItem {
  approved_status: JobApplicationStatus;
  job_details: {
    title: string;
    description: string;
    status: string;
    minimum_education: string;
    job_category: string;
    characteristics: string[] | null;
    workers_required: number;
    salary: number;
    from_date_time: string;
    to_date_time: string;
    id: number;
    admin_id: number;
    workers_hired: number;
  };
}

export interface JobStatusPanelResponse {
  success: boolean;
  message: string;
  data?: JobStatusPanelItem[];
  errors: unknown;
}

/** Payment status types used across revenue endpoints. */
export type PaymentStatus = "pending" | "paid" | "rejected";

/** GET /job_applications/worker/revenue – revenue summary for logged-in worker. */
export interface WorkerRevenueJobItem {
  job_id: number;
  job_name: string;
  salary: number;
  from_date_time: string;
  to_date_time: string;
  payment_status: PaymentStatus;
}

export interface WorkerRevenueResponse {
  success: boolean;
  message: string;
  data?: WorkerRevenueJobItem[];
  errors: unknown;
}

/** GET /job_applications/admin/revenue – pending payments overview for admin. */

export interface AdminRevenueJobItem {
  job_id: number;
  job_name: string;
  salary: number;
  from_date_time: string;
  to_date_time: string;
  payment_status: PaymentStatus;
  worker_id?: number;
  worker_name?: string;
  worker_email?: string;
}

export interface AdminRevenueResponse {
  success: boolean;
  message: string;
  data?: AdminRevenueJobItem[];
  errors: unknown;
}

/** PUT /job_applications/admin/revenue – update payment status. */
export interface AdminRevenueUpdatePayload {
  job_id: number;
  worker_id: number;
  payment_status: PaymentStatus;
}
