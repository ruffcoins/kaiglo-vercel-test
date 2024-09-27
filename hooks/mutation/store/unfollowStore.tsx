import { postRequest } from "@/utils/apiCaller";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useShowToast from "@/hooks/useShowToast";
import { useFetchUserProfile } from "@/hooks/queries/userProfile";
import { IUnfollowStoreResponse } from "@/interfaces/responses/store.interface";

interface UnfollowStoreDTO {}

export const useUnfollowStore = (storeId: string, storeName: string) => {
  const queryClient = useQueryClient();
  const { user } = useFetchUserProfile();
  const showToast = useShowToast();

  const unfollowStoreMutation = async () => {
    return postRequest<UnfollowStoreDTO, IUnfollowStoreResponse>({
      url: `/unfollow/${storeId}/${user?.id}`,
      payload: {} as UnfollowStoreDTO,
    });
  };

  const { mutate, isLoading, ...rest } = useMutation({
    mutationFn: unfollowStoreMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(["store", decodeURIComponent(storeName)]);

      showToast({
        altText: "Unfollow store",
        title: "Store unfollowed successfully",
        description: "You have successfully unfollowed this store.",
        variant: "success",
        actionExists: false,
      });
    },
    onError: () => {
      showToast({
        altText: "Unfollow store",
        title: "Something went wrong!",
        description:
          "An error occurred while unfollowing this store. Please try again.",
        variant: "destructive",
        actionExists: false,
      });
    },
  });

  return {
    unfollowStore: mutate,
    unfollowingStore: isLoading,
    ...rest,
  };
};
