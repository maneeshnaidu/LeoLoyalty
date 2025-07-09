import { tokenService } from '@/services/token';
import { useAuthStore } from '@/store/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class AuthDebugUtils {
    /**
     * Clear all authentication data for testing
     */
    static async clearAllAuthData() {
        try {
            // Clear tokens
            await tokenService.clearTokens();
            
            // Clear auth store
            useAuthStore.getState().logout();
            
            // Clear AsyncStorage
            await AsyncStorage.removeItem('auth-storage');
            await AsyncStorage.removeItem('auth-tokens');
            
            console.log('AuthDebugUtils - All auth data cleared');
        } catch (error) {
            console.error('AuthDebugUtils - Error clearing auth data:', error);
        }
    }

    /**
     * Log current authentication state
     */
    static async logAuthState() {
        try {
            const token = tokenService.getToken();
            const refreshToken = tokenService.getRefreshToken();
            const user = useAuthStore.getState().user;
            const isHydrated = useAuthStore.getState().isHydrated;
            const isLoading = useAuthStore.getState().isLoading;
            const error = useAuthStore.getState().error;

            console.log('AuthDebugUtils - Current Auth State:', {
                token: token ? 'Present' : 'None',
                refreshToken: refreshToken ? 'Present' : 'None',
                user: user ? 'Present' : 'None',
                isHydrated,
                isLoading,
                error
            });

            // Also log AsyncStorage contents
            const authStorage = await AsyncStorage.getItem('auth-storage');
            const authTokens = await AsyncStorage.getItem('auth-tokens');
            
            console.log('AuthDebugUtils - AsyncStorage:', {
                authStorage: authStorage ? 'Present' : 'None',
                authTokens: authTokens ? 'Present' : 'None'
            });
        } catch (error) {
            console.error('AuthDebugUtils - Error logging auth state:', error);
        }
    }

    /**
     * Force reinitialize authentication
     */
    static async forceReinitialize() {
        try {
            console.log('AuthDebugUtils - Force reinitializing auth...');
            await useAuthStore.getState().initializeAuth();
            console.log('AuthDebugUtils - Reinitialization complete');
        } catch (error) {
            console.error('AuthDebugUtils - Error reinitializing auth:', error);
        }
    }
} 