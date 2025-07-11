import { apiClient } from "@/api/client";
import { OutletType, QueryObject } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useOutlets = (query?: QueryObject, p0?: { enabled: boolean; }) => {
    return useQuery({
        queryKey: ['outlets', query],
        queryFn: async () => {
            try {
                const response = await apiClient.get<OutletType[]>('/outlets', {
                    params: query
                });
                return response;
            } catch (error) {
                console.error('Failed to fetch outlets:', error);
                throw error; // Let react-query handle the error
            }
        },
    });
};