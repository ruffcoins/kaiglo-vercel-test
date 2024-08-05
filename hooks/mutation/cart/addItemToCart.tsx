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

const useAddItemToCart = () => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  const addItemToCartMutation = (payload: IAddToCartDTO) => {
    return postRequest({
      url: `/carts/`,
      payload,
    });
  };

  const { mutate, mutateAsync, isLoading, ...rest } = useMutation({
    mutationFn: addItemToCartMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);

      showToast({
        altText: "Add to cart",
        title: "Product added to cart",
        description: "The product has been added to your cart successfully.",
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
          "An error occurred while adding the product to your cart. Please try again.",
        variant: "destructive",
        actionExists: false,
      });
    },
  });

  return {
    addItemToCart: mutate,
    addItemToCartAsync: mutateAsync,
    addingItem: isLoading,
    ...rest,
  };
};
export default useAddItemToCart;
