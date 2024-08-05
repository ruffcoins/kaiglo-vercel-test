import useShowToast from "@/hooks/useShowToast";
import { postRequest } from "@/utils/apiCaller";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface IAddAddressDTO {
  city: string;
  defaultAddress: boolean;
  firstName: string;
  lastName: string;
  name: string;
  phoneNumber: string;
  state: string;
}

const useAddAddress = () => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  const addAddressMutation = (payload: IAddAddressDTO) => {
    return postRequest({
      url: `/address/add`,
      payload,
    });
  };

  const { mutate, mutateAsync, isLoading, ...rest } = useMutation({
    mutationFn: addAddressMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["addresses"]);

      showToast({
        altText: "Add Address",
        title: "Address Added",
        description: "Your address has been added successfully.",
        variant: "success",
        actionExists: false,
      });
    },
    onError: () => {
      showToast({
        altText: "Add Address",
        title: "Something went wrong!",
        description:
          "An error occurred while adding address. Please try again.",
        variant: "destructive",
        actionExists: false,
      });
    },
  });

  return {
    addAddress: mutate,
    addAddressAsync: mutateAsync,
    addingAddress: isLoading,
    ...rest,
  };
};

export default useAddAddress;
