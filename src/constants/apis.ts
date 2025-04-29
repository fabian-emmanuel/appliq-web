// src/config/api.ts

if (!import.meta.env.VITE_API_BASE_URL) {
    console.error("ERROR:::: VITE_API_BASE_URL is not defined");
}

console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const AUTH_TOKEN_KEY = 'auth_token';