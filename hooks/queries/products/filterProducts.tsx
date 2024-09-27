import { IProduct, ProductFilters } from "@/interfaces/product.interface";
import { IPaginatedProductResponse } from "@/interfaces/responses/product.interface";
import { postRequest } from "@/utils/apiCaller";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useFilterProducts = (filters: ProductFilters, size: number) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
    remove,
    isRefetching,
    isFetching,
  } = useInfiniteQuery<IPaginatedProductResponse, Error>(
    ["filter-products", filters],
    ({ pageParam = 0 }) =>
      postRequest({
        url: `product/filter/${pageParam}/?size=${size}`,
        payload: filters,
      }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.last) return undefined; // No more pages
        return lastPage.number + 1; // Next page number
      },
      enabled: !!size,
      // staleTime: 1000 * 60 * 30,
      cacheTime: 1000 * 60 * 30,
    },
  );

  const filterProducts: IProduct[] =
    data?.pages.flatMap((page) => page.content) ?? [];

  return {
    filterProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isRefetching,
    status,
    error,
    refetchFilterProducts: refetch,
    removeFilterProducts: remove,
    totalProducts: data?.pages[data.pages.length - 1]?.totalElements,
    currentPage: data?.pages[data.pages.length - 1]?.number as number,
    totalPages: data?.pages[data.pages.length - 1]?.totalPages,
  };
};
