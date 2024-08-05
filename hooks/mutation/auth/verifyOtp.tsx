import { IOtpFormDTO } from "@/interfaces/dtos/auth.dto.interface";
import { postRequest } from "@/utils/apiCaller";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useShowToast from "@/hooks/useShowToast";
import { IUserResponse } from "@/interfaces/responses/user.interface";
import { IVerifyOtpErrorResponse } from "@/interfaces/responses/auth.interface";
import { AxiosError } from "axios";
import { setToken, setUserId } from "@/utils/auth";
import { useRouter } from "next/navigation";

export const useVerifyOtp = ({
  setShowOtpModal,
}: {
  setShowOtpModal?: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [mutationError, setMutationError] = useState(false);
  const [mutationSuccess, setMutationSuccess] = useState(false);
  const [errorData, setErrorData] = useState<
    IVerifyOtpErrorResponse | undefined
  >(undefined);

  const showToast = useShowToast();

  useEffect(() => {
    if (mutationSuccess) {
      if (setShowOtpModal) {
        setShowOtpModal(false);
      }

      if (setShowOtpModal === undefined) {
        const originalUrl = sessionStorage.getItem("originalUrl") || "/";
        router.push(originalUrl);
      }

      showToast({
        altText: "Authentication Successful",
        title: "Authentication Successful",
        description: "You have successfully logged in",
        variant: "success",
        actionExists: false,
      });
    } else if (mutationError && errorData?.error === "Unauthorized") {
      showToast({
        altText: "Something went wrong",
        title: "Uh, oh! Something went wrong",
        description: "Your OTP is invalid.",
        variant: "destructive",
        actionExists: false,
      });
    }
  }, [mutationSuccess, mutationError, errorData]);

  const verifyOtpMutation = async (payload: IOtpFormDTO) => {
    return postRequest<IOtpFormDTO, IUserResponse>({
      url: "/auth/login",
      payload: {
        email: payload.email,
        phone: payload.phone,
        otp: payload.otp,
      },
    });
  };

  const { mutate, isLoading, ...rest } = useMutation({
    mutationFn: verifyOtpMutation,
    onSuccess: (responseData) => {
      setMutationSuccess(true);
      setToken(responseData.token);
      setUserId(responseData.user.id);
    },
    onError: ({
      response,
    }: AxiosError<IVerifyOtpErrorResponse | undefined>) => {
      setMutationError(true);
      setErrorData(response?.data);
      console.log("error", response?.data?.error);
    },
  });

  return {
    verifyOtp: mutate,
    verifyingOtp: isLoading,
    ...rest,
  };
};
