import { AllCategoryResponse } from "@/interfaces/responses/allCategory.interface";
import { getRequest } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCategories = () => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["all-categories"],
      () =>
        getRequest<AllCategoryResponse>({
          url: "/product-category/category-view",
        }),
      {
        staleTime: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 30,
      },
    );

  return {
    allCategories: data?.response,
    fetchingAllCategories: isFetching,
    refetchAllCategories: refetch,
    allCategoriesSuccess: isSuccess,
    allCategoriesPaused: isPaused,
    allCategoriesError: isError,
    removeAllCategories: remove,
  };
};

export default useGetAllCategories;
