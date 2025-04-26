// src/services/auth-service.ts
import type {LoginForm, LoginResponse} from '@/types/Auth.ts'
import {apiClient} from "@/brain/api-client.ts";
import {ContentType} from "@/types/http-client.ts";


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
    }

}
