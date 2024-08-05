import useShowToast from "@/hooks/useShowToast";
import { WishListItem } from "@/interfaces/responses/user.interface";
import { postRequest } from "@/utils/apiCaller";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { read } from "fs";

interface ReadNotificationPayload {
  notificationId: string;
  userId: string;
}

const useReadNotification = () => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  const readNotificationMutation = (payload: ReadNotificationPayload) => {
    return postRequest({
      url: `/notification/mark`,
      payload,
    });
  };

  const { mutate, isLoading, ...rest } = useMutation({
    mutationFn: readNotificationMutation,
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
    readNotification: mutate,
    readingNotification: isLoading,
    ...rest,
  };
};
export default useReadNotification;
