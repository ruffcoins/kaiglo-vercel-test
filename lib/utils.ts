import { CartItem } from "@/interfaces/responses/user.interface";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ICacheCart } from "./cookieUtils";
import {
  IProduct,
  ProductColor,
  ProductPriceDetail,
} from "@/interfaces/product.interface";
import { CheckoutOrderItem } from "@/interfaces/checkout.interface";

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

// Define a function to transform a single ICacheCart item to CheckoutOrderItem
export const transformCartItemToOrderItem = (
  cartItem: ICacheCart,
  address: string,
  buyer: string,
  productPriceDetail: ProductPriceDetail,
  state: string,
  storeId: string,
  storeName: string,
  userId: string,
  gender: string = "",
  freeShipping: boolean,
  sales: boolean,
  orderStatus: string = "PENDING",
  url: string,
): CheckoutOrderItem => {
  return {
    orderLines: [
      {
        address,
        buyer,
        gender,
        orderItem: {
          color: cartItem.color,
          freeShipping,
          price: cartItem.price,
          productId: cartItem.productId,
          productName: cartItem.productName,
          quantity: cartItem.quantity,
          sales,
          size: cartItem.size,
          url: url,
        },
        orderStatus,
        productPriceDetail: {
          id: productPriceDetail.id,
          quantity: productPriceDetail.quantity,
          newPrice: productPriceDetail?.newPrice,
          price: productPriceDetail.price,
          discount: productPriceDetail.discount,
          size: productPriceDetail?.size || undefined,
          ramSize: productPriceDetail?.ramSize || undefined,
          storage: productPriceDetail?.storage || undefined,
          sku: productPriceDetail.sku,
        },
        state,
        storeId,
        storeName,
        userId,
      },
    ],
    storeId,
    storeName,
  };
};

export const getSelectedProductPriceDetail = (
  colors: ProductColor[],
  selectedColor: string,
  productUrl: string,
  selectedSize?: string,
  selectedRamSize?: string,
  selectedStorage?: string,
) => {
  let priceDetail: ProductPriceDetail | undefined;

  const selectedColorData = colors.find((c) => c.color.color === selectedColor);

  if (!selectedColorData) {
    console.warn("No matching color found for:", selectedColor);
    return undefined;
  }

  priceDetail = selectedColorData?.productPriceDetails.find(
    (d) =>
      (d.size ?? undefined) === (selectedSize ?? undefined) &&
      (d.ramSize ?? undefined) === (selectedRamSize ?? undefined) &&
      (d.storage ?? undefined) === (selectedStorage ?? undefined),
  );

  if (!priceDetail) {
    console.warn("No matching price detail found for:", {
      selectedSize,
      selectedRamSize,
      selectedStorage,
    });
  }

  return {
    priceDetail: priceDetail || undefined,
    url: productUrl,
  };
};

export const capitalizeFirstLetterOfEachWord = (str: string = "") => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
};

export const sortOptions = [
  { value: "popular", label: "Popular" },
  { value: "recent", label: "Newest" },
  { value: "l2h", label: "Price: Low to High" },
  { value: "h2l", label: "Price: High to Low" },
];

// const getCategoryImage = (categories: Category[], category: string) => {
//   const categoryImage = categories.find(
//     (cat) => cat.name.toLowerCase() === category.toLowerCase(),
//   );
//   return categoryImage?.image;
// };
