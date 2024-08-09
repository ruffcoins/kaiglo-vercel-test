import { getRequest } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";
import { ITopSellingProductResponse } from "@/interfaces/responses/product.interface";
import { IProduct } from "@/interfaces/product.interface";

export const useTopSellingProducts = () => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["top-selling-products"],
      () =>
        getRequest<ITopSellingProductResponse>({
          url: "product/top-sales/0",
        }),
      {
        staleTime: 1000 * 60 * 60,
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
