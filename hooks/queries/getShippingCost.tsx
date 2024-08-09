"use client";

import { GetShippingCostResponse } from "@/interfaces/responses/cart.interface";
import { getRequestParams } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";

export const useGetShippingCost = (lga: string, state: string) => {
  const {
    data,
    isFetching,
    refetch,
    isRefetching,
    isSuccess,
    isError,
    remove,
    isPaused,
  } = useQuery(
    ["shipping-cost"],
    () =>
      getRequestParams<{ lga: string; state: string }, GetShippingCostResponse>(
        {
          url: "/shipping",
          params: { lga: lga, state: state },
        },
      ),
    {
      enabled: !!lga && !!state,
    },
  );

  return {
    shippingCost: data?.response,
    fetchingShippingCost: isFetching,
    shippingCostSuccess: isSuccess,
    shippingCostPaused: isPaused,
    shippingCostError: isError,
    refetchShippingCost: refetch,
    isRefetchingShippingCost: isRefetching,
    removeShippingCost: remove,
  };
};
