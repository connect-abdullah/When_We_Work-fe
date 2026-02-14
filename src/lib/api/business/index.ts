import { del, get, post, put } from "@/lib/api/http";
import {
  BusinessCreate,
  BusinessGetSchema,
  BusinessListResponseApi,
  BusinessSingleResponseApi,
  VerifyBusinessRegister,
} from "./schema";

const baseUrl = "/business";

/** Generic API response with optional data (e.g. request-registration). */
interface ApiMessageResponse {
  success: boolean;
  message: string;
  data?: { message?: string };
  errors?: unknown;
}

export const getBusinessById = async (
  businessId: number
): Promise<BusinessGetSchema> => {
  const response = await get<BusinessSingleResponseApi>(
    `${baseUrl}/${businessId}`
  );
  return response?.data;
};

/** Step 1: Submit business details. OTP is sent to business email; business is not created yet. */
export const requestBusinessRegistration = async (
  business: BusinessCreate
): Promise<ApiMessageResponse> => {
  const response = await post<ApiMessageResponse>(
    `${baseUrl}/request-registration`,
    business
  );
  return response;
};

/** Step 2: Verify OTP and complete registration. Business is created only if OTP is correct. */
export const verifyAndRegister = async (
  payload: VerifyBusinessRegister
): Promise<BusinessSingleResponseApi> => {
  const response = await post<BusinessSingleResponseApi>(
    `${baseUrl}/verify-and-register`,
    payload
  );
  return response;
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
