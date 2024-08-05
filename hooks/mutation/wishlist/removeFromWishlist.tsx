import useShowToast from "@/hooks/useShowToast";
import { deleteRequest } from "@/utils/apiCaller";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  const removeFromWishlistMutation = (itemId: string) => {
    return deleteRequest({
      url: `/user/wishlist/${itemId}`,
    });
  };

  const { mutate, isLoading, ...rest } = useMutation({
    mutationFn: removeFromWishlistMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);

      showToast({
        altText: "Remove from wishlist",
        title: "Product removed from wishlist",
        description:
          "The product has been removed from your wishlist successfully.",
        variant: "success",
        actionExists: false,
      });
    },
    onError: () => {
      showToast({
        altText: "Remove from wishlist",
        title: "Something went wrong!",
        description:
          "An error occurred while removing the product from your wishlist. Please try again.",
        variant: "destructive",
        actionExists: false,
      });
    },
  });

  return {
    removeItemFromWishlist: mutate,
    removingItem: isLoading,
    ...rest,
  };
};
export default useRemoveFromWishlist;
