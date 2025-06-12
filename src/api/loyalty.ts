import axios from 'axios';
import { API_CONFIG } from '@/config/api.config';
import { LoyaltyCardType } from '@/types/type';
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

export const loyaltyApi = {
  getUserLoyaltyCards: async (): Promise<LoyaltyCardType[]> => {
    const userCode = useAuthStore.getState().user?.userCode;
    const response = await api.get('/points', {
      params: { userCode }
    });
    return response.data.map((card: any) => ({
      id: card.id,
      vendorId: card.vendorId,
      vendorName: card.vendorName,
      vendorLogo: card.vendorLogo,
      points: card.points,
      maxPoints: card.maxPoints,
    }));
  },

}; 