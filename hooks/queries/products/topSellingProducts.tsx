import { getRequest } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";
import { ITopSellingProductResponse } from "@/interfaces/responses/product.interface";
import { IProduct } from "@/interfaces/product.interface";

export const useTopSellingProducts = (page: number) => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["top-selling-products", page],
      () =>
        getRequest<ITopSellingProductResponse>({
          url: `product/top-sales/${page}`,
        }),
      {
        staleTime: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 30,
      },
    );

  return {
    topSellingProducts: data?.response as IProduct[],
    fetchingTopSellingProducts: isFetching,
    refetchTopSellingProducts: refetch,
    topSellingProductsSuccess: isSuccess,
    topSellingProductsPaused: isPaused,
    topSellingProductsError: isError,
    removeTopSellingProducts: remove,
  };
};
