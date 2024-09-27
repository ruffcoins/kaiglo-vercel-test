import { getRequest } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";
import { ProductCategoryDetailResponse } from "@/interfaces/responses/productCategoryDetail.interface";

export const useProductCategoryDetail = (categoryName: string) => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["product-category-detail", categoryName],
      () =>
        getRequest<ProductCategoryDetailResponse>({
          url: `/product-category/filter-params/${categoryName}`,
        }),
      {
        enabled: !!categoryName,
        staleTime: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 60,
      },
    );

  return {
    productCategoryDetail: data,
    fetchingProductCategoryDetail: isFetching,
    refetchProductCategoryDetail: refetch,
    productCategoryDetailSuccess: isSuccess,
    productCategoryDetailPaused: isPaused,
    productCategoryDetailError: isError,
    removeProductCategoryDetail: remove,
  };
};
