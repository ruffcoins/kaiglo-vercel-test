import { getRequest } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";
import { IGetStatesAndCitiesResponse } from "@/interfaces/responses/address.interface";

export const useGetAllStatesAndCities = () => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["states-and-cities"],
      () =>
        getRequest<IGetStatesAndCitiesResponse>({
          url: "/home-page/home-content-shipping",
        }),
      {
        staleTime: 1000 * 60 * 30,
        cacheTime: 1000 * 60 * 60,
      },
    );

  return {
    statesAndCities: data?.response,
    fetchingStatesAndCities: isFetching,
    statesAndCitiesSuccess: isSuccess,
    statesAndCitiesPaused: isPaused,
    statesAndCitiesError: isError,
    refetchStatesAndCities: refetch,
    removeStatesAndCities: remove,
  };
};
