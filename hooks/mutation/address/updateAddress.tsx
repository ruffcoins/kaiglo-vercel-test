import useShowToast from "@/hooks/useShowToast";
import { UpdateAddressFormDTO } from "@/interfaces/dtos/address.dto.interface";
import { postRequest } from "@/utils/apiCaller";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  const updateAddressMutation = (payload: UpdateAddressFormDTO) => {
    return postRequest({
      url: `/address/update`,
      payload,
    });
  };

  const { mutate, mutateAsync, isLoading, ...rest } = useMutation({
    mutationFn: updateAddressMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["addresses"]);

      showToast({
        altText: "Update Address",
        title: "Address Updated",
        description: "Your address has been updated successfully.",
        variant: "success",
        actionExists: false,
      });
    },
    onError: () => {
      showToast({
        altText: "Update Address",
        title: "Something went wrong!",
        description:
          "An error occurred while updating address. Please try again.",
        variant: "destructive",
        actionExists: false,
      });
    },
  });

  return {
    updateAddress: mutate,
    updateAddressAsync: mutateAsync,
    updatingAddress: isLoading,
    ...rest,
  };
};

export default useUpdateAddress;
