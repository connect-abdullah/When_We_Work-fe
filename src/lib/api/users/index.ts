import { del, get, post, put } from "@/lib/api/http";
import type {
  UserCreate,
  UserCreateResponse,
  UserGetSchema,
  UserLoginPayload,
  UserLoginResponse,
  UserSingleResponseApi,
  UsersListResponseApi,
  UserUpdate,
} from "@/lib/api/users/schema";

const baseUrl = "/users";

export const getUsers = async (): Promise<UserGetSchema[]> => {
  const response = await get<UsersListResponseApi>(baseUrl);
  return response?.data ?? [];
};

export const createUser = async (
  payload: UserCreate
): Promise<UserCreateResponse> => {
  const response = await post<UserCreateResponse>(baseUrl, payload);
  return response;
};

export const getUser = async (
  userId: number
): Promise<UserGetSchema | null> => {
  const response = await get<UserSingleResponseApi>(`${baseUrl}/${userId}`);
  return response?.data ?? null;
};

export const updateUserByAdmin = async (
  userId: number,
  payload: UserUpdate
): Promise<UserSingleResponseApi> => {
  const response = await put<UserSingleResponseApi>(
    `${baseUrl}/admin/${userId}`,
    payload
  );
  return response;
};

export const updateUser = async (
  payload: UserUpdate
): Promise<UserSingleResponseApi> => {
  const response = await put<UserSingleResponseApi>(`${baseUrl}/worker/me`, payload);
  return response;
};

export const deleteUser = async (
  userId: number
): Promise<UserSingleResponseApi> => {
  const response = await del<UserSingleResponseApi>(`${baseUrl}/${userId}`);
  return response;
};

export const loginUser = async (
  payload: UserLoginPayload
): Promise<UserLoginResponse> => {
  const response = await post<UserLoginResponse>(`${baseUrl}/login`, payload);
  return response;
};
