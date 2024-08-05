import { getRequest } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";
import { IGroupBuyProductResponse } from "@/interfaces/responses/product.interface";

export const useGroupBuyProducts = () => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["group-buy-products"],
      () =>
        getRequest<IGroupBuyProductResponse>({
          url: "product/on-sale/GROUP_BUY/0",
        }),
      {
        staleTime: 1000 * 60 * 60,
      },
    );

  return {
    groupBuyProducts: data?.content,
    groupBuyProductsPagination: data?.pageable,
    fetchingGroupBuyProducts: isFetching,
    refetchGroupBuyProducts: refetch,
    groupBuyProductsSuccess: isSuccess,
    groupBuyProductsPaused: isPaused,
    groupBuyProductsError: isError,
    removeGroupBuyProducts: remove,
  };
};
