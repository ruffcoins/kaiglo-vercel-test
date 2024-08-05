import { IRecommendedProductResponse } from "@/interfaces/responses/product.interface";
import { getRequest } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";

export const useRecommendedProducts = () => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["recommended-products"],
      () =>
        getRequest<IRecommendedProductResponse>({
          url: "product/home-recommendation/0",
        }),
      {
        staleTime: 1000 * 60 * 60,
      },
    );

  return {
    recommendedProducts: data?.content,
    fetchingRecommendedProducts: isFetching,
    recommendedProductsSuccess: isSuccess,
    recommendedProductsPaused: isPaused,
    recommendedProductsError: isError,
    refetchRecommendedProducts: refetch,
    removeRecommendedProducts: remove,
  };
};
