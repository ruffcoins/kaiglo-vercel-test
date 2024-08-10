"use client";

import Image from "next/image";
import WalletBackground from "@/public/images/wallet-background.svg";
import { Button } from "@/components/ui/button";
import { useWalletHistory } from "@/hooks/queries/wallet/walletHistory";
import Credit from "@/public/images/wallet-credit.svg";
import Debit from "@/public/images/wallet-debit.svg";
import moment from "moment";
import TopupInfo from "@/components/rewards/TopupInfo";
import Topup from "@/components/rewards/Topup";
import TopupInfoConfirmation from "@/components/rewards/TopupInfoConfirmation";
import useTopUpDialogs from "@/hooks/useTopUpDialogs";
import { useUserWallet } from "@/hooks/queries/wallet/getUserWallet";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Loader from "@/components/shared/Loader";
import { PaymentProcessingDialog } from "@/components/shared/PaymentProcessingDialog";

const formatDate = (date: string) => {
  const utcMoment = moment(date, "YYYY-MM-DDTHH:mm:ss.SSSZ");
  const formattedDate = utcMoment.format("DD-MMM-YYYY");
  return formattedDate;
};

const Rewards = () => {
  const {
    walletHistory,
    status,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useWalletHistory();
  const { wallet, fetchingWallet } = useUserWallet();
  const { ref, inView } = useInView();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    showFirstConfirmation,
    showTopUpDialog,
    setShowTopUpDialog,
    showSecondConfirmation,
    handleTopUpClick,
    handleFirstConfirmationClose,
    handleTopUpSubmit,
    handleSecondConfirmationClose,
  } = useTopUpDialogs();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <>
      <div className="space-y-4 overflow-hidden">
        <div className="flex justify-between">
          <p className="text-xl font-medium capitalize">Kaiglo Rewards</p>
        </div>
        <div className="space-y-10">
          <div className="2xl:col-span-2 relative h-[168px] w-[376px] rounded-2xl overflow-hidden mr-4">
            <Image
              src={WalletBackground}
              width={100}
              height={100}
              alt="wallet background image"
              className="w-full h-full object-cover"
            />
            <div className="flex flex-col justify-between absolute top-0 right-0 bottom-0 left-0 p-5">
              <div className="flex justify-between items-center">
                <div className="text-white">
                  {fetchingWallet || !wallet ? (
                    <div className="animate-pulse bg-gray-200 w-40 h-8 mb-2"></div>
                  ) : (
                    <p className="font-bold text-2xl">
                      ₦{wallet?.amount.toLocaleString()}
                    </p>
                  )}

                  <p className="text-xs">Your Balance</p>
                </div>

                <Button
                  variant="outline"
                  className="bg-transparent rounded-full border-[1px] border-white text-white font-medium px-4 py-2 disabled:cursor-not-allowed"
                  disabled={fetchingWallet || status === "loading"}
                  onClick={() => {
                    if (!fetchingWallet && status !== "loading") {
                      handleTopUpClick();
                    }
                  }}
                >
                  Top up
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-medium text-sm">Rewards</p>

            {status === "loading" ? (
              <div className="animate-pulse bg-gray-200 w-full h-16"></div>
            ) : (
              <div className="h-[calc(100vh-32rem)] overflow-y-auto">
                {walletHistory?.map((history) => (
                  <div
                    key={history.id}
                    className="border flex justify-between items-center p-2 rounded-lg mb-3"
                  >
                    <div className="gap-x-2 flex justify-start items-start">
                      <Image
                        src={history.tranType === "Credit" ? Credit : Debit}
                        alt={`${history.tranType}-wallet-${history.transactionId}`}
                        width={100}
                        height={100}
                        className="w-6 h-6"
                      />
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {history.description}
                        </p>
                        <p className="text-xs uppercase text-kaiglo_grey-placeholder">
                          {formatDate(history.createDate)}
                        </p>
                      </div>
                    </div>

                    <p className="font-medium text-sm text-right">
                      ₦{parseFloat(history.amount).toLocaleString()}
                    </p>
                  </div>
                ))}
                {isFetchingNextPage && (
                  <div className="flex justify-center items-center h-40">
                    <Loader />
                  </div>
                )}
                <div ref={ref}>
                  {/* This empty div acts as a sentinel for the IntersectionObserver */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <TopupInfo
        open={showFirstConfirmation}
        setOpen={handleFirstConfirmationClose}
      />

      <Topup
        open={showTopUpDialog}
        setOpen={() => setShowTopUpDialog(false)}
        handleSubmit={handleTopUpSubmit}
        setIsProcessing={setIsProcessing}
      />

      <TopupInfoConfirmation
        open={showSecondConfirmation}
        setOpen={handleSecondConfirmationClose}
      />

      {isProcessing && (
        <PaymentProcessingDialog
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
      )}
    </>
  );
};
export default Rewards;
