"use client";

import { useQuery } from "@tanstack/react-query";
import { IProductDetailResponse } from "@/interfaces/responses/product.interface";
import { postRequest } from "@/utils/apiCaller";

const fetchProductDetails = async (productId: string) => {
  // Assuming this function makes the POST request to fetch product details
  const response = await postRequest<
    { productId: string },
    IProductDetailResponse
  >({
    url: "/product/product-detail",
    payload: { productId },
  });
  return response;
};

export const useProductDetails = (productId: string) => {
  return useQuery<IProductDetailResponse>(
    ["product", productId],
    () => fetchProductDetails(productId),
    {
      enabled: !!productId,
      staleTime: 1000 * 60 * 30,
      cacheTime: 1000 * 60 * 60,
    },
  );
};
