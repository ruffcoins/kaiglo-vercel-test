import { ProductPriceDetail } from "./product.interface";

export interface CheckoutOrderItem {
  orderLines: Array<{
    address: string;
    buyer: string;
    gender: string;
    orderItem: {
      color: string;
      freeShipping: boolean;
      price: number;
      productId: string;
      productName: string;
      quantity: string;
      sales: boolean;
      size?: string;
      url: string;
    };
    orderStatus: string;
    productPriceDetail: ProductPriceDetail;
    state: string;
    storeId: string;
    storeName: string;
    userId: string;
  }>;
  storeId: string;
  storeName: string;
}

export interface CheckoutPayLoad {
  items: CheckoutOrderItem[];
  tax: string;
  buyerEmail: string;
  orderTotal: string;
  subTotal: string;
  shipping: string;
  platform: string;
  debitId?: string;
}

interface PaymentDetail {
  message: string;
  reference: string;
  status: string;
  trans: string;
  transaction: string;
  trxref: string;
}

export interface CheckoutPaymentDTO {
  checkoutPayLoad: CheckoutPayLoad;
  paymentOption: string;
  paymentDetail?: PaymentDetail | {};
}
