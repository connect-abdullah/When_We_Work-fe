export enum EmploymentType {
  full_time = "full_time",
  part_time = "part_time",
  contract = "contract",
  freelancer = "freelancer",
}

export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export enum UserRoleEnum {
  admin = "admin",
  worker = "worker",
}

/** Matches backend UserBase + UserCreate (admin_id, business_id, password optional). */
export interface UserCreate {
  first_name: string;
  last_name: string;
  email: string;
  password?: string | null;
  phone: string;
  address?: string | null;
  emergency_contact?: string | null;
  photo?: string | null;
  gender: Gender;
  availability?: boolean;
  employment_type?: EmploymentType | null;
  user_role: UserRoleEnum;
  worker_roles?: string[] | null;
  remarks?: string | null;
  admin_id?: number | null;
  business_id?: number | null;
}

/** Matches backend UserBase / UserUpdate. */
export interface UserUpdate {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string | null;
  phone?: string;
  address?: string | null;
  emergency_contact?: string | null;
  photo?: string | null;
  gender?: Gender;
  availability?: boolean;
  employment_type?: EmploymentType | null;
  user_role?: UserRoleEnum;
  worker_roles?: string[] | null;
  remarks?: string | null;
}

/** Matches backend UserRead (id + UserBase; admin_id, business_id from UserCreate). */
export interface UserGetSchema extends UserCreate {
  id: number;
}

export interface UsersListResponseApi {
  success: boolean;
  message: string;
  data: UserGetSchema[];
  errors: unknown;
}

export interface UserSingleResponseApi {
  success: boolean;
  message: string;
  data: UserGetSchema;
  errors: unknown;
}

export interface UserLoginPayload {
  email: string;
  password: string;
}

/** Matches backend UserTokenResponse. */
export interface UserLoginResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name?: string | null;
    business_name?: string | null;
    email?: string | null;
    user_role: UserRoleEnum;
    last_login_at?: string | null;
    access_token: string;
    token_type: string;
  };
  errors: unknown;
}

export interface UserCreateResponse {
  success: boolean;
  message: string;
  data: {
    user: UserGetSchema;
    access_token: string;
    token_type: string;
  };
  errors: unknown;
}
