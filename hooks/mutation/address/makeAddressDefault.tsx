import useShowToast from "@/hooks/useShowToast";
import { UpdateAddressFormDTO } from "@/interfaces/dtos/address.dto.interface";
import { postRequest } from "@/utils/apiCaller";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useMakeAddressDefault = () => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  const makeAddressDefaultMutation = (payload: UpdateAddressFormDTO) => {
    return postRequest({
      url: `/address/default`,
      payload,
    });
  };

  const { mutate, mutateAsync, isLoading, ...rest } = useMutation({
    mutationFn: makeAddressDefaultMutation,
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
    makeAddressDefault: mutate,
    makingAddressDefault: isLoading,
    ...rest,
  };
};

export default useMakeAddressDefault;
