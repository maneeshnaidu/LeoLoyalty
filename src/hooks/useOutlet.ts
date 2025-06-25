import { apiClient } from "@/api/client";
import { OutletType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useOutlet = (id: number) => {
    return useQuery({
        queryKey: ['outlets', id],
        queryFn: async () => {
            try {
                const response = await apiClient.get<OutletType>(`/outlets/${id}`);
                return response;
            } catch (error) {
                console.error('Failed to fetch outlets:', error);
                throw error; // Let react-query handle the error
            }
        },
    });
};