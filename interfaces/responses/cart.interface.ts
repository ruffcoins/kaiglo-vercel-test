import { CartItem } from "./user.interface";

export interface UpdateCartItemResponse {
  response: CartItem;
  message: string;
}

export interface ShippingCost {
  name: string;
  price: string;
  paidOnDelivery: boolean;
}

export interface GetShippingCostResponse {
  response: ShippingCost;
  message: string;
}
