// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserService } from '@/services/user-service';
import type { User } from '@/types/User';
import { apiClient, setAuthToken } from "@/brain/api-client";
import {AUTH_TOKEN_KEY} from "@/constants/apis.ts";

interface AuthContextType {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setToken: (token: string | null) => Promise<User | null>;
    loadUserInfo: () => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setTokenState] = useState<string | null>(() => localStorage.getItem(AUTH_TOKEN_KEY));
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loadUserInfo = useCallback(async (): Promise<void> => {
        if (!token) return;

        setIsLoading(true);
        try {
            const userData = await UserService.fetchUserInfo();
            setUser(userData);
        } catch (error) {
            console.error('Failed to load user info:', error);
            // Clear auth state if token is invalid
            if (error instanceof Error &&
                (error.message.includes('unauthorized') || error.message.includes('invalid token'))) {
                localStorage.removeItem(AUTH_TOKEN_KEY);
                setTokenState(null);
                setUser(null);
                setAuthToken(null);
            }
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    const setToken = useCallback(async (newToken: string | null): Promise<User | null> => {
        // Update localStorage and state
        if (newToken) {
            localStorage.setItem(AUTH_TOKEN_KEY, newToken);
            setAuthToken(newToken);
        } else {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            setAuthToken(null);
            setUser(null);
        }

        setTokenState(newToken);

        // Load user data if we have a token
        if (newToken) {
            try {
                const userData = await UserService.fetchUserInfo();
                setUser(userData);
                return userData;
            } catch (error) {
                console.error('Failed to load user info after setting token:', error);
                return null;
            }
        }

        return null;
    }, []);

    const logout = useCallback(() => {
        setToken(null);
    }, [setToken]);

    // Initialize token from localStorage on mount
    useEffect(() => {
        const savedToken = localStorage.getItem(AUTH_TOKEN_KEY);
        if (savedToken) {
            apiClient.setSecurityData(savedToken);
        }
    }, []);

    // Load user info when token exists but user doesn't
    useEffect(() => {
        if (token && !user && !isLoading) {
            loadUserInfo();
        }
    }, [token, user, loadUserInfo, isLoading]);

    const contextValue = {
        token,
        user,
        isAuthenticated: Boolean(token && user),
        isLoading,
        setToken,
        loadUserInfo,
        logout
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};

