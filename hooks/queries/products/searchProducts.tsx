"use client";

import { IProduct } from "@/interfaces/product.interface";
import { IPaginatedProductResponse } from "@/interfaces/responses/product.interface";
import { getRequest } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";

export const useSearchProducts = (searchTerm: string) => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["product-search", searchTerm],
      () =>
        getRequest<IPaginatedProductResponse>({
          url: `/product/search/v2/${searchTerm}/0`,
        }),
      {
        enabled: !!searchTerm,
        cacheTime: 1000 * 60 * 30,
      },
    );

  return {
    products: data?.content as IProduct[],
    pagination: data?.pageable,
    isFetching,
    refetch,
    isSuccess,
    isError,
    remove,
    isPaused,
  };
};
