import { putRequest } from "@/utils/apiCaller";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IDebitWalletResponse } from "@/interfaces/responses/wallet.interface";

interface DebitWalletDTO {
  amount: number;
  channel: string;
  description: string;
  referenceCode: string;
  tranType: string;
  userId: string;
}

export const useDebitWallet = () => {
  const queryClient = useQueryClient();

  const debitWalletMutation = async (payload: DebitWalletDTO) => {
    return putRequest<DebitWalletDTO, IDebitWalletResponse>({
      url: "/wallets/debit-wallet",
      payload,
    });
  };

  const { mutate, mutateAsync, isLoading, ...rest } = useMutation({
    mutationFn: debitWalletMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(["user-wallet"]);
    },
  });

  return {
    debitWallet: mutate,
    debitWalletAsync: mutateAsync,
    debitingWallet: isLoading,
    ...rest,
  };
};
