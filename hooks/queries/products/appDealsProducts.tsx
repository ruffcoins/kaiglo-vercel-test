import { getRequest } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";

import { IAppDealsProductResponse } from "@/interfaces/responses/product.interface";
import { IProduct } from "@/interfaces/product.interface";

export const useAppDealsProducts = () => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["app-deals-products"],
      () =>
        getRequest<IAppDealsProductResponse>({
          url: "product/on-sale/APP_ONLY_DEALS/0",
        }),
      {
        staleTime: 1000 * 60 * 60,
      },
    );

  return {
    appDealsProducts: data?.content as IProduct[],
    appDealsProductsPagination: data?.pageable,
    fetchingAppDealsProducts: isFetching,
    refetchAppDealsProducts: refetch,
    appDealsProductsSuccess: isSuccess,
    appDealsProductsPaused: isPaused,
    appDealsProductsError: isError,
    removeAppDealsProducts: remove,
  };
};
