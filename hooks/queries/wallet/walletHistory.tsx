"use client";

import { IWalletHistoryResponse } from "@/interfaces/responses/wallet.interface";
import { getRequestParams } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";

export const useWalletHistory = () => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["wallet-history", 0],
      () =>
        getRequestParams<{ page: number }, IWalletHistoryResponse>({
          url: "/wallets/histories",
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
