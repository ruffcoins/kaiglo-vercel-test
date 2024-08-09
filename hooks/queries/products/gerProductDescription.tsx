"use client";

import { IProductDescriptionResponse } from "@/interfaces/responses/product.interface";
import { getRequestParams } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";

export const useGetProductDescription = (productId: string) => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["product-description", productId],
      () =>
        getRequestParams<{ productId: string }, IProductDescriptionResponse>({
          url: "/product/product-description",
          params: { productId },
        }),
      {
        enabled: !!productId,
        staleTime: 1000 * 60 * 30,
        cacheTime: 1000 * 60 * 60,
      },
    );

  return {
    productDescription: data?.response,
    fetchingProductDescription: isFetching,
    refetchProductDescription: refetch,
    productDescriptionSuccess: isSuccess,
    productDescriptionPaused: isPaused,
    productDescriptionError: isError,
    removeProductDescription: remove,
  };
};
