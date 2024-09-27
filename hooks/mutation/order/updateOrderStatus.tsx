import useShowToast from "@/hooks/useShowToast";
import { IUpdateOrderStatusDTO } from "@/interfaces/dtos/order.dto.interface";
import { UpdateOrderStatusResponse } from "@/interfaces/responses/order.interface";
import { postRequest } from "@/utils/apiCaller";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateOrderStatus = (orderId: string) => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  const updateOrderStatusMutation = (payload: IUpdateOrderStatusDTO) => {
    try {
      const response = postRequest<
        IUpdateOrderStatusDTO,
        UpdateOrderStatusResponse
      >({
        url: `/order/status`,
        payload,
      });
      return response;
    } catch (error: any) {
      if (error.response) {
        showToast({
          altText: "Update Order Status",
          title: "Something went wrong!",
          description: error.response.data.message,
          variant: "destructive",
          actionExists: false,
        });
      } else {
        showToast({
          altText: "Update Order Status",
          title: "Something went wrong!",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
          actionExists: false,
        });
      }
      throw error;
    }
  };

  const { mutate, mutateAsync, isLoading, ...rest } = useMutation({
    mutationFn: updateOrderStatusMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["order-details", orderId]);
      queryClient.invalidateQueries(["user-orders"]);

      showToast({
        altText: "Update Order Status",
        title: "Order Status Updated",
        description: "Order status has been updated successfully.",
        variant: "success",
        actionExists: false,
      });
    },
    onError: () => {
      showToast({
        altText: "Update Order Status",
        title: "Something went wrong!",
        description:
          "An error occurred while updating order status. Please try again.",
        variant: "destructive",
        actionExists: false,
      });
    },
  });

  return {
    updateOrderStatus: mutate,
    updateOrderStatusAsync: mutateAsync,
    updatingOrderStatus: isLoading,
    ...rest,
  };
};

export default useUpdateOrderStatus;
