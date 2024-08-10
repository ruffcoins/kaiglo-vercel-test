import { useUserWallet } from "@/hooks/queries/wallet/getUserWallet";
import { useWalletHistory } from "@/hooks/queries/wallet/walletHistory";
import { SetStateAction, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Loader from "./Loader";

export const PaymentProcessingDialog = ({
  isProcessing,
  setIsProcessing,
}: {
  isProcessing: boolean;
  setIsProcessing: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { refetchWalletHistory } = useWalletHistory();
  const { refetchWallet } = useUserWallet();
  useEffect(() => {
    setTimeout(() => {
      setIsProcessing(false);
      refetchWalletHistory();
      refetchWallet();
    }, 10000);
  }, []);

  return (
    <Dialog open={isProcessing}>
      <DialogContent className="w-[500px]">
        <DialogHeader>
          <DialogTitle>Processing Payment</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4 my-4">
          <div className="text-center">
            Please wait while we process your payment...
          </div>
          <Loader />
        </div>
      </DialogContent>
    </Dialog>
  );
};
