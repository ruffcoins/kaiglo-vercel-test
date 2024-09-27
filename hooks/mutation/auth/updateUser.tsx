import { IUpdateUserResponse } from "@/interfaces/responses/auth.interface";
import { postRequest } from "@/utils/apiCaller";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useShowToast from "@/hooks/useShowToast";
import { UpdateUserFormDTO } from "@/interfaces/dtos/updateUser.dto.interface";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  const updateUserMutation = (payload: UpdateUserFormDTO) => {
    const firstName = payload.firstName;
    const lastName = payload.lastName;

    return postRequest<UpdateUserFormDTO, IUpdateUserResponse>({
      url: "/user/profile/edit",
      payload: { firstName, lastName },
    });
  };

  const { mutate, mutateAsync, isLoading, ...rest } = useMutation({
    mutationFn: updateUserMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);

      showToast({
        altText: "Update Profile",
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
        variant: "success",
        actionExists: false,
      });
    },
    onError: () => {
      showToast({
        altText: "Something went wrong",
        title: "Uh, oh! Something went wrong",
        description:
          "An error occurred while updating profile. Please try again.",
        variant: "destructive",
        actionExists: false,
      });
    },
  });

  return {
    updateUser: mutate,
    updateUserAsync: mutateAsync,
    updatingUser: isLoading,
    ...rest,
  };
};
