import {
  IReviewsResponse,
  Review,
} from "@/interfaces/responses/ratingAndReview.interface";
import { getRequest } from "@/utils/apiCaller";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useProductReviews = (productId: string) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
    remove,
  } = useInfiniteQuery<IReviewsResponse, Error>(
    ["reviews", productId],
    ({ pageParam = 0 }) =>
      getRequest<IReviewsResponse>({
        url: `/review-comment/${productId}/${pageParam}`,
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

  const productReviews: Review[] =
    data?.pages.flatMap((page) => page.content) ?? [];

  return {
    productReviews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetchProductReviews: refetch,
    removeProductReviews: remove,
    totalProducts: data?.pages[data.pages.length - 1]?.totalElements,
    currentPage: data?.pages[data.pages.length - 1]?.number as number,
    totalPages: data?.pages[data.pages.length - 1]?.totalPages,
  };
};
