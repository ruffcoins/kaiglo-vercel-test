import { IProduct } from "@/interfaces/product.interface";
import { IFeaturedProductResponse } from "@/interfaces/responses/product.interface";
import { getRequestParams } from "@/utils/apiCaller";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useFeaturedProducts = () => {
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
  } = useInfiniteQuery<IFeaturedProductResponse, Error>(
    ["featured-products"],
    ({ pageParam = 0 }) =>
      getRequestParams<{ page: number }, IFeaturedProductResponse>({
        url: `/product/featured`,
        params: { page: pageParam },
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

  const featuredProducts: IProduct[] =
    data?.pages.flatMap((page) => page.content) ?? [];

  return {
    featuredProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isRefetching,
    status,
    error,
    refetchFeaturedProducts: refetch,
    removeFeaturedProducts: remove,
    totalProducts: data?.pages[data.pages.length - 1]?.totalElements,
    currentPage: data?.pages[data.pages.length - 1]?.number as number,
    totalPages: data?.pages[data.pages.length - 1]?.totalPages,
  };
};
