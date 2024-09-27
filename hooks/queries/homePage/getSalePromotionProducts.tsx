"product/sale-promotions?name=FLASH_SALES&page=0&size=15";

import { IProduct } from "@/interfaces/product.interface";
import { SalesPromotionProductResponse } from "@/interfaces/responses/salesPromotion.interface";
import { getRequestParams } from "@/utils/apiCaller";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetSalePromotionProducts = (name: string) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
    remove,
  } = useInfiniteQuery<SalesPromotionProductResponse, Error>(
    ["sale-promotion-products", name],
    ({ pageParam = 0 }) =>
      getRequestParams<
        { name: string; page: number; size: number },
        SalesPromotionProductResponse
      >({
        url: `/product/sale-promotions`,
        params: { name, page: pageParam, size: 15 },
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

  const promotionProducts: IProduct[] =
    data?.pages.flatMap((page) => page.content) ?? [];

  return {
    promotionProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetchPromotionProducts: refetch,
    removePromotionProducts: remove,
    totalProducts: data?.pages[data.pages.length - 1]?.totalElements,
    currentPage: data?.pages[data.pages.length - 1]?.number as number,
    totalPages: data?.pages[data.pages.length - 1]?.totalPages,
  };
};
