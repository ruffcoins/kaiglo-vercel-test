"use client";

import OrderTracking from "@/components/order/OrderTracking";
import { useOrderDetails } from "@/hooks/queries/order";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const TrackOrder = ({ params }: { params: { orderId: string } }) => {
  const { orderId } = params;
  const router = useRouter();
  const { order, fetchingOrderDetails } = useOrderDetails(orderId);

  return (
    <div className="lg:space-y-8">
      <div className="lg:relative fixed top-0 bg-white w-full flex lg:space-x-2 items-center lg:justify-start justify-between lg:h-auto h-[60px] px-5 lg:drop-shadow-none drop-shadow lg:px-0">
        <ChevronLeftIcon
          className="w-6 h-6 cursor-pointer"
          onClick={() => router.back()}
        />
        <h1 className="text-xl font-medium lg:text-start text-center">
          Order tracking
        </h1>
        <div className="w-6 h-6"></div> {/* Placeholder to center the h1 */}
      </div>

      <OrderTracking orderNumber={order?.orderNumber as string} />
    </div>
  );
};
export default TrackOrder;
