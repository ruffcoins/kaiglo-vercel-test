"use client";

import useCreateOrder from "@/hooks/mutation/order/createOrder";
import { useFundWallet } from "@/hooks/mutation/wallet/fundWallet";
import {
  CheckoutOrderItem,
  CheckoutPaymentDTO,
} from "@/interfaces/checkout.interface";
import { useEffect } from "react";
import { usePaystackPayment } from "react-paystack";

const Pay = ({
  email,
  amount,
  referrer,
  classNames,
  userId,
  setOpen,
  setIsProcessing,
  setBalance,
  action,
  transformedCartItems,
  checkoutAmount,
  shippingAmount,
  address,
  name,
  state,
  setOrderCreated,
  abandonedOrder,
}: {
  email: string;
  amount: number;
  referrer: string;
  classNames: string;
  userId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  setBalance: React.Dispatch<React.SetStateAction<string>> | undefined;
  setOrderCreated?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  action: string;
  transformedCartItems?: CheckoutOrderItem[];
  checkoutAmount?: string;
  shippingAmount?: string;
  address?: string;
  name?: string;
  state?: string;
  abandonedOrder?: () => void;
}) => {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string;
  const channels = ["card", "bank", "ussd"];
  const { fundWallet } = useFundWallet();
  const { createOrderAsync } = useCreateOrder();

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

  const userDetails = {
    address,
    buyer: name,
    state,
    email,
  };

  const onSuccess = (response: any) => {
    if (action === "topup") {
      setBalance?.("0");

      fundWallet({
        amount: amount / 100,
        description: "Fund Wallet",
        referenceCode: response.reference,
        tranType: "",
        userId,
      });

      setIsProcessing?.(true);
    } else {
      setIsProcessing?.(true);

      const checkoutPayload: CheckoutPaymentDTO = {
        checkoutPayLoad: {
          items: transformedCartItems as CheckoutOrderItem[],
          tax: "0",
          buyerEmail: userDetails.email,
          orderTotal: (amount / 100).toString(),
          subTotal: checkoutAmount as string,
          shipping: shippingAmount as string,
          platform: "WEB",
        },
        paymentOption: "PAYSTACK",
        paymentDetail: {
          message: "Approved",
          reference: response.reference,
          status: response.status,
          trans: response.trans,
          transaction: response.trans,
          trxref: response.trxref,
        },
      };

      createOrderAsync(checkoutPayload).then(() => setOrderCreated?.(true));
    }
  };

  const onClose = () => {
    if (abandonedOrder) abandonedOrder();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (abandonedOrder) {
        abandonedOrder();
      }
    }, 60000);

    return () => {
      clearTimeout(timeout);
    };
  }, [abandonedOrder]);

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
