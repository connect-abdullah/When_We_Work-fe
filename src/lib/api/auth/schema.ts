export interface AuthLogin {
    email: string;
    password: string;
}

export interface AuthLoginResponse {
    success: boolean;
    message: string;
    data: {
        id: number;
        name: string;
        business_name: string;
        email: string;
        role: string;
        last_login_at: string;
        access_token: string;
        token_type: string;
    };
    errors: unknown;
}
