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
