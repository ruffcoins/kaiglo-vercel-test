"use client";

import Image from "next/image";
import Wishlist from "@/public/images/empty-heart.svg";
import Link from "next/link";
import { useFetchUserProfile } from "@/hooks/queries/userProfile";

const WishlistButton = () => {
  const { user } = useFetchUserProfile();
  return (
    <Link
      href="/app/wishlist"
      className="relative w-12 h-12 p-3 rounded-full cursor-pointer bg-kaiglo_grey-100"
    >
      <Image src={Wishlist} alt="wishlist icon" className="w-6 h-6" />
      <span className="absolute -top-1 -right-1 font-medium rounded-full border border-kaiglo_grey-500 w-5 h-5 flex justify-center items-center text-[10px] bg-white">
        {user?.wishListItems.length || 0}
      </span>
    </Link>
  );
};

export default WishlistButton;
