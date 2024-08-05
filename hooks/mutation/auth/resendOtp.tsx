import { CommonAuthFormDTO } from "@/interfaces/dtos/auth.dto.interface";
import { ISignInResponse } from "@/interfaces/responses/auth.interface";
import { postRequest } from "@/utils/apiCaller";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useShowToast from "@/hooks/useShowToast";

export const useResendOtp = () => {
  const [mutationError, setMutationError] = useState(false);
  const [mutationSuccess, setMutationSuccess] = useState(false);
  const [data, setData] = useState<ISignInResponse | null>(null);
  const showToast = useShowToast();

  const resendOtpMutation = async (payload: CommonAuthFormDTO) => {
    return postRequest<CommonAuthFormDTO, ISignInResponse>({
      url: "/auth/request-otp/current-user",
      payload,
    });
  };

  useEffect(() => {
    if (mutationSuccess) {
      showToast({
        altText: "OTP Sent",
        title: "OTP Sent",
        description: "Your OTP has been resent successfully.",
        variant: "success",
        actionExists: false,
      });
    } else if (
      mutationError &&
      (data?.response === "error" || data?.response === "Error")
    ) {
      showToast({
        altText: "Something went wrong",
        title: "Uh, oh! Something went wrong",
        description: data.message,
        variant: "destructive",
        actionExists: false,
      });
    }
  }, [mutationSuccess, mutationError, data]);

  const { mutate, isLoading, ...rest } = useMutation({
    mutationFn: resendOtpMutation,
    onSuccess: (responseData) => {
      setData(responseData);
      if (
        responseData.response === "error" ||
        responseData.response === "Error"
      ) {
        setMutationError(true);
      } else {
        setMutationSuccess(true);
      }
    },
  });

  return {
    resend: mutate,
    resending: isLoading,
    ...rest,
  };
};
