import { getRequest } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";
import { HomeCategoryResponse } from "@/interfaces/responses/category.interface";

export const useGetCategories = () => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["home-categories"],
      () =>
        getRequest<HomeCategoryResponse>({
          url: "/home-page/home-content-popular-category",
        }),
      {
        staleTime: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 60,
      },
    );

  return {
    homeCategories: data?.response,
    fetchingHomeCategories: isFetching,
    refetchHomeCategories: refetch,
    homeCategoriesSuccess: isSuccess,
    homeCategoriesPaused: isPaused,
    homeCategoriesError: isError,
    removeHomeCategories: remove,
  };
};

export default useGetCategories;
