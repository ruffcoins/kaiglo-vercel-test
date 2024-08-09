import { IProduct } from "@/interfaces/product.interface";
import { IRelatedProductResponse } from "@/interfaces/responses/product.interface";
import { postRequest } from "@/utils/apiCaller";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useRelatedProducts = (category: string, productId: string) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
    remove,
  } = useInfiniteQuery<IRelatedProductResponse, Error>(
    ["related-products"],
    ({ pageParam = 0 }) =>
      postRequest<
        { category: string; productId: string },
        IRelatedProductResponse
      >({
        url: `product/recommendation/${pageParam}`,
        payload: { category, productId },
      }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.last) return undefined; // No more pages
        return lastPage.number + 1; // Next page number
      },
      enabled: !!category && !!productId,
      staleTime: 1000 * 60 * 30,
      cacheTime: 1000 * 60 * 60,
    },
  );

  const relatedProducts: IProduct[] =
    data?.pages.flatMap((page) => page.content) ?? [];

  return {
    relatedProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetchRelatedProducts: refetch,
    removeRelatedProducts: remove,
    totalProducts: data?.pages[data.pages.length - 1]?.totalElements,
    currentPage: data?.pages[data.pages.length - 1]?.number as number,
    totalPages: data?.pages[data.pages.length - 1]?.totalPages,
  };
};
