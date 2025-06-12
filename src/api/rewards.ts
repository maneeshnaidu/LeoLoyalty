import axios from 'axios';
import { API_CONFIG } from '@/config/api.config';
import { RewardType } from '@/types/type';
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

export const rewardsApi = {
  getUserRewards: async (userCode: number): Promise<RewardType[]> => {
    if (!userCode) {
      throw new Error('User code is required');
    }
    const response = await api.get(`/points/${userCode}`);
    return response.data;
  },
}; 