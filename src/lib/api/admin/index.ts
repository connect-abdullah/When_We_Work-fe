import { del, get, post, put } from "@/lib/api/http";
import {
  AdminCreate,
  AdminGetSchema,
  AdminListResponseApi,
  AdminSingleResponseApi,
} from "@/lib/api/admin/schema";

const baseUrl = "/admin";

// Create a new admin
export const createAdmin = async (admin: AdminCreate): Promise<AdminSingleResponseApi> => {
    const response = await post<AdminSingleResponseApi>(baseUrl, admin);
    return response;
};

// Get an admin by id
export const getAdminById = async (adminId: number): Promise<AdminGetSchema> => {
  const response = await get<AdminSingleResponseApi>(`${baseUrl}/${adminId}`);
  return response?.data;
};

// Get all admins
export const getAllAdmins = async (): Promise<AdminGetSchema[]> => {
  const response = await get<AdminListResponseApi>(baseUrl);
  return response?.data ?? [];
};

// Update an admin
export const updateAdmin = async (admin: AdminCreate, adminId: number): Promise<AdminGetSchema> => {
  const response = await put<AdminSingleResponseApi>(`${baseUrl}/${adminId}`, admin);
  return response?.data;
};

// Delete an admin
export const deleteAdmin = async (adminId: number): Promise<AdminSingleResponseApi> => {
  const response = await del<AdminSingleResponseApi>(`${baseUrl}/${adminId}`);
  return response;
};
