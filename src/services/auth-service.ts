// src/services/auth-service.ts
import type {LoginForm, LoginResponse} from '@/types/Auth.ts'
import {apiClient} from "@/brain/api-client.ts";
import {ContentType} from "@/types/http-client.ts";
import { User, UserRequest } from 'types/User';


export const useAuthService = {
    async login(credentials: LoginForm): Promise<LoginResponse> {
        try {
            const response = await apiClient.request<{
                message: string;
                data: LoginResponse
            }>({
                path: '/login',
                method: 'POST',
                body: credentials,
                type: ContentType.Json,
                format: 'json'
            });

            return response.data.data;
        } catch (error) {
            // The error is already formatted by the HttpClient
            throw error; // Just rethrow it
        }
    },

    async register(userData: UserRequest): Promise<User> {
        try {
            const response = await apiClient.request<{
                message: String;
                data: User;
            }>({
                path: '/user/register',
                method: 'POST',
                body: userData,
                type: ContentType.Json,
                format: 'json'
            });
            return response.data.data;
        } catch (error) {
            throw error;
        }
    }

};
