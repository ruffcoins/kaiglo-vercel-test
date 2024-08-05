"use client";

import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useOrderDetails } from "@/hooks/queries/order";
import { OrderStatus } from "@/enums/orderStatus.enum";
import moment from "moment-timezone";
import Placeholder from "@/public/images/product-image-placeholder.png";
import ModifiedBadge from "../shared/ModifiedBadge";
import ModifiedButton from "../shared/ModifiedButton";
import Phone from "@/public/images/phone.svg";
import Loader from "../shared/Loader";
import { useState } from "react";
import OrderTrackingBottomSheet from "./OrderTrackingBottomSheet";
import { cn } from "@/lib/utils";
import CancelOrderDialog from "./dialogs/CancelOrder";
import RequestReturn from "./dialogs/RequestReturn";
import ReviewOrder from "./dialogs/ReviewOrder";

const formatDate = (date: string) => {
  const utcMoment = moment(date, "YYYY-MM-DDTHH:mm:ss.SSSZ");
  const formattedDate = utcMoment.format("DD-MMM-YYYY, hh:mmA");
  return formattedDate;
};

const OrderDetails = ({ orderId }: { orderId: string }) => {
  const router = useRouter();
  const [trackOrder, setTrackOrder] = useState(false);
  const [cancelOrder, setCancelOrder] = useState(false);
  const [returnOrder, setReturnOrder] = useState(false);
  const [reviewOrder, setReviewOrder] = useState(false);

  const { order, fetchingOrderDetails } = useOrderDetails(orderId);

  if (fetchingOrderDetails)
    return (
      <p className="flex h-screen justify-center items-center">
        <Loader />
      </p>
    );

  return (
    <>
      <div className="lg:space-y-4">
        <div className="lg:relative fixed top-0 bg-white w-full flex lg:space-x-2 items-center lg:justify-start justify-between lg:h-auto h-[60px] px-5 lg:drop-shadow-none drop-shadow lg:px-0">
          <ChevronLeftIcon className="w-6 h-6" onClick={() => router.back()} />
          <h1 className="text-xl font-medium lg:text-start text-center">
            Order details
          </h1>
          <div className="w-6 h-6"></div> {/* Placeholder to center the h1 */}
        </div>

        <div className="grid grid-cols-1 gap-4 p-5 lg:p-0 mt-14 lg:mt-0">
          <div className="space-y-4 lg:space-y-0 lg:space-x-8 flex flex-col justify-between lg:flex-row">
            <div className="space-y-4 lg:space-y-0 lg:space-x-8 flex flex-col lg:items-center lg:flex-row">
              <p className="text-kaiglo_grey-base">
                Order ID:{" "}
                <span className="font-medium text-black">
                  {order?.orderNumber}
                </span>
              </p>
              <p className="text-kaiglo_grey-base">
                Order Date:{" "}
                <span className="font-medium text-black">
                  {formatDate(order?.createdDate as string)}
                </span>
              </p>
            </div>
          </div>

          {/* Order Item */}
          <div className="border rounded-lg p-3 lg:p-4 space-y-4">
            <p className="text-kaiglo_grey-base capitalize">
              Seller:{" "}
              <span className="font-medium text-black">
                {order?.storeName.toLowerCase()}
              </span>
            </p>

            <div className="grid grid-cols-12 lg:flex-row flex-col gap-6 lg:gap-0">
              <div className="lg:col-span-9 col-span-12 flex lg:flex-1 gap-4 cursor-pointer">
                <Image
                  src={order?.orderItem.url || Placeholder}
                  alt={order?.orderItem.productName || "Product image"}
                  width={112}
                  height={112}
                  className="w-28 h-28 object-cover rounded-lg"
                />
                <div className="text-sm gap-y-1 flex flex-col justify-center">
                  <h2 className="text-sm capitalize">
                    {order?.orderItem.productName.toLowerCase()}
                  </h2>
                  <p className="font-bold text-sm">
                    ₦{order?.orderItem.price.toLocaleString()}
                  </p>
                  <p className="text-black">
                    Colour: <span>{order?.orderItem.color}</span>
                  </p>
                  <p className="flex space-x-4">
                    <span>Size: {order?.orderItem.size}</span>
                    <span>Qty: {order?.orderItem.quantity}</span>
                  </p>

                  <ModifiedBadge status={order?.orderStatus as OrderStatus} />
                </div>
              </div>

              <div className="space-y-2 h-full lg:col-span-3 col-span-12">
                <ModifiedButton
                  type="button"
                  variant="critical"
                  value="Cancel Order"
                  className="rounded-full uppercase bg-transparent text-kaiglo_critical-base border border-kaiglo_critical-base font-medium"
                  onClick={() => setCancelOrder(true)}
                />
                <ModifiedButton
                  type="button"
                  variant="outline"
                  value="Request Return"
                  className="rounded-full uppercase bg-transparent text-black border border-black font-medium"
                  onClick={() => setReturnOrder(true)}
                />
                <ModifiedButton
                  type="button"
                  variant="info"
                  value="Track Order"
                  className="bg-transparent uppercase rounded-full font-medium"
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setTrackOrder(true);
                    } else {
                      router.push(`/app/orders/${order?.id}/track`);
                    }
                  }}
                />
                <ModifiedButton
                  type="button"
                  variant="attention"
                  value="Review and Earn"
                  className="bg-transparent uppercase rounded-full font-medium"
                  onClick={() => setReviewOrder(true)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 lg:gap-6">
            {/* Shipping Information */}
            <div className="lg:order-last lg:col-span-6 col-span-12 border rounded-lg p-3 space-y-4 lg:space-y-8">
              <p className="text-[18px] font-medium">Shipping Information</p>

              <div className="flex lg:flex-row flex-col lg:justify-between space-y-6">
                <div className="space-y-4">
                  <p className="grid grid-cols-6 text-sm">
                    <span className="col-span-2">Name</span>
                    <span className="col-span-4 font-medium">
                      {order?.buyer}
                    </span>
                  </p>
                  <p className="grid grid-cols-6 text-sm">
                    <span className="col-span-2 ">Address</span>
                    <span className="col-span-4 font-medium">
                      {order?.address}
                    </span>
                  </p>
                </div>
              </div>

              <CallForHelp />
            </div>

            {/* Cost Summary */}
            <div className="lg:border lg:h-full lg:rounded-lg lg:col-span-6 col-span-12 space-y-2 text-sm lg:mt-0 lg:mb-0 mt-8 mb-4 lg:p-4">
              <p className="text-[18px] font-medium hidden lg:block lg:mb-8">
                Summary
              </p>
              <p className="grid grid-cols-12">
                <span className="lg:col-span-3 col-span-9 text-kaiglo_grey-base">
                  Items Total
                </span>
                <span className="col-span-3 font-medium text-end lg:text-start">
                  ₦{order?.orderItem.price.toLocaleString()}
                </span>
              </p>
              <p className="grid grid-cols-12">
                <span className="lg:col-span-3 col-span-9 text-kaiglo_grey-base">
                  Shipping Fees
                </span>
                <span className="col-span-3 font-medium text-end lg:text-start">
                  ₦{order?.shippingCost.toLocaleString()}
                </span>
              </p>
              <p className="grid grid-cols-12">
                <span className="lg:col-span-3 col-span-9 text-kaiglo_grey-base">
                  Coupon
                </span>
                <span className="col-span-3 font-medium text-end lg:text-start text-kaiglo_brand-base">
                  {order?.appliedCoupon === null
                    ? "None"
                    : order?.appliedCoupon.toLocaleString()}
                </span>
              </p>
              <p className="grid grid-cols-12">
                <span className="lg:col-span-3 col-span-9 text-kaiglo_grey-base">
                  Tax
                </span>
                <span className="col-span-3 font-medium text-end lg:text-start">
                  ₦{order?.orderItem.shippingCost?.toLocaleString() || 0.0}
                </span>
              </p>

              <hr className="lg:hidden" />

              <p className="grid grid-cols-12">
                <span className="lg:col-span-3 col-span-9 text-kaiglo_grey-base">
                  Total Amount:
                </span>
                <span className="col-span-3 font-medium text-end lg:text-start">
                  ₦
                  {(
                    (order?.orderItem?.price || 0.0) +
                    (parseFloat(order?.shippingCost as string) || 0.0) +
                    ((order?.orderItem.shippingCost as number) || 0.0)
                  ).toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {trackOrder && (
        <OrderTrackingBottomSheet
          open={trackOrder}
          setOpen={setTrackOrder}
          orderNumber={order?.orderNumber as string}
        />
      )}
      {cancelOrder && (
        <CancelOrderDialog
          open={cancelOrder}
          setOpen={setCancelOrder}
          orderId={order?.id as string}
        />
      )}
      {returnOrder && (
        <RequestReturn
          open={returnOrder}
          setOpen={setReturnOrder}
          orderId={order?.id as string}
        />
      )}
      {reviewOrder && (
        <ReviewOrder
          open={reviewOrder}
          setOpen={setReviewOrder}
          orderId={order?.id as string}
        />
      )}
    </>
  );
};
export default OrderDetails;

const CallForHelp = ({
  textClassNames,
  classNames,
}: {
  textClassNames?: string;
  classNames?: string;
}) => {
  return (
    <div
      className={cn(
        classNames,
        "items-center space-x-2 flex bg-kaiglo_grey-100 py-2 px-4 w-fit rounded-lg",
      )}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-white">
        <Image src={Phone} alt="phone icon" className="" />
      </div>

      <div className="flex-col">
        <p className="text-sm font-bold">Call for help</p>
        <p className={cn(textClassNames, "text-sm text-kaiglo_info-base")}>
          +234 915 449 1603
        </p>
      </div>
    </div>
  );
};
