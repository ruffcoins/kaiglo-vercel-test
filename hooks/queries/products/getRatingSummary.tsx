"use client";

import { IRatingAndReviewSummaryResponse } from "@/interfaces/responses/ratingAndReview.interface";
import { getRequestParams } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";

export const useGetRatingAndReviewSummary = (productId: string) => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["rating-summary", productId],
      () =>
        getRequestParams<
          { productId: string },
          IRatingAndReviewSummaryResponse
        >({
          url: "/review-comment/summary",
          params: { productId },
        }),
      {
        enabled: !!productId,
        staleTime: 1000 * 60 * 30,
        cacheTime: 1000 * 60 * 60,
        // temp fix for retry issue when no summary exists
        retry: 0,
      },
    );

  return {
    ratingAndReviewSummary: data,
    fetchingRatingAndReviewSummary: isFetching,
    refetchRatingAndReviewSummary: refetch,
    ratingAndReviewSummarySuccess: isSuccess,
    ratingAndReviewPaused: isPaused,
    ratingAndReviewSummaryError: isError,
    removeRatingAndReviewSummary: remove,
  };
};
