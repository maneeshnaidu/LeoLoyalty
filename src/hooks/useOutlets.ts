import { useQuery } from '@tanstack/react-query';
import { outletsApi } from '@/api/outlets';
import { Outlet } from '@/types/outlet.types';

export const useOutlets = (address?: string) => {
  return useQuery<Outlet[], Error>({
    queryKey: ['outlets', address],
    queryFn: () => outletsApi.getAll(address),
  });
}; 