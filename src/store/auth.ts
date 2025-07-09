import { apiClient } from '@/api/client';
import { tokenService } from '@/services/token';
import { AuthState, LoginResponse } from '@/types/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TokenResponse {
    token: string;
    refreshToken: string;
}

interface AuthStore extends AuthState {
    setUser: (user: LoginResponse | null) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    logout: () => void;
    refreshToken: () => Promise<boolean>;
    initializeAuth: () => Promise<void>;
    validateTokens: (token: string, refreshToken: string) => Promise<boolean>;
    isHydrated: boolean;
    setHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            isLoading: false,
            error: null,
            isHydrated: false,
            setHydrated: (state) => set({ isHydrated: state }),
            
            initializeAuth: async () => {
                try {
                    set({ isLoading: true });
                    
                    // Initialize token service
                    const { token, refreshToken } = await tokenService.initialize();
                    
                    console.log('AuthStore - initializeAuth:', { 
                        hasToken: !!token, 
                        hasRefreshToken: !!refreshToken,
                        hasUser: !!get().user 
                    });
                    
                    // If we have tokens, try to validate them
                    if (token && refreshToken) {
                        // Try to refresh the token to get a valid user session
                        const refreshSuccess = await get().refreshToken();
                        if (!refreshSuccess) {
                            // If refresh fails, clear everything
                            console.log('AuthStore - Token refresh failed, clearing auth');
                            await get().logout();
                        } else {
                            console.log('AuthStore - Token refresh successful');
                        }
                    } else {
                        console.log('AuthStore - No stored tokens found');
                    }
                } catch (error) {
                    console.error('Error initializing auth:', error);
                    await get().logout();
                } finally {
                    set({ isLoading: false });
                }
            },

            validateTokens: async (token: string, refreshToken: string): Promise<boolean> => {
                try {
                    // Make a test API call to validate tokens
                    await apiClient.get('/auth/validate', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    return true;
                } catch (error) {
                    // If validation fails, try refresh
                    if (refreshToken) {
                        try {
                            const response = await apiClient.post<TokenResponse>('/auth/refresh-token', {
                                refreshToken: refreshToken,
                            });
                            
                            // Create a minimal user object for refresh
                            const newUser: LoginResponse = {
                                firstName: '',
                                lastName: '',
                                userName: '',
                                userCode: 0,
                                email: '',
                                vendor: null,
                                token: response.token,
                                refreshToken: response.refreshToken,
                                roles: [],
                            };
                            
                            await tokenService.setTokens(response.token, response.refreshToken);
                            set({ user: newUser, error: null });
                            return true;
                        } catch (refreshError) {
                            console.error('Token refresh failed:', refreshError);
                            return false;
                        }
                    }
                    return false;
                }
            },

            setUser: async (user) => {
                if (user) {
                    await tokenService.setTokens(user.token, user.refreshToken);
                } else {
                    await tokenService.clearTokens();
                }
                set({ user });
            },
            
            setLoading: (isLoading) => set({ isLoading }),
            setError: (error) => set({ error }),
            
            logout: async () => {
                await tokenService.clearTokens();
                set({ user: null, error: null });
            },
            
            refreshToken: async () => {
                const currentUser = get().user;
                const storedRefreshToken = tokenService.getRefreshToken();
                
                // Use stored refresh token if user object doesn't have it
                const refreshToken = currentUser?.refreshToken || storedRefreshToken;
                
                if (!refreshToken) {
                    console.error('No refresh token available');
                    set({ error: 'No refresh token available', user: null });
                    return false;
                }

                try {
                    set({ isLoading: true });
                    const response = await apiClient.post<TokenResponse>('/auth/refresh-token', {
                        refreshToken: refreshToken,
                    });

                    // Try to get user information from API if we don't have it
                    let userInfo: LoginResponse;
                    
                    if (currentUser) {
                        // Update existing user with new tokens
                        userInfo = {
                            ...currentUser,
                            token: response.token,
                            refreshToken: response.refreshToken,
                        };
                    } else {
                        // Try to fetch user info from API
                        try {
                            const userResponse = await apiClient.get<LoginResponse>('/auth/me', {
                                headers: { Authorization: `Bearer ${response.token}` }
                            });
                            userInfo = {
                                ...userResponse,
                                token: response.token,
                                refreshToken: response.refreshToken,
                            };
                        } catch (userError) {
                            console.warn('Could not fetch user info, using minimal user object:', userError);
                            // Create minimal user object if API call fails
                            userInfo = {
                                firstName: '',
                                lastName: '',
                                userName: '',
                                userCode: 0,
                                email: '',
                                vendor: null,
                                token: response.token,
                                refreshToken: response.refreshToken,
                                roles: [],
                            };
                        }
                    }

                    await tokenService.setTokens(response.token, response.refreshToken);
                    set({ user: userInfo, error: null });
                    return true;
                } catch (error) {
                    console.error('Failed to refresh token:', error);
                    set({ error: 'Failed to refresh token', user: null });
                    await tokenService.clearTokens();
                    return false;
                } finally {
                    set({ isLoading: false });
                }
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => (state) => {
                // Called after hydration is finished
                if (state) {
                    state.setHydrated(true);
                    // Initialize auth after hydration
                    state.initializeAuth();
                }
            },
        }
    )
); 