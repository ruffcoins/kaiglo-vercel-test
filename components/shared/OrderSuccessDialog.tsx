"use client";

import { useUserWallet } from "@/hooks/queries/wallet/getUserWallet";
import { useWalletHistory } from "@/hooks/queries/wallet/walletHistory";
import { SetStateAction, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NotFound from "@/public/images/not-found.svg";
import ModifiedButton from "./ModifiedButton";
import Link from "next/link";

export const OrderSuccessDialog = ({
  orderCreated,
  setOrderCreated,
}: {
  orderCreated: boolean;
  setOrderCreated: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { refetchWalletHistory } = useWalletHistory();
  const { refetchWallet } = useUserWallet();
  useEffect(() => {
    setTimeout(() => {
      setOrderCreated(false);
      refetchWalletHistory();
      refetchWallet();
      router.push("/app/orders");
    }, 10000);
  }, []);

  return (
    <Dialog open={orderCreated}>
      <DialogContent className="lg:w-[500px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-8 my-4">
          <Image
            src={NotFound}
            alt="Not Found"
            width={128}
            height={128}
            className="w-32 h-32"
          />
          <div className="text-center">
            <p className="font-bold">Thank you for shopping on Kaiglo!</p>
            <p>Your order would be delivered to you between 2-7 days.</p>
          </div>
          <div className="flex lg:flex-row flex-col w-full justify-center items-center lg:space-x-8 space-y-4 lg:space-y-0">
            <Link href="/app/orders" className="w-full lg:w-40">
              <ModifiedButton
                type="button"
                value="My Orders"
                variant="primary"
                className="rounded-full lg:px-8 h-12"
              />
            </Link>
            <Link href="/" className="w-full lg:w-40">
              <ModifiedButton
                type="button"
                value="Continue Shopping"
                variant="secondary"
                className="rounded-full px-8 h-12"
              />
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
