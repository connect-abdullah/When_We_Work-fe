import { del, get, post, put } from "@/lib/api/http";
import {
  WorkerResponseSchema,
  WorkerSchema,
  WorkerSingleResponseApi,
  WorkersListResponseApi,
} from "@/lib/api/workers/schema";

const baseUrl = "/workers";

export const getWorkers = async (): Promise<WorkerResponseSchema[]> => {
  const response = await get<WorkersListResponseApi>(baseUrl);
  return response?.data ?? [];
};

export const createWorker = async (
  worker: WorkerSchema
): Promise<WorkerResponseSchema> => {
  const response = await post<WorkerSingleResponseApi>(baseUrl, worker);
  return response?.data as WorkerResponseSchema;
};

export const updateWorker = async (
  workerId: number,
  worker: Partial<WorkerSchema>
): Promise<WorkerResponseSchema> => {
  const response = await put<WorkerSingleResponseApi>(
    `${baseUrl}/${workerId}`,
    worker
  );
  return response?.data as WorkerResponseSchema;
};

export const deleteWorker = async (
  workerId: number
): Promise<WorkerSingleResponseApi> => {
  const response = await del<WorkerSingleResponseApi>(`${baseUrl}/${workerId}`);
  return response;
};
