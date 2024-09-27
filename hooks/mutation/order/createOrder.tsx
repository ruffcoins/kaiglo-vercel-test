import useShowToast from "@/hooks/useShowToast";
import { CheckoutPaymentDTO } from "@/interfaces/checkout.interface";
import { postRequest } from "@/utils/apiCaller";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  const createOrderMutation = (payload: CheckoutPaymentDTO) => {
    return postRequest({
      url: `/order/create`,
      payload,
    });
  };

  const { mutate, mutateAsync, isLoading, ...rest } = useMutation({
    mutationFn: createOrderMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["user-orders"]);

      showToast({
        altText: "Create Order",
        title: "Order Created",
        description: "Your order has been created successfully.",
        variant: "success",
        actionExists: false,
      });
    },
    onError: () => {
      showToast({
        altText: "Create Order",
        title: "Something went wrong!",
        description:
          "An error occurred while creating order. Please try again.",
        variant: "destructive",
        actionExists: false,
      });
    },
  });

  return {
    createOrder: mutate,
    createOrderAsync: mutateAsync,
    creatingOrder: isLoading,
    ...rest,
  };
};

export default useCreateOrder;
