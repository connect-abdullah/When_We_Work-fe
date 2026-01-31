import { del, get, post, put } from "@/lib/api/http";
import {
  JobCreate,
  JobGetSchema,
  JobSingleResponseApi,
  JobsListResponseApi,
} from "@/lib/api/jobs/schema";

const baseUrl = "/jobs";

export const getJobs = async (): Promise<JobGetSchema[]> => {
  const response = await get<JobsListResponseApi>(baseUrl, {
    params: {
      admin_id: 2, // TODO: from auth
    },
  });
  return response?.data ?? [];
};

export const createJob = async (job: JobCreate): Promise<JobGetSchema> => {
  const response = await post<JobSingleResponseApi>(baseUrl, job);
  return response?.data;
};

export const updateJob = async (
  job: JobGetSchema,
  jobId: number
): Promise<JobGetSchema> => {
  const response = await put<JobSingleResponseApi>(`${baseUrl}/${jobId}`, job);
  return response?.data;
};

export const deleteJob = async (jobId: number): Promise<void> => {
  await del(`${baseUrl}/${jobId}`);
};
