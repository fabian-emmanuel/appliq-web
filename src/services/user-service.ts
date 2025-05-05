import type {User} from '@/types/User.ts'
import {apiClient} from "@/brain/api-client.ts";


export const useUserService = {
    async fetchUserInfo(): Promise<User> {
        try {
            const response = await apiClient.request<{
                message: string;
                data: User
            }>({
                path: '/user/me',
                method: 'GET',
                secure: true,
                format: 'json'
            });

            return response.data.data;
        } catch (error) {
            // The error is already formatted by the HttpClient
            throw error;
        }
    }
}
