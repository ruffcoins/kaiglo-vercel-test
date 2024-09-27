"use client";

import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import EmptyHeart from "@/public/images/empty-heart.svg";
import FilledHeart from "@/public/images/filled-heart.svg";
import { cn } from "@/lib/utils";
import useAddToWishlist from "@/hooks/mutation/wishlist/addToWishlist";
import useRemoveFromWishlist from "@/hooks/mutation/wishlist/removeFromWishlist";

const AddToWishlistButton = ({
  classNames,
  isOnMyWishList,
  id,
  name,
  price,
  imageUrl,
}: {
  classNames?: string;
  isOnMyWishList: boolean;
  setIsOnMyWishList: Dispatch<SetStateAction<boolean>>;
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}) => {
  const { addProductToWishlist } = useAddToWishlist();
  const { removeItemFromWishlist } = useRemoveFromWishlist();

  const handleAddToWishlist = () => {
    if (isOnMyWishList) {
      removeItemFromWishlist(id);
    } else {
      addProductToWishlist({
        productId: id,
        name,
        price: price,
        productImage: imageUrl,
      });
    }
  };

  return (
    <div
      className={cn(
        "w-10 h-10 flex justify-center items-center rounded-full bg-white/80 border-[0.5px] border-white cursor-pointer",
        classNames,
      )}
      onClick={handleAddToWishlist}
    >
      <Image
        src={isOnMyWishList ? FilledHeart : EmptyHeart}
        alt="empty heart image"
        className="relative w-6 h-6 left-50"
        width={24}
        height={24}
      />
    </div>
  );
};

export default AddToWishlistButton;
