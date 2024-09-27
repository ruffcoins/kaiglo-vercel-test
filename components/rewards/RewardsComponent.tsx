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
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

const formatDate = (date: string) => {
  const utcMoment = moment(date, "YYYY-MM-DDTHH:mm:ss.SSSZ");
  const formattedDate = utcMoment.format("DD-MMM-YYYY");
  return formattedDate;
};

const RewardsComponent = () => {
  const router = useRouter();
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
        <div className="lg:relative fixed top-0 bg-white w-full flex lg:space-x-2 items-center lg:justify-start justify-between lg:h-auto h-[60px] px-5 lg:drop-shadow-none drop-shadow lg:px-0 z-10">
          <ChevronLeftIcon
            className="w-6 h-6 lg:hidden cursor-pointer"
            onClick={() => router.back()}
          />
          <h1 className="text-xl font-medium lg:text-start text-center">
            Kaiglo Rewards
          </h1>
          <div className="w-6 h-6"></div> {/* Placeholder to center the h1 */}
        </div>
        <div className="space-y-10 px-4 lg:px-0">
          <div className="relative h-[168px] lg:w-[376px] w-full rounded-2xl overflow-hidden mr-4 mt-20 lg:mt-0">
            <Image
              src={WalletBackground}
              width={100}
              height={100}
              alt="wallet background image"
              className="object-cover w-full h-full"
            />
            <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-between p-5">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  {fetchingWallet || !wallet ? (
                    <div className="w-40 h-8 mb-2 bg-gray-200 animate-pulse"></div>
                  ) : (
                    <p className="text-2xl font-bold">
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
            <p className="text-sm font-medium">Rewards</p>

            {status === "loading" ? (
              <div className="w-full h-16 bg-gray-200 animate-pulse"></div>
            ) : (
              <div className="lg:h-[calc(100vh-32rem)] h-[calc(100vh-25rem)] overflow-y-auto">
                {walletHistory?.map((history) => (
                  <div
                    key={history.id}
                    className="flex items-center justify-between p-2 mb-3 border rounded-lg"
                  >
                    <div className="flex items-start justify-start gap-x-2">
                      <Image
                        src={history.tranType === "Credit" ? Credit : Debit}
                        alt={`${history.tranType}-wallet-${history.transactionId}`}
                        width={100}
                        height={100}
                        className="w-6 h-6"
                      />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          {history.description}
                        </p>
                        <p className="text-xs uppercase text-kaiglo_grey-placeholder">
                          {formatDate(history.createDate)}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm font-medium text-right">
                      ₦{parseFloat(history.amount).toLocaleString()}
                    </p>
                  </div>
                ))}
                {isFetchingNextPage && (
                  <div className="flex items-center justify-center h-40">
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
export default RewardsComponent;
