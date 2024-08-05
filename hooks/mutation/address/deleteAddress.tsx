import useShowToast from "@/hooks/useShowToast";
import { deleteRequest } from "@/utils/apiCaller";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  const deleteAddressMutation = (addressId: string) => {
    return deleteRequest({
      url: `/address/${addressId}/delete`,
    });
  };

  const { mutate, mutateAsync, isLoading, ...rest } = useMutation({
    mutationFn: deleteAddressMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["addresses"]);

      showToast({
        altText: "Delete Address",
        title: "Address Deleted",
        description: "Your address has been deleted successfully.",
        variant: "success",
        actionExists: false,
      });
    },
    onError: () => {
      showToast({
        altText: "Delete Address",
        title: "Something went wrong!",
        description:
          "An error occurred while deleting address. Please try again.",
        variant: "destructive",
        actionExists: false,
      });
    },
  });

  return {
    deleteAddress: mutate,
    deleteAddressAsync: mutateAsync,
    deletingAddress: isLoading,
    ...rest,
  };
};
export default useDeleteAddress;
