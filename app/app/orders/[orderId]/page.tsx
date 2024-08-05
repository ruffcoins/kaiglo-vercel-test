import dynamic from "next/dynamic";

const OrderDetailsPage = ({ params }: { params: { orderId: string } }) => {
  const { orderId } = params;

  const OrderDetailsComponent = dynamic(
    () => import("@/components/order/OrderDetails"),
    {
      ssr: false,
    },
  );

  return <OrderDetailsComponent orderId={orderId} />;
};
export default OrderDetailsPage;
