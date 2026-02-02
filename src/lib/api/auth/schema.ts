export interface AuthLogin {
    email: string;
    password: string;
}

export interface AuthLoginResponse {
    success: boolean;
    message: string;
    data: [];
    errors: unknown;
}
