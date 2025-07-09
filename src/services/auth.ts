import { apiClient } from '@/api/client';
import { useAuthStore } from '@/store/auth';
import { LoginDto, LoginResponse, RegisterDto } from '@/types/auth';

class AuthService {
    async login(credentials: LoginDto): Promise<LoginResponse> {
        try {
            const response = await apiClient.post<LoginResponse>('/auth/login', credentials);

            // Store user in auth store
            await useAuthStore.getState().setUser(response);

            return response;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    async register(userData: RegisterDto): Promise<LoginResponse> {
        try {
            const response = await apiClient.post<LoginResponse>('/auth/register', userData);

            // Store user in auth store
            await useAuthStore.getState().setUser(response);

            return response;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    }

    async logout(): Promise<void> {
        try {
            // Call logout endpoint if needed
            await apiClient.post('/auth/logout');
        } catch (error) {
            console.error('Logout API call failed:', error);
        } finally {
            // Always clear local auth state
            await useAuthStore.getState().logout();
        }
    }

    async getCurrentUser(): Promise<LoginResponse | null> {
        try {
            const response = await apiClient.get<LoginResponse>('/auth/me');
            return response;
        } catch (error) {
            console.error('Failed to get current user:', error);
            return null;
        }
    }

    isAuthenticated(): boolean {
        const user = useAuthStore.getState().user;
        return !!user;
    }
}

export const authService = new AuthService(); 