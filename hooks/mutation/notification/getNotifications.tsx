"/api/v1/notification/single-user/v2"

"use client";

import { IWalletHistoryResponse } from "@/interfaces/responses/wallet.interface";
import { getRequestParams } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";

export const useNotifications = () => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["notifications", 0],
      () =>
        getRequestParams<{ page: number }, IWalletHistoryResponse>({
          url: "/notification/single-user/v2",
          params: { page: 0 },
        }),
      {
        staleTime: 1000 * 60 * 30,
        cacheTime: 1000 * 60 * 60,
      },
    );

  return {
    walletHistory: data?.content,
    walletHistoryPagination: data?.pageable,
    fetchingWalletHistory: isFetching,
    refetchWalletHistory: refetch,
    walletHistorySuccess: isSuccess,
    walletHistoryPaused: isPaused,
    walletHistoryError: isError,
    removeWalletHistory: remove,
  };
};
