import { Skeleton } from '@/components/ui/Skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { useClients } from '@/hooks/useClients';
import { useEffect, useRef } from 'react';


export function Clients() {
  const { clients, isLoading, nextPage, hasNextPage, isFetchingNextPage } = useClients(10);
  const tableCaptionRef = useRef<null | HTMLTableCaptionElement>(null);

  useEffect(() => {
    if(!tableCaptionRef.current) return;

    const observer = new IntersectionObserver((entries, internalObserver) => {
      const { isIntersecting }  = entries[0];

      if(!hasNextPage) {
        internalObserver.disconnect();
        return;
      }

      if(isIntersecting && !isFetchingNextPage) {
        nextPage();
      }
    }, {
      rootMargin: '20%'
    });

    observer.observe(tableCaptionRef.current);

    return () => {
      observer.disconnect();
    };

  }, [isLoading, hasNextPage]);

  // const pages = useMemo(() => {
  //   return generateEllipsisPagination(pagination.currentPage, pagination.totalPages);
  // }, [pagination.currentPage, pagination.totalPages]);

  return (
    <div>
      <header className="mb-6 pb-10">
        <h1 className="text-3xl font-bold">Clientes</h1>
      </header>

      {isLoading && (
        <div className="space-y-2">
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
        </div>
      )}

      {!isLoading && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Data de entrada</TableHead>
              <TableHead>Tipo de veículo</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Modelo</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="flex items-center gap-2">
                  <img
                    src={client.avatar}
                    alt={client.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <strong>{client.name}</strong>
                    <small className="text-muted-foreground block">
                      {client.email}
                    </small>
                  </div>
                </TableCell>

                <TableCell>{client.createdAt}</TableCell>

                <TableCell>{client.vehicleType}</TableCell>

                <TableCell>{client.vehicleManufacturer}</TableCell>

                <TableCell>{client.vehicleModel}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableCaption
            ref={tableCaptionRef}
          >
            {isFetchingNextPage && (
              <p>Carregando mais dados...</p>
            )}
            {/* <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={pagination.previousPage}
                    disabled={!pagination.hasPreviousPage}
                  />
                </PaginationItem>

                {pages.map((page, index) => {
                  const isEllipsisPosition = typeof page === 'string';

                  if(isEllipsisPosition) {
                    return (
                      <PaginationItem key={index}>
                        <PaginationButton
                          disabled
                        >
                          <PaginationEllipsis/>
                        </PaginationButton>
                      </PaginationItem>
                    );
                  }

                  return (
                    <PaginationItem key={index}>
                      <PaginationButton
                        isActive={pagination.currentPage === page}
                        onClick={() => pagination.setPage(page)}
                      >
                        {page}
                      </PaginationButton>
                    </PaginationItem>

                  );
                })}


                <PaginationItem>
                  <PaginationNext
                    onClick={pagination.nextPage}
                    disabled={!pagination.hasNextPage}

                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination> */}
          </TableCaption>
        </Table>
      )}

    </div>
  );
}
