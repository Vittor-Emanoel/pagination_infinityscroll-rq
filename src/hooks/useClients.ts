import { ClientsService } from '@/services/ClientsService';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useClients(perPage = 1) {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['clients'],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => ClientsService.getAll(pageParam, perPage),
    getNextPageParam: (lastPage, allPages, lastPageParams) => {
      const totalPages = Math.ceil(lastPage.items / perPage);
      const isLastPage = allPages.length >= totalPages;

      if(isLastPage) {
        return null;
      }

      return lastPageParams + 1;
    }
  });

  const clients = data?.pages.flatMap(page => page.data);

  return {
    clients: clients ?? [],
    isLoading,
    nextPage: fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  };
}
