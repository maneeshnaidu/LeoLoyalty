import { useQuery } from '@tanstack/react-query';
import { rewardsApi } from '../api/rewards';
import { RewardType } from '@/types/type';
import { useAuthStore } from '@/store/auth.store';
import { useLocalSearchParams } from 'expo-router';

export const useRewards = () => {
  const { userCode } = useLocalSearchParams<{ userCode: string }>();
  const user = useAuthStore((state) => state.user);
  const code = userCode ? parseInt(userCode, 10) : user?.userCode;

  return useQuery<RewardType[], Error>({
    queryKey: ['rewards', code],
    queryFn: () => rewardsApi.getUserRewards(code || 0),
    enabled: !!code,
  });
}; 