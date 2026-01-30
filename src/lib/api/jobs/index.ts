import { get, post, put } from "@/lib/api/http";
import {
  JobCreate,
  JobGetSchema,
  JobsListResponseApi,
} from "@/lib/api/jobs/schema";

export const getJobs = async (): Promise<JobGetSchema[]> => {
  const response = await get<JobsListResponseApi>("/jobs", {
    params: {
      admin_id: 2, // TODO: from auth
    },
  });
  console.warn("getJobs response", response);
  return response?.data ?? [];
};

export const createJob = async (job: JobCreate): Promise<JobGetSchema> => {
    const response = await post<JobGetSchema>("/jobs", job, {
        params: {
            admin_id: job.admin_id,
        }});
    return response;
};

export const updateJob = async (job: JobGetSchema): Promise<JobGetSchema> => {
  const response = await put<JobGetSchema>("/jobs", job);
  return response;
};
