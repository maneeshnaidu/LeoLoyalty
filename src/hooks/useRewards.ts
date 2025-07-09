import { apiClient } from "@/api/client";
import { useAuthStore } from "@/store/auth";
import { RewardType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useRewards = (undefined: undefined, p0: { enabled: boolean; }) => {
    const userCode = useAuthStore.getState().user?.userCode;
    return useQuery({
        queryKey: ['rewards'],
        queryFn: async () => {
            if (!userCode) {
                throw new Error('User code is required to fetch rewards');
            }

            try {
                const response = await apiClient.get<RewardType[]>(
                    `/rewards`,
                    {
                        params: { userCode }
                    });
                return response;
            } catch (error) {
                console.error('Failed to fetch rewards:', error);
                throw error; // Let react-query handle the error
            }
        },
    });
};