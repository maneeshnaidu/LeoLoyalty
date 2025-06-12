import axios from 'axios';
import { API_CONFIG } from '@/config/api.config';
import { NotificationType } from '@/types/type';
import { useAuthStore } from '@/store/auth.store';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const notificationsApi = {
  getNotifications: async (userCode: number): Promise<NotificationType[]> => {
    const response = await api.get('/transactions', {
      params: { userCode }
    });
    return response.data;
  },
}; 