import useShowToast from "@/hooks/useShowToast";
import { IRatingAndReviewDTO } from "@/interfaces/dtos/ratingAndReview.interface";
import { postRequest } from "@/utils/apiCaller";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRateAndReviewProduct = (productId: string) => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  const ratingAndReviewMutation = (payload: IRatingAndReviewDTO) => {
    return postRequest({
      url: `/store/rate-store-product`,
      payload,
    });
  };

  const { mutate, mutateAsync, isLoading, ...rest } = useMutation({
    mutationFn: ratingAndReviewMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", productId]);

      showToast({
        altText: "Rate and Review Product",
        title: "Product Rated and Reviewed",
        description: "Product has been rated and reviewed successfully.",
        variant: "success",
        actionExists: false,
      });
    },
    onError: () => {
      showToast({
        altText: "Rate and Review Product",
        title: "Something went wrong!",
        description:
          "An error occurred while rating and reviewing product. Please try again.",
        variant: "destructive",
        actionExists: false,
      });
    },
  });

  return {
    rateAndReviewProduct: mutate,
    rateAndReviewProductAsync: mutateAsync,
    ratingAndReviewingProduct: isLoading,
    ...rest,
  };
};

export default useRateAndReviewProduct;
