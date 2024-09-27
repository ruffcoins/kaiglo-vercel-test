"use client";

import { getRequestParams } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";
import { useFetchUserProfile } from "../userProfile";
import { IStoreDetailsResponse } from "@/interfaces/responses/store.interface";

export const useGetStoreDetails = (storeName: string) => {
  const { user } = useFetchUserProfile();
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["store", decodeURIComponent(storeName)],
      () =>
        getRequestParams<{ userId: string }, IStoreDetailsResponse>({
          url: `/store/store-view/${storeName}`,
          params: { userId: user?.id },
        }),
      {
        enabled: !!storeName,
      },
    );

  return {
    store: data?.response,
    fetchingStore: isFetching,
    storeSuccess: isSuccess,
    storeError: isError,
    storePaused: isPaused,
    refetchStore: refetch,
    removeStore: remove,
  };
};
