import { AbandonedOrderDTO } from "@/interfaces/orders/order.interface";
import { postRequest } from "@/utils/apiCaller";
import { useMutation } from "@tanstack/react-query";

const useAbandonedOrder = () => {
  const abandonedOrderMutation = (payload: AbandonedOrderDTO) => {
    return postRequest({
      url: `/abandoned-orders`,
      payload,
    });
  };

  const { mutate, mutateAsync, isLoading, ...rest } = useMutation({
    mutationFn: abandonedOrderMutation,
    retry: 3,
  });

  return {
    abandonedOrder: mutate,
    abandonedOrderAsync: mutateAsync,
    abandoningOrder: isLoading,
    ...rest,
  };
};

export default useAbandonedOrder;
