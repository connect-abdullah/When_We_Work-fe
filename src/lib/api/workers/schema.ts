export enum Gender {
    male = "male",
    female = "female",
    other = "other",
}

export enum EmploymentType {
    full_time = "full_time",
    part_time = "part_time",
    contract = "contract",
    freelancer = "freelancer",
}

export enum UserRoleEnum {
    admin = "admin",       // System admin - can create jobs and appoint workers
    worker = "worker",         // Worker - can apply for jobs
}

export interface WorkerSchema {
    first_name: string;
    middle_name?: string | null;
    last_name: string;
    email: string;
    phone: string;
    address?: string | null;
    emergency_contact?: string | null;
    photo?: string | null;
    availability?: boolean; // default is true if not specified
    language?: string[] | null;
    gender: Gender;
    employment_type: EmploymentType;
    user_role: UserRoleEnum;
    roles?: string[] | null;
    remarks?: string | null;
    admin_id: number;
}

export interface WorkerResponseSchema extends WorkerSchema {
    id: number;
}

export interface WorkersListResponseApi {
    success: boolean;
    message: string;
    data: WorkerResponseSchema[];
    errors: unknown;
}

export interface WorkerSingleResponseApi {
    success: boolean;
    message: string;
    data: WorkerResponseSchema;
    errors: unknown;
}
