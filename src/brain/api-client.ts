// src/api/api-client.ts
import {HttpClient} from '@/brain/http-client';
import { API_BASE_URL } from '@/constants/apis';

// Type for auth token
export type AuthToken = string;

// Security worker function to attach the auth token to requests
const securityWorker = (token: AuthToken | null) => {
    if (token) {
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }
    return {};
};

// Create an instance of the HTTP client with the security worker
export const apiClient = new HttpClient<AuthToken>({
    baseUrl: API_BASE_URL,
    baseApiParams: {
        headers: {
            'Accept': 'application/json',
        },
    },
    securityWorker: securityWorker, // Assign the security worker
});


// Function to set the authentication token
export const setAuthToken = (token: AuthToken | null): void => {
    apiClient.setSecurityData(token);
};
