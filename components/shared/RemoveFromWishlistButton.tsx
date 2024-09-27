"use client";
import Image from "next/image";
import Trash from "@/public/images/trash.svg";
import { useState } from "react";
import RemoveFromWishlistDialog from "../wishlist/RemoveFromWishlistDialog";

const RemoveFromWishlistButton = ({ id }: { id: string }) => {
  const [removeFromWishlist, setRemoveFromWishlist] = useState(false);
  const handleRemoveFromWishlist = () => {
    setRemoveFromWishlist(true);
  };

  return (
    <>
      <div
        className="relative w-10 h-10 p-2 rounded-full cursor-pointer bg-kaiglo_critical-100"
        onClick={handleRemoveFromWishlist}
      >
        <Image
          src={Trash}
          alt="wishlist icon"
          className="w-6 h-6"
          width={24}
          height={24}
        />
      </div>

      {removeFromWishlist && (
        <RemoveFromWishlistDialog
          open={removeFromWishlist}
          setOpen={setRemoveFromWishlist}
          id={id}
        />
      )}
    </>
  );
};

export default RemoveFromWishlistButton;
