// src/types/auth-service.ts
export interface LoginForm {
    email: string;
    password: string;
    remember_me: boolean;
}


export interface LoginResponse {
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
    refreshExpiresIn: number;
}
