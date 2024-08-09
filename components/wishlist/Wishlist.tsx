"use client";

import { ChevronLeftIcon } from "@radix-ui/react-icons";
import WishlistEmptyState from "../emptyStates/WishlistEmptyState";
import { useRouter } from "next/navigation";
import { useFetchUserProfile } from "@/hooks/queries/userProfile";
import WishlistProductCard from "./WishlistProductCard";

const Wishlist = () => {
  const router = useRouter();
  const { user } = useFetchUserProfile();

  return (
    <div className="lg:space-y-4">
      <div className="lg:relative fixed top-0 bg-white w-full flex lg:space-x-2 items-center lg:justify-start justify-between lg:h-auto h-[60px] px-5 lg:drop-shadow-none drop-shadow lg:px-0 z-10">
        <ChevronLeftIcon
          className="w-6 h-6 lg:hidden cursor-pointer"
          onClick={() => router.back()}
        />
        <h1 className="text-xl font-medium lg:text-start text-center">
          My Wishlist
        </h1>
        <div className="w-6 h-6"></div> {/* Placeholder to center the h1 */}
      </div>

      <div className="h-[calc(100vh-18rem)] overflow-y-auto">
        {user?.wishListItems.length > 0 ? (
          <div className="grid md:grid-cols-4 grid-cols-2 gap-4 pt-20 lg:pt-0 px-4 lg:px-0">
            {user?.wishListItems.map((product, index) => (
              <WishlistProductCard key={index} product={product} />
            ))}
          </div>
        ) : (
          <WishlistEmptyState />
        )}
      </div>
    </div>
  );
};
export default Wishlist;
