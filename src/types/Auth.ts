// src/types/auth-service.ts
export interface LoginForm {
    email: string;
    password: string;
    rememberMe: boolean;
}


export interface LoginResponse {
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
    refreshExpiresIn: number;
}
