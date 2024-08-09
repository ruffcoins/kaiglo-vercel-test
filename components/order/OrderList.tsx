"use client";

import { userOrders } from "@/hooks/queries/order";
import OrderEmptyState from "../emptyStates/OrderEmptyState";
import OrderSummaryCard from "./OrderSummaryCard";
import useProductRowLength from "@/hooks/useProductRowLength";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OrderList = () => {
  const { length } = useProductRowLength();
  const { orders, fetchingOrders } = userOrders();

  if (fetchingOrders) {
    return (
      <div className="space-x-4 flex">
        {[1, 2].map((_, index) => (
          <div
            key={index}
            className="flex h-full w-full bg-white border rounded-lg p-2 space-x-4 animate-pulse"
          >
            <div className="w-60 h-40">
              <Skeleton height="100%" borderRadius={8} />
            </div>
            <div className="space-y-2 w-full flex flex-col justify-center">
              <Skeleton height={32} />
              <Skeleton height={32} />
              <Skeleton height={32} />
              <Skeleton width={160} height={32} borderRadius={8} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-6 p-4 lg:p-0 h-[calc(100vh-18rem)] overflow-y-auto">
      {orders?.length === 0 ? (
        <OrderEmptyState />
      ) : (
        orders?.map((order, index) => (
          <div key={index}>
            <OrderSummaryCard
              key={order.id}
              id={order.id}
              image={order.orderItem.url}
              title={order.orderItem.productName}
              orderNumber={order.orderNumber}
              price={order.orderItem.totalAmount}
              status={order.orderStatus}
            />
            <hr className="border lg:hidden" />
          </div>
        ))
      )}
    </div>
  );
};
export default OrderList;
