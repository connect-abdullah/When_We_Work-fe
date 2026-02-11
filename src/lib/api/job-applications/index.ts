import { get, post, put } from "@/lib/api/http";
import {
  AdminRevenueResponse,
  AdminRevenueUpdatePayload,
  ApprovalPanelListResponse,
  ApprovalPanelUpdatePayload,
  JobApplicationCreate,
  JobApplicationListResponse,
  JobApplicationResponse,
  JobStatusPanelResponse,
  WorkerRevenueResponse,
} from "@/lib/api/job-applications/schema";

const baseUrl = "/job_applications";

export const createJobApplication = async (
  payload: JobApplicationCreate
): Promise<JobApplicationResponse> => {
  const response = await post<JobApplicationResponse>(baseUrl, payload);
  return response;
};

export const getJobApplications =
  async (): Promise<JobApplicationListResponse> => {
    const response = await get<JobApplicationListResponse>(baseUrl);
    return response;
  };

const approvalPanelUrl = `${baseUrl}/approval-panel`;

export const getApprovalPanel =
  async (): Promise<ApprovalPanelListResponse> => {
    const response = await get<ApprovalPanelListResponse>(approvalPanelUrl);
    return response;
  };

export const updateApprovalPanelStatus = async (
  payload: ApprovalPanelUpdatePayload
): Promise<JobApplicationResponse> => {
  const response = await put<JobApplicationResponse>(approvalPanelUrl, payload);
  return response;
};

const jobStatusPanelUrl = `${baseUrl}/job-application-status-panel`;

export const getJobStatusPanel = async (): Promise<JobStatusPanelResponse> => {
  const response = await get<JobStatusPanelResponse>(jobStatusPanelUrl);
  return response;
};

const workerRevenueUrl = `${baseUrl}/worker/revenue`;

export const getWorkerRevenue = async (): Promise<WorkerRevenueResponse> => {
  const response = await get<WorkerRevenueResponse>(workerRevenueUrl);
  return response;
};

const adminRevenueUrl = `${baseUrl}/admin/revenue`;

export const getAdminRevenue = async (): Promise<AdminRevenueResponse> => {
  const response = await get<AdminRevenueResponse>(adminRevenueUrl);
  return response;
};

export const updateAdminRevenueStatus = async (
  payload: AdminRevenueUpdatePayload
): Promise<AdminRevenueResponse> => {
  const response = await put<AdminRevenueResponse>(adminRevenueUrl, payload);
  return response;
};
