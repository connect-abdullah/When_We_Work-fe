import { get, post, put } from "@/lib/api/http";
import {
  ApprovalPanelListResponse,
  ApprovalPanelUpdatePayload,
  JobApplicationCreate,
  JobApplicationListResponse,
  JobApplicationResponse,
} from "@/lib/api/job-applications/schema";

const baseUrl = "/job_applications";

export const createJobApplication = async (
  payload: JobApplicationCreate,
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

export const getApprovalPanel = async (): Promise<ApprovalPanelListResponse> => {
  const response = await get<ApprovalPanelListResponse>(approvalPanelUrl);
  return response;
};

export const updateApprovalPanelStatus = async (
  payload: ApprovalPanelUpdatePayload,
): Promise<JobApplicationResponse> => {
  const response = await put<JobApplicationResponse>(approvalPanelUrl, payload);
  return response;
};
