"use client";

import { useFundWallet } from "@/hooks/mutation/wallet/fundWallet";
import { usePaystackPayment } from "react-paystack";

const Pay = ({
  email,
  amount,
  referrer,
  classNames,
  userId,
  setOpen,
  setIsProcessing,
}: {
  email: string;
  amount: number;
  referrer: string;
  classNames: string;
  userId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const publicKey = "pk_test_10acbeb34741c06899a6002b99eddf9eaf595b17";
  const channels = ["card", "bank", "ussd"];
  const { fundWallet } = useFundWallet();

  const config = {
    amount,
    channels,
    email,
    currency: "NGN",
    metadata: {
      referrer,
      custom_fields: [],
    },
    mode: "popup",
    publicKey,
    split: {},
    disabled: !amount || amount <= 0,
  };

  const onSuccess = (reference: any) => {
    fundWallet({
      amount: amount / 100,
      description: "Fund Wallet",
      referenceCode: reference.reference,
      tranType: "",
      userId,
    });

    setIsProcessing(true);
  };

  const onClose = () => {
    console.log("closed");
  };

  const PaymentButton = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div>
        <button
          className={classNames}
          onClick={() => {
            initializePayment({ onSuccess, onClose });
            setOpen(false);
          }}
        >
          Pay
        </button>
      </div>
    );
  };

  return <PaymentButton />;
};

export default Pay;
