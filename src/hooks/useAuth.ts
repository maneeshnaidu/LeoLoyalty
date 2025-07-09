import { authService } from '@/services/auth';
import { useAuthStore } from '@/store/auth';
import { LoginDto, RegisterDto } from '@/types/auth';
import { useCallback } from 'react';

export const useAuth = () => {
    const { user, isLoading, error, setError } = useAuthStore();

    const login = useCallback(async (credentials: LoginDto) => {
        try {
            setError(null);
            return await authService.login(credentials);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Login failed';
            setError(errorMessage);
            throw error;
        }
    }, [setError]);

    const register = useCallback(async (userData: RegisterDto) => {
        try {
            setError(null);
            return await authService.register(userData);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Registration failed';
            setError(errorMessage);
            throw error;
        }
    }, [setError]);

    const logout = useCallback(async () => {
        try {
            setError(null);
            await authService.logout();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Logout failed';
            setError(errorMessage);
            throw error;
        }
    }, [setError]);

    const isAuthenticated = useCallback(() => {
        return authService.isAuthenticated();
    }, []);

    return {
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        isAuthenticated: isAuthenticated(),
    };
}; 