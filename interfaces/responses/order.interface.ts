import { IOrder } from "../orders/order.interface";

export interface OrderResponse {
  response: IOrder;
  message: string;
}

export interface IOrderTimeLineResponse {
  response: IOrderTimeLine;
  message: string;
}

interface IOrderTimeLine {
  id: string;
  orderId: string;
  orderNumber: string;
  orderDate: string;
  timeLines: TimeLine[];
}

export interface TimeLine {
  time: string;
  description: string;
  status: string;
}
