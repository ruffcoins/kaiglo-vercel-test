import useShowToast from "@/hooks/useShowToast";
import { WishListItem } from "@/interfaces/responses/user.interface";
import { postRequest } from "@/utils/apiCaller";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  const addToWishlistMutation = (payload: WishListItem) => {
    return postRequest({
      url: `/user/wishlist/add`,
      payload,
    });
  };

  const { mutate, isLoading, ...rest } = useMutation({
    mutationFn: addToWishlistMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);

      showToast({
        altText: "Add to wishlist",
        title: "Product added to wishlist",
        description:
          "The product has been added to your wishlist successfully.",
        variant: "success",
        actionExists: false,
      });
    },
    onError: () => {
      showToast({
        altText: "Add to wishlist",
        title: "Something went wrong!",
        description:
          "An error occurred while adding the product to your wishlist. Please try again.",
        variant: "destructive",
        actionExists: false,
      });
    },
  });

  return {
    addProductToWishlist: mutate,
    addingItem: isLoading,
    ...rest,
  };
};
export default useAddToWishlist;
