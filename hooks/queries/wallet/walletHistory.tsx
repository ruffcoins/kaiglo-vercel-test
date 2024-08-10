"use client";

import { IWalletHistoryResponse } from "@/interfaces/responses/wallet.interface";
import { getRequestParams } from "@/utils/apiCaller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IWalletHistory } from "@/interfaces/wallet.interface";

export const useWalletHistory = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
    remove,
  } = useInfiniteQuery<IWalletHistoryResponse, Error>(
    ["wallet-history"],
    ({ pageParam = 0 }) =>
      getRequestParams<{ page: number }, IWalletHistoryResponse>({
        url: "/wallets/histories",
        params: { page: pageParam },
      }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.last) return undefined; // No more pages
        return lastPage.number + 1; // Next page number
      },
      staleTime: 1000 * 60 * 30,
      cacheTime: 1000 * 60 * 60,
    },
  );

  const walletHistory: IWalletHistory[] =
    data?.pages.flatMap((page) => page.content) ?? [];

  return {
    walletHistory,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetchWalletHistory: refetch,
    removeWalletHistory: remove,
    totalWalletHistory: data?.pages[data.pages.length - 1]?.totalElements,
    currentPage: data?.pages[data.pages.length - 1]?.number as number,
    totalPages: data?.pages[data.pages.length - 1]?.totalPages,
  };
};
