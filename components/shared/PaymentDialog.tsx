"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SetStateAction, useState } from "react";
import PayOnDelivery from "@/public/images/pay-on-delivery.svg";
import PayFromWallet from "@/public/images/pay-from-wallet.svg";
import PayFromCard from "@/public/images/pay-from-card.svg";
import Image from "next/image";

const PaymentDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [selectedMethod, setSelectedMethod] = useState("cards");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[552px]">
        <DialogHeader>
          <DialogTitle>Select Payment Method</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div
            className={`flex space-x-4 ${selectedMethod === "cards" ? "selected" : ""}`}
            onClick={() => setSelectedMethod("cards")}
          >
            <input type="radio" checked={selectedMethod === "cards"} readOnly />
            <div className="rounded-xl p-4 border flex items-center justify-between w-full">
              <div className="flex space-y-1 flex-col font-medium h-fit">
                <div className="text-sm">Pay with Cards, Transfer or USSD</div>
                <div className="text-[10px] text-kaiglo_grey-placeholder">
                  Pay online with paystack secure payment
                </div>
              </div>
              <Image
                src={PayFromCard}
                alt="Pay with card"
                width={500}
                height={200}
                className="w-[148px]"
              />
            </div>
          </div>

          <div
            className={`flex space-x-4 ${selectedMethod === "balance" ? "selected" : ""}`}
            onClick={() => setSelectedMethod("balance")}
          >
            <input
              type="radio"
              checked={selectedMethod === "balance"}
              readOnly
            />
            <div className="rounded-xl p-4 border flex justify-between w-full">
              <div className="flex space-y-1 flex-col font-medium">
                <div className="text-sm">Balance ₦35,000</div>
                <div className="text-[10px] text-kaiglo_grey-placeholder">
                  Pay with Shopping Balance
                </div>
              </div>
              <Image
                src={PayFromWallet}
                alt="Pay with wallet"
                width={500}
                height={200}
                className="w-[148px]"
              />
            </div>
          </div>

          <div
            className={`flex space-x-4 ${selectedMethod === "pod" ? "selected" : ""}`}
            onClick={() => setSelectedMethod("pod")}
          >
            <input type="radio" checked={selectedMethod === "pod"} readOnly />
            <div className="rounded-xl p-4 border flex justify-between w-full">
              <div className="flex space-y-1 flex-col font-medium">
                <div className="text-sm">Pay with cash upon delivery</div>
                <div className="text-[10px] text-kaiglo_grey-placeholder">
                  Pay with cash, Transfer, POS
                </div>
              </div>
              <Image
                src={PayOnDelivery}
                alt="Pay on delivery"
                width={500}
                height={200}
                className="w-[148px]"
              />
            </div>
          </div>
        </div>

        <Button
          variant="primary"
          className="rounded-full flex-1 min-h-12 font-medium"
          onClick={() => setOpen(false)}
        >
          PAY
        </Button>
      </DialogContent>
    </Dialog>
  );
};
export default PaymentDialog;
