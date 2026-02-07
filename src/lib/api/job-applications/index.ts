import { get, post } from "@/lib/api/http";
import {
  JobApplicationCreate,
  JobApplicationResponse,
  JobApplicationListResponse,
} from "@/lib/api/job-applications/schema";

const baseUrl = "/job_applications";

export const createJobApplication = async (
  payload: JobApplicationCreate,
): Promise<JobApplicationResponse> => {
  const response = await post<JobApplicationResponse>(baseUrl, payload);
  return response;
};

export const getJobApplications = async (): Promise<JobApplicationListResponse> => {
  const response = await get<JobApplicationListResponse>(baseUrl);
  return response;
};