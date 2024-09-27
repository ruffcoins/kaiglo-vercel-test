import { IProduct } from "@/interfaces/product.interface";
import { IGroupBuyProductResponse } from "@/interfaces/responses/product.interface";
import { getRequest } from "@/utils/apiCaller";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGroupBuyProducts = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
    remove,
    isRefetching,
    isFetching,
  } = useInfiniteQuery<IGroupBuyProductResponse, Error>(
    ["group-buy-products"],
    ({ pageParam = 0 }) =>
      getRequest<IGroupBuyProductResponse>({
        url: `/product/on-sale/GROUP_BUY/${pageParam}`,
      }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.last) return undefined; // No more pages
        return lastPage.number + 1; // Next page number
      },
      staleTime: 1000 * 60 * 30,
      cacheTime: 1000 * 60 * 30,
    },
  );

  const groupBuyProducts: IProduct[] =
    data?.pages.flatMap((page) => page.content) ?? [];

  return {
    groupBuyProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isRefetching,
    status,
    error,
    refetchGroupBuyProducts: refetch,
    removeGroupBuyProducts: remove,
    totalProducts: data?.pages[data.pages.length - 1]?.totalElements,
    currentPage: data?.pages[data.pages.length - 1]?.number as number,
    totalPages: data?.pages[data.pages.length - 1]?.totalPages,
  };
};
