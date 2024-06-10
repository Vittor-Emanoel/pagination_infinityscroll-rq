import { ClientsService } from '@/services/ClientsService';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { usePagination } from './usePagination';

export function useClients(perPage = 1) {
  const pagination = usePagination(perPage);
  const queryClient = useQueryClient();


  const { data, isLoading } = useQuery({
    queryKey: ['clients', { page: pagination.currentPage, perPage }],
    staleTime: Infinity,
    queryFn: async () => {
      const response = await ClientsService.getAll(pagination.currentPage, perPage);

      pagination.setTotalItems(response.items);

      return response;
    },
  });

  useEffect(() => {
    if(pagination.hasNextPage) {
      const nextPage = pagination.currentPage + 1;

      queryClient.prefetchQuery({
        queryKey: ['clients', { page: nextPage, perPage }],
        staleTime: Infinity,
        queryFn: async () => {
          const response = await ClientsService.getAll(nextPage, perPage);

          pagination.setTotalItems(response.items);

          return response;
        },
      });
    }
  }, [pagination.currentPage, pagination.hasNextPage]);

  return {
    clients: data?.data ?? [],
    isLoading,
    pagination
  };
}
