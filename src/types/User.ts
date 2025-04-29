export interface User {
    id: number
    first_name: string
    last_name: string
    email: string
    role: Role
    created_at: Date
    last_login_at: Date | null
    is_verified: boolean
}

export enum Role {
    Admin = 'Admin',
    User = 'User'
}

export interface UserRequest {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
};


