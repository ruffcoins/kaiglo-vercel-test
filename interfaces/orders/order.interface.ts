import { ProductPriceDetail } from "../product.interface";

export interface IOrder {
  id: string;
  orderNumber: string;
  storeId: string;
  storeName: string;
  userId: string;
  orderStatus: string;
  orderRateStatus: boolean;
  buyer: string;
  address: string;
  email: string;
  orderItem: OrderItem;
  paymentOption: string;
  txnReference: string;
  platform: string;
  productPriceDetail: ProductPriceDetail;
  createdDate: string;
  updatedDate: string;
  appliedCoupon: string | null;
  shippingCost: string;
  productType: string;
  issue: null | any;
}

interface OrderItem {
  url: string;
  productId: string;
  productName: string;
  price: number;
  quantity: string;
  color: string;
  size: string;
  shippingCost: number | null;
  totalAmount: number;
  category: string;
  subCategory: string;
  secSubCategory: string;
}
