import axios from 'axios';
import { API_CONFIG } from '@/config/api.config';
import { Outlet } from '@/types/outlet.types';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

export const outletsApi = {
  getAll: async (address?: string): Promise<Outlet[]> => {
    const response = await api.get('/outlets', {
      params: { address }
    });
    return response.data.map((outlet: any) => ({
      id: outlet.id,
      name: outlet.name,
      description: outlet.description,
      category: outlet.category,
      coverImageUrl: outlet.coverImageUrl,
      address: outlet.address,
      phoneNumber: outlet.phoneNumber,
    }));
  },

  getById: async (id: number): Promise<Outlet> => {
    const response = await api.get(`/outlets/${id}`);
    return {
      id: response.data.id,
      name: response.data.name,
      description: response.data.description,
      category: response.data.category,
      coverImageUrl: response.data.coverImageUrl,
      address: response.data.address,
      phoneNumber: response.data.phoneNumber,
    };
  },
}; 