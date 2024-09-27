import { getRequestParams } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";
import { IFeaturedProductResponse } from "@/interfaces/responses/product.interface";
import { IProduct } from "@/interfaces/product.interface";

export const useGetRatingAndReview = (productId: string) => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["rating-and-review", productId],
      () =>
        getRequestParams<{ productId: string }, IFeaturedProductResponse>({
          url: "/review-comment/summary",
          params: { productId },
        }),
      {
        enabled: !!productId,
        staleTime: 1000 * 60 * 30,
        cacheTime: 1000 * 60 * 60,
        // temp fix for retry issue when no rating exists
        retry: 0,
      },
    );

  return {
    featuredProducts: data?.content as IProduct[],
    featuredProductsPagination: data?.pageable,
    fetchingFeaturedProducts: isFetching,
    refetchFeaturedProducts: refetch,
    featuredProductsSuccess: isSuccess,
    featuredProductsPaused: isPaused,
    featuredProductsError: isError,
    removeFeaturedProducts: remove,
  };
};
