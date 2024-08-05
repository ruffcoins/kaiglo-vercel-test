import { getRequest } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";

import { IGetAllAddressesResponse } from "@/interfaces/responses/address.interface";

export const useGetAllAddresses = () => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["addresses"],
      () =>
        getRequest<IGetAllAddressesResponse>({
          url: "/address/all",
        }),
      {
        staleTime: 1000 * 60 * 30,
        cacheTime: 1000 * 60 * 60,
      },
    );

  return {
    addresses: data?.response,
    fetchingAddresses: isFetching,
    addressesSuccess: isSuccess,
    addressesPaused: isPaused,
    addressesError: isError,
    refetchAddresses: refetch,
    removeAddresses: remove,
  };
};
