import { getRequest } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";
import { SalesResponse } from "@/interfaces/responses/salesPromotion.interface";

export const useGetSalePromotion = (saleName: string) => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["sales-promotion", saleName],
      () =>
        getRequest<SalesResponse>({
          url: `/product/campaign/${saleName}`,
        }),
      {
        staleTime: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 60,
      },
    );

  return {
    salesPromotion: data?.response,
    fetchingSalesPromotion: isFetching,
    refetchSalesPromotion: refetch,
    salesPromotionSuccess: isSuccess,
    salesPromotionPaused: isPaused,
    salesPromotionError: isError,
    removeSalesPromotion: remove,
  };
};

export default useGetSalePromotion;
