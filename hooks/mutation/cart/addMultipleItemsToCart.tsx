import useShowToast from "@/hooks/useShowToast";
import { postRequest } from "@/utils/apiCaller";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface IAddToCartDTO {
  color: string;
  platform: string;
  price: number;
  productId: string;
  productUrl: string;
  quantity: string;
  ramSize?: string;
  size?: string;
  storage?: string;
  userId: string;
}

const useAddMultipleItemsToCart = () => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  const addMultipleItemsToCartMutation = (payload: IAddToCartDTO[]) => {
    return postRequest({
      url: `/carts/add-many`,
      payload: { cartList: payload },
    });
  };

  const { mutate, mutateAsync, isLoading, ...rest } = useMutation({
    mutationFn: addMultipleItemsToCartMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);

      showToast({
        altText: "Add to cart",
        title: "Products added to cart",
        description: "The products has been added to your cart successfully.",
        variant: "success",
        actionExists: false,
      });
    },
    onError: (error) => {
      console.error("Error adding to cart", error);
      showToast({
        altText: "Add to cart",
        title: "Something went wrong!",
        description:
          "An error occurred while adding the products to your cart. Please try again.",
        variant: "destructive",
        actionExists: false,
      });
    },
  });

  return {
    addMultipleItemsToCart: mutate,
    addMultipleItemsToCartAsync: mutateAsync,
    addingItems: isLoading,
    ...rest,
  };
};
export default useAddMultipleItemsToCart;
