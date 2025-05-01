// src/types/auth-service.ts
export interface LoginForm {
    email: string;
    password: string;
    remember_me: boolean;
}


export interface LoginResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    refresh_expires_in: number;
}
