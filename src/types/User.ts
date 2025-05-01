export interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    role: Role
    createdAt: Date
    lastLoginAt: Date | null
    isVerified: boolean
}

export enum Role {
    Admin = 'Admin',
    User = 'User'
}

export interface UserRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
};


