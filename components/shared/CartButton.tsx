"use client";

import Image from "next/image";
import Cart from "@/public/images/shopping-cart.svg";
import Link from "next/link";
import { useCartContext } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const CartButton = () => {
  const { subTotal, cart, handleMergeCarts } = useCartContext();

  useEffect(() => {
    handleMergeCarts();
  }, [handleMergeCarts]);

  return (
    <Link href="/cart">
      <div className="relative flex justify-center p-2.5 items-center h-12 md:p-3 space-x-2 bg-black rounded-md lg:rounded-full cursor-pointer">
        <Image src={Cart} alt="shopping cart icon" />
        <span
          className={cn(
            subTotal === 0 ? "text-kaiglo_grey-500" : "text-white",
            "text-sm hidden lg:block",
          )}
        >
          ₦{subTotal.toLocaleString()}
        </span>
        <span className="absolute -top-1 -right-1 font-medium rounded-full border border-kaiglo_grey-500 w-5 h-5 text-[10px] bg-white text-black flex justify-center items-center">
          {cart.length}
        </span>
      </div>
    </Link>
  );
};

export default CartButton;
