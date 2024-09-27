import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Order Confirmation | Kaiglo Nigeria",
  description: "Thank you for your order on Kaiglo Nigeria.",
  robots: "noindex, nofollow",
};

const OrderConfirmation = dynamic(
  () => import("@/components/checkout/OrderConfirmation"),
  {
    ssr: false,
  },
);

const OrderConfirmationPage = () => {
  return <OrderConfirmation />;
};

export default OrderConfirmationPage;
