"use client";

import { IProduct } from "@/interfaces/product.interface";
import { IStoreProductsResponse } from "@/interfaces/responses/store.interface";
import { getRequest } from "@/utils/apiCaller";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetStoreProducts = (storeId: string) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
    remove,
  } = useInfiniteQuery<IStoreProductsResponse, Error>(
    ["store-products", storeId],
    ({ pageParam = 0 }) =>
      getRequest<IStoreProductsResponse>({
        url: `/product/store/${storeId}/${pageParam}`,
      }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.last) return undefined; // No more pages
        return lastPage.number + 1; // Next page number
      },
      staleTime: 1000 * 60 * 30,
      cacheTime: 1000 * 60 * 60,
    },
  );

  const storeProducts: IProduct[] =
    data?.pages.flatMap((page) => page.content) ?? [];

  return {
    storeProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetchStoreProducts: refetch,
    removeStoreProducts: remove,
    totalProducts: data?.pages[data.pages.length - 1]?.totalElements,
    currentPage: data?.pages[data.pages.length - 1]?.number as number,
    totalPages: data?.pages[data.pages.length - 1]?.totalPages,
  };
};
