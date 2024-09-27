"use client";

import { IProduct } from "@/interfaces/product.interface";
import { getRequestParams } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";

export const useSearchStore = (searchTerm: string, storeId: string) => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["store-search", searchTerm],
      () =>
        getRequestParams<{ name: string }, IProduct[]>({
          url: `/product/${storeId}/search`,
          params: { name: searchTerm },
        }),
      {
        enabled: !!searchTerm && !!storeId,
        cacheTime: 1000 * 60 * 5,
      },
    );

  return {
    products: data,
    isFetchingProducts: isFetching,
    refetchProducts: refetch,
    productsSuccess: isSuccess,
    productsPaused: isPaused,
    productsError: isError,
    removeProducts: remove,
  };
};
