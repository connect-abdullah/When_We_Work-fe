import { del, get, post, put } from "@/lib/api/http";
import {
  JobCreate,
  JobGetSchema,
  JobSingleResponseApi,
  JobsListResponseApi,
} from "@/lib/api/jobs/schema";

export const getJobs = async (): Promise<JobGetSchema[]> => {
  const response = await get<JobsListResponseApi>("/jobs", {
    params: {
      admin_id: 2, // TODO: from auth
    },
  });
  return response?.data ?? [];
};

export const createJob = async (job: JobCreate): Promise<JobGetSchema> => {
  const response = await post<JobSingleResponseApi>("/jobs", job);
  return response?.data;
};

export const updateJob = async (
  job: JobGetSchema,
  jobId: number,
): Promise<JobGetSchema> => {
  const response = await put<JobSingleResponseApi>(
    `/jobs/${jobId}`,
    job,
  );
  return response?.data;
};

export const deleteJob = async (jobId: number): Promise<void> => {
  await del(`/jobs/${jobId}`);
};

