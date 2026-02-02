import { post } from "@/lib/api/http";
import { AuthLogin, AuthLoginResponse } from "@/lib/api/auth/schema";

const baseUrl = "/auth/login";
const adminUrl = baseUrl + "/admin";
const workerUrl = baseUrl + "/worker";

export const loginAdmin = async (payload: AuthLogin): Promise<AuthLoginResponse> => {
    const response = await post<AuthLoginResponse>(adminUrl, payload);
    return response;
};

export const loginWorker = async (payload: AuthLogin): Promise<AuthLoginResponse> => {
    const response = await post<AuthLoginResponse>(workerUrl, payload);
    return response;
};