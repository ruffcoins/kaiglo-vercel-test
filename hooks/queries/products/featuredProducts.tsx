import { getRequestParams } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";
import { IFeaturedProductResponse } from "@/interfaces/responses/product.interface";
import { IProduct } from "@/interfaces/product.interface";

export const useFeaturedProducts = () => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["featured-products", 0],
      () =>
        getRequestParams<{ page: number }, IFeaturedProductResponse>({
          url: "/product/featured",
          params: { page: 0 },
        }),
      {
        staleTime: 1000 * 60 * 60,
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
