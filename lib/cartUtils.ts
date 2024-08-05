import { ICacheCart } from "./cookieUtils";

export const calculateSubTotal = (
  cart: ICacheCart[],
  checkedItems: Record<string, boolean> | null = null,
) => {
  let total = 0;
  cart.forEach((item, index) => {
    if (!checkedItems || checkedItems[`${item.productId}-${index}`]) {
      total += item.price * parseInt(item.quantity);
    }
  });
  return total;
};
