"use client";

import { IUserWalletResponse } from "@/interfaces/responses/wallet.interface";
import { getRequestParams } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";
import { useFetchUserProfile } from "../userProfile";

export const useUserWallet = () => {
  const { user } = useFetchUserProfile();

  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["user-wallet"],
      () =>
        getRequestParams<{ userId: string }, IUserWalletResponse>({
          url: "/wallets/get-wallet-info-new",
          params: { userId: user?.id },
        }),
      {
        enabled: !!user?.id,
        staleTime: 1000 * 60 * 30,
        cacheTime: 1000 * 60 * 60,
      },
    );

  return {
    wallet: data?.response,
    fetchingWallet: isFetching,
    refetchWallet: refetch,
    walletSuccess: isSuccess,
    walletPaused: isPaused,
    walletError: isError,
    removeWallet: remove,
  };
};
