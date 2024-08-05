"use client";

import { WishListItem } from "@/interfaces/responses/user.interface";
import { useState, useEffect } from "react";

const useIsProductInWishlist = (id: string, wishListItems: WishListItem[]) => {
  const [isOnMyWishList, setIsOnMyWishList] = useState(false);

  useEffect(() => {
    const productIsInWishList = wishListItems?.some(
      (item) => item.productId === id,
    );
    setIsOnMyWishList(productIsInWishList);
  }, [id, wishListItems]);

  return { isOnMyWishList, setIsOnMyWishList };
};

export default useIsProductInWishlist;
