import { postRequest } from "@/utils/apiCaller";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useShowToast from "@/hooks/useShowToast";
import { useFetchUserProfile } from "@/hooks/queries/userProfile";
import { IFollowStoreResponse } from "@/interfaces/responses/store.interface";

interface FollowStoreDTO {}

export const useFollowStore = (storeId: string, storeName: string) => {
  const queryClient = useQueryClient();
  const { user } = useFetchUserProfile();
  const showToast = useShowToast();

  const followStoreMutation = async () => {
    return postRequest<FollowStoreDTO, IFollowStoreResponse>({
      url: `/follow/${storeId}/${user?.id}`,
      payload: {} as FollowStoreDTO,
    });
  };

  const { mutate, isLoading, ...rest } = useMutation({
    mutationFn: followStoreMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(["store", decodeURIComponent(storeName)]);

      showToast({
        altText: "Follow store",
        title: "Store followed successfully",
        description: "You have successfully followed this store.",
        variant: "success",
        actionExists: false,
      });
    },
    onError: () => {
      showToast({
        altText: "Follow store",
        title: "Something went wrong!",
        description:
          "An error occurred while following this store. Please try again.",
        variant: "destructive",
        actionExists: false,
      });
    },
  });

  return {
    followStore: mutate,
    followingStore: isLoading,
    ...rest,
  };
};
