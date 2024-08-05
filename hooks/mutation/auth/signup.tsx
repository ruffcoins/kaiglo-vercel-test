import { CommonAuthFormDTO } from "@/interfaces/dtos/auth.dto.interface";
import { ISignUpResponse } from "@/interfaces/responses/auth.interface";
import { postRequest } from "@/utils/apiCaller";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useShowToast from "@/hooks/useShowToast";
import { useRouter } from "next/navigation";

export const useSignUp = ({
  setShowOtpModal,
  setOpenAuthModal,
}: {
  setShowOtpModal?: Dispatch<SetStateAction<boolean>>;
  setOpenAuthModal?: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [mutationError, setMutationError] = useState(false);
  const [mutationSuccess, setMutationSuccess] = useState(false);
  const [data, setData] = useState<ISignUpResponse | null>(null);
  const showToast = useShowToast();

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const signUpMutation = async (payload: CommonAuthFormDTO) => {
    setEmail(payload.email);
    setPhone(payload.phone);

    return postRequest<CommonAuthFormDTO, ISignUpResponse>({
      url: "/auth/request-otp/new-user",
      payload,
    });
  };

  useEffect(() => {
    if (mutationSuccess) {
      if (setShowOtpModal) {
        setShowOtpModal(true);
      }
      if (setOpenAuthModal) {
        setOpenAuthModal(false);
      }

      if (setShowOtpModal === undefined && setOpenAuthModal === undefined) {
        router.push(`/auth/enter-otp?email=${email}&phone=${phone}`);
      }

      showToast({
        altText: "OTP Sent",
        title: "OTP Sent",
        description: "Your OTP has been sent successfully.",
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
    mutationFn: signUpMutation,
    onSuccess: (responseData) => {
      setData(responseData);
      if (responseData.response === "error") {
        setMutationError(true);
      } else {
        setMutationSuccess(true);
      }
    },
  });

  return {
    signup: mutate,
    signingUp: isLoading,
    ...rest,
  };
};
