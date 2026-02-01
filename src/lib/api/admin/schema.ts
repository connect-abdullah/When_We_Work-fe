import { Gender, UserRoleEnum } from "@/lib/api/workers/schema";

export interface AdminCreate {
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  photo?: string | null;
  language?: string; // default "en" in backend
  gender: Gender;
  role?: UserRoleEnum; // default UserRoleEnum.admin in backend
  business_id: number;
}

export interface AdminGetSchema extends AdminCreate {
  id: number;
}

export interface AdminListResponseApi {
  success: boolean;
  message: string;
  data: AdminGetSchema[];
  errors: unknown;
}

export interface AdminSingleResponseApi {
  success: boolean;
  message: string;
  data: AdminGetSchema;
  errors: unknown;
}
