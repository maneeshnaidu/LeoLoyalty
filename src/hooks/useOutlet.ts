import { useQuery } from '@tanstack/react-query';
import { outletsApi } from '@/api/outlets';

export const useOutlet = (id: number) => {
  return useQuery({
    queryKey: ['outlet', id],
    queryFn: () => outletsApi.getById(id),
    enabled: !!id,
  });
}; 