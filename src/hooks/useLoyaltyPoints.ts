import { apiClient } from "@/api/client";
import { useAuthStore } from "@/store/auth";
import { LoyaltyCardType, QueryObject } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useLoyaltyPoints = (query?: QueryObject, p0?: { enabled: boolean; }) => {
    const userCode = useAuthStore.getState().user?.userCode;
    return useQuery({
        queryKey: ['loyaltyPoints'],
        queryFn: async () => {
            if (!userCode) {
                throw new Error('User code is required to fetch loyalty points');
            }

            try {
                const response = await apiClient.get<LoyaltyCardType[]>('/points', {
                    params: { userCode }
                });
                return response;
            } catch (error) {
                console.error('Failed to fetch loyalty points:', error);
                throw error; // Let react-query handle the error
            }
        },
    });
};