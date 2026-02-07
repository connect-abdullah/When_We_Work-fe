import { del, get, post, put } from "@/lib/api/http";
import {
  BusinessCreate,
  BusinessGetSchema,
  BusinessListResponseApi,
  BusinessSingleResponseApi,
} from "./schema";

const baseUrl = "/business";

export const getBusinessById = async (
  businessId: number
): Promise<BusinessGetSchema> => {
  const response = await get<BusinessSingleResponseApi>(
    `${baseUrl}/${businessId}`
  );
  return response?.data;
};

export const createBusiness = async (
  business: BusinessCreate
): Promise<BusinessSingleResponseApi> => {
  const response = await post<BusinessSingleResponseApi>(baseUrl, business);
  return response;
};

export const getAllBusinesses = async (): Promise<BusinessGetSchema[]> => {
  const response = await get<BusinessListResponseApi>(`${baseUrl}`);
  return response?.data ?? [];
};

export const updateBusiness = async (
  business: BusinessCreate,
  businessId: number
): Promise<BusinessGetSchema> => {
  const response = await put<BusinessSingleResponseApi>(
    `${baseUrl}/${businessId}`,
    business
  );
  return response?.data;
};

export const deleteBusiness = async (
  businessId: number
): Promise<BusinessSingleResponseApi> => {
  const response = await del<BusinessSingleResponseApi>(
    `${baseUrl}/${businessId}`
  );
  return response;
};
