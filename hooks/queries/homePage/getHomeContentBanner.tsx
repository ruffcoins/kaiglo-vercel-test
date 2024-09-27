import { getRequest } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";
import { HomeContentBannerResponse } from "@/interfaces/responses/homepageBanner.interface";

export const useHomeContentBanner = () => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["home-content-banner"],
      () =>
        getRequest<HomeContentBannerResponse>({
          url: "/home-page/home-content-banner",
        }),
      {
        staleTime: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 60,
      },
    );

  return {
    homeContentBanner: data?.response,
    fetchingHomeContentBanner: isFetching,
    refetchHomeContentBanner: refetch,
    homeContentBannerSuccess: isSuccess,
    homeContentBannerPaused: isPaused,
    homeContentBannerError: isError,
    removeHomeContentBanner: remove,
  };
};

export default useHomeContentBanner;
