import { IAddToCartDTO } from "@/hooks/mutation/cart/addItemToCart";
import Cookies from "js-cookie";

const CART_COOKIE_NAME = "tempCart";

export type ICacheCart = {
  id?: string;
  productName: string;
  maxQuantity: string;
} & IAddToCartDTO;

export const getCartFromCookies = (): ICacheCart[] => {
  const cart = Cookies.get(CART_COOKIE_NAME);
  return cart ? JSON.parse(cart) : ([] as ICacheCart[]);
};

export const saveCartToCookies = (cart: ICacheCart[]): void => {
  Cookies.set(CART_COOKIE_NAME, JSON.stringify(cart));
};

export const clearCartCookies = (): void => {
  Cookies.remove(CART_COOKIE_NAME);
};

export const removeItemFromCartByIndex = (index: number): void => {
  const cart = getCartFromCookies();
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    saveCartToCookies(cart);
  }
};

export const updateItemQuantity = (
  index: number,
  quantity: number,
  maxQuantity: number,
): void => {
  if (quantity < maxQuantity) {
    const cart = getCartFromCookies();
    if (index >= 0 && index < cart.length) {
      cart[index].quantity = quantity.toString();
      saveCartToCookies(cart);
    }
  }
};
