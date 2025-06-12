import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, LoginResponse } from '@/types/auth.types';
import axios from 'axios';
import { API_CONFIG } from '@/config/api.config';

interface AuthStore extends AuthState {
  setUser: (user: LoginResponse | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      logout: () => set({ user: null, error: null }),
      refreshToken: async () => {
        const currentUser = get().user;
        if (!currentUser?.refreshToken) return false;

        try {
          set({ isLoading: true });
          const response = await axios.post(`${API_CONFIG.BASE_URL}/auth/refresh-token`, {
            refreshToken: currentUser.refreshToken,
          });

          const newUser: LoginResponse = {
            ...currentUser,
            token: response.data.token,
            refreshToken: response.data.refreshToken,
          };

          set({ user: newUser, error: null });
          return true;
        } catch (error) {
          set({ error: 'Failed to refresh token', user: null });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 