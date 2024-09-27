import { putRequest } from "@/utils/apiCaller";
import { useMutation } from "@tanstack/react-query";
import { IFundWalletResponse } from "@/interfaces/responses/wallet.interface";
import useShowToast from "@/hooks/useShowToast";

interface FundWalletDTO {
  amount: number;
  description: string;
  referenceCode: string;
  tranType: string;
  userId: string;
}

export const useFundWallet = () => {
  const showToast = useShowToast();

  const fundWalletMutation = async (payload: FundWalletDTO) => {
    return putRequest<FundWalletDTO, IFundWalletResponse>({
      url: "/wallets/fund-wallet",
      payload,
    });
  };

  const { mutate, isLoading, ...rest } = useMutation({
    mutationFn: fundWalletMutation,
    onSuccess: () => {
      showToast({
        altText: "Fund wallet",
        title: "Wallet funded successfully",
        description: "Your wallet has been funded successfully.",
        variant: "success",
        actionExists: false,
      });
    },
    onError: () => {
      showToast({
        altText: "Fund wallet",
        title: "Something went wrong!",
        description:
          "An error occurred while funding your wallet. Please try again.",
        variant: "destructive",
        actionExists: false,
      });
    },
  });

  return {
    fundWallet: mutate,
    fundingWallet: isLoading,
    ...rest,
  };
};
