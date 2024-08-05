"use client";

import { IReferralResponse } from "@/interfaces/responses/referral.interface";
import { getRequest } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";
import { useFetchUserProfile } from "../userProfile";

export const useReferral = () => {
  const { user } = useFetchUserProfile();
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["referral"],
      () =>
        getRequest<IReferralResponse>({
          url: `/referrals/${user?.id}/fetch`,
        }),
      {
        enabled: !!user?.id,
        staleTime: 1000 * 60 * 30,
        cacheTime: 1000 * 60 * 60,
      },
    );

  return {
    referral: data?.response,
    fetchingReferral: isFetching,
    refetchReferral: refetch,
    referralSuccess: isSuccess,
    referralPaused: isPaused,
    referralError: isError,
    removeReferral: remove,
  };
};
