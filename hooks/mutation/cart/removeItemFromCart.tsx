import useShowToast from "@/hooks/useShowToast";
import { deleteRequest } from "@/utils/apiCaller";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRemoveItemFromCart = () => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  const removeItemFromCartMutation = (itemId: string) => {
    return deleteRequest({
      url: `/carts/${itemId}`,
    });
  };

  const { mutate, mutateAsync, isLoading, ...rest } = useMutation({
    mutationFn: removeItemFromCartMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      // showToast({
      //   altText: "Remove from cart",
      //   title: "Product removed from cart",
      //   description:
      //     "The product has been removed from your cart successfully.",
      //   variant: "success",
      //   actionExists: false,
      // });
    },
    onError: () => {
      showToast({
        altText: "Remove from cart",
        title: "Something went wrong!",
        description:
          "An error occurred while removing product from your cart. Please try again.",
        variant: "destructive",
        actionExists: false,
      });
    },
  });

  return {
    removeItemFromCart: mutate,
    removeItemFromCartAsync: mutateAsync,
    removingItem: isLoading,
    ...rest,
  };
};
export default useRemoveItemFromCart;
