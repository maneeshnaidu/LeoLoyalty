import { useQuery } from '@tanstack/react-query';
import { notificationsApi } from '@/api/notifications';
import { useAuthStore } from '@/store/auth.store';

export const useNotifications = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['notifications', user?.userCode],
    queryFn: () => notificationsApi.getNotifications(user?.userCode || 0),
    enabled: !!user?.userCode,
  });
};