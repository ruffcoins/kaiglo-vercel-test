import { IProduct } from "@/interfaces/product.interface";
import { IAppDealsProductResponse } from "@/interfaces/responses/product.interface";
import { getRequest } from "@/utils/apiCaller";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useAppDealsProducts = () => {
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
  } = useInfiniteQuery<IAppDealsProductResponse, Error>(
    ["app-deals-products"],
    ({ pageParam = 0 }) =>
      getRequest<IAppDealsProductResponse>({
        url: `/product/on-sale/APP_ONLY_DEALS/${pageParam}`,
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

  const appDealsProducts: IProduct[] =
    data?.pages.flatMap((page) => page.content) ?? [];

  return {
    appDealsProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isRefetching,
    status,
    error,
    refetchAppDealsProducts: refetch,
    removeAppDealsProducts: remove,
    totalProducts: data?.pages[data.pages.length - 1]?.totalElements,
    currentPage: data?.pages[data.pages.length - 1]?.number as number,
    totalPages: data?.pages[data.pages.length - 1]?.totalPages,
  };
};
