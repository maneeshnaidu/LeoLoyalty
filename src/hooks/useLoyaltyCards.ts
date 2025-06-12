import { useQuery } from '@tanstack/react-query';
import { loyaltyApi } from '@/api/loyalty';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'expo-router';

export const useLoyaltyCards = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  return useQuery({
    queryKey: ['loyaltyCards', user?.userCode],
    queryFn: loyaltyApi.getUserLoyaltyCards,
    enabled: !!user?.userCode,
    retry: (failureCount, error: any) => {
      if (error.response?.status === 401) {
        router.replace('/signin');
        return false;
      }
      return failureCount < 3;
    },
  });
}; 