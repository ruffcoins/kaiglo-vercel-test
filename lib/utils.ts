import { CartItem } from "@/interfaces/responses/user.interface";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ICacheCart } from "./cookieUtils";
import { IProduct } from "@/interfaces/product.interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncate = (str: string, maxLength: number) => {
  if (str?.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  }
  return str;
};

export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const createSlug = (name: string) => {
  const slug = encodeURIComponent(
    name?.toLowerCase().replace(/ /g, "-").replace(/%/g, ""),
  );
  return slug;
};

export const getPriceRange = (prices: number[]) => {
  if (
    !prices.length ||
    prices.some((price) => typeof price !== "number" || isNaN(price))
  ) {
    return "Loading...";
  }

  const min = Math.min(...prices);
  const max = Math.max(...prices);

  if (min === max) {
    return `₦${min.toLocaleString()}`;
  } else {
    return `₦${min.toLocaleString()} - ₦${max.toLocaleString()}`;
  }
};

export const convertCartItemToICacheCart = (
  cartItem: CartItem,
  userId: string,
): ICacheCart => {
  return {
    id: cartItem.id,
    color: cartItem.color,
    platform: cartItem.platform,
    price: cartItem.price,
    productId: cartItem.product.id,
    productUrl: cartItem.productUrl,
    quantity: cartItem.quantity.toString(),
    ramSize: cartItem.ramSize || undefined,
    size: cartItem.size || undefined,
    storage: cartItem.storage || undefined,
    userId: userId,
    productName: cartItem.product.name,
    maxQuantity: getMaxQuantity(
      cartItem.product,
      cartItem.color,
      cartItem.size,
      cartItem.ramSize,
      cartItem.storage,
    ),
  };
};

const getMaxQuantity = (
  product: IProduct,
  color: string,
  size?: string,
  ramSize?: string,
  storage?: string,
): string => {
  const productColor = product.productColors.find(
    (pc) => pc.color.color === color,
  );
  if (!productColor) return "0";

  const priceDetail = productColor.productPriceDetails.find((pd) => {
    const sizeMatch = size ? pd.size === size : true;
    const ramSizeMatch = ramSize ? pd.ramSize === ramSize : true;
    const storageMatch = storage ? pd.storage === storage : true;
    return sizeMatch && ramSizeMatch && storageMatch;
  });

  return priceDetail ? priceDetail.quantity : "0";
};

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then((err) => {
    console.error("Could not copy text: ", err);
  });
};
