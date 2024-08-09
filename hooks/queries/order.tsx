import {
  IOrderTimeLineResponse,
  OrderResponse,
  UserOrderResponse,
} from "@/interfaces/responses/order.interface";
import { getRequest, getRequestParams } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";

export const useOrderDetails = (orderId: string) => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["order-details", orderId],
      () =>
        getRequest<OrderResponse>({
          url: `order/${orderId}`,
        }),
      {
        enabled: !!orderId,
        staleTime: 1000 * 60 * 60,
      },
    );

  return {
    order: data?.response,
    fetchingOrderDetails: isFetching,
    refetchOrderDetails: refetch,
    orderDetailsSuccess: isSuccess,
    orderDetailsPaused: isPaused,
    orderDetailsError: isError,
    removeOrderDetails: remove,
  };
};

export const useOrderTimeline = (orderNumber: string) => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["order-timeline", orderNumber],
      () =>
        getRequestParams<{ orderNumber: string }, IOrderTimeLineResponse>({
          url: `/order-timelines`,
          params: { orderNumber },
        }),
      {
        enabled: !!orderNumber,
        staleTime: 1000 * 60 * 30,
        cacheTime: 1000 * 60 * 60,
      },
    );

  return {
    orderTimeline: data?.response,
    fetchingOrderTimeline: isFetching,
    refetchOrderTimeline: refetch,
    orderTimelineSuccess: isSuccess,
    orderTimelinePaused: isPaused,
    orderTimelineError: isError,
    removeOrderTimeline: remove,
  };
};

export const userOrders = () => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["user-orders"],
      () => getRequest<UserOrderResponse>({ url: "/order/user-order" }),
      {
        staleTime: 1000 * 60 * 30,
        cacheTime: 1000 * 60 * 60,
      },
    );

  return {
    orders: data?.response,
    fetchingOrders: isFetching,
    refetchOrders: refetch,
    ordersSuccess: isSuccess,
    ordersPaused: isPaused,
    ordersError: isError,
    removeOrders: remove,
  };
};
