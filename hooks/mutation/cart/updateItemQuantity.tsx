import useShowToast from "@/hooks/useShowToast";
import { UpdateCartItemResponse } from "@/interfaces/responses/cart.interface";
import { getRequestParams } from "@/utils/apiCaller";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateItemQuantity = () => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  const updateItemQuantityMutation = (cartId: string, quantity: number) => {
    return getRequestParams<{ quantity: number }, UpdateCartItemResponse>({
      url: `/carts/${cartId}/updateCart`,
      params: { quantity },
    });
  };

  const { mutate, isLoading, ...rest } = useMutation({
    mutationFn: ({ cartId, quantity }: { cartId: string; quantity: number }) =>
      updateItemQuantityMutation(cartId, quantity),

    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  return {
    updateItemQuantity: mutate,
    updatingItemQuantity: isLoading,
    ...rest,
  };
};
export default useUpdateItemQuantity;
