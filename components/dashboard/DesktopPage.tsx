"use client";

import Link from "next/link";
import Cart from "@/public/images/cart-inactive.svg";
import OrderBox from "@/public/images/inactive-order-box.svg";
import Wishlist from "@/public/images/inactive-heart.svg";
import Seller from "@/public/images/seller.svg";
import Refer from "@/public/images/refer.svg";
import Affiliate from "@/public/images/affiliate.svg";
import WalletBackground from "@/public/images/wallet-background.svg";
import Megaphone from "@/public/images/megaphone.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useFetchUserProfile } from "@/hooks/queries/userProfile";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import useTopUpDialogs from "@/hooks/useTopUpDialogs";
import Topup from "../rewards/Topup";
import TopupInfo from "../rewards/TopupInfo";
import TopupInfoConfirmation from "../rewards/TopupInfoConfirmation";
import { useCartContext } from "@/contexts/CartContext";

const DesktopPage = () => {
  const { user } = useFetchUserProfile();
  const { isLoggedIn } = useAuth();
  const { cart } = useCartContext();
  const {
    showFirstConfirmation,
    showTopUpDialog,
    setShowTopUpDialog,
    showSecondConfirmation,
    handleTopUpClick,
    handleFirstConfirmationClose,
    handleTopUpSubmit,
    handleSecondConfirmationClose,
  } = useTopUpDialogs();

  // useEffect(() => {
  //   if (!isLoggedIn && typeof window !== "undefined") {
  //     window.location.replace("/");
  //   }
  // }, [isLoggedIn]);

  return (
    <>
      <div className="hidden lg:block h-[calc(100vh-13rem)] overflow-y-auto space-y-9 pr-2">
        <p>
          From your account dashboard you can view your{" "}
          <span>
            <Link href="/app/orders" className="underline">
              recent orders
            </Link>
          </span>
          , manage your{" "}
          <span>
            <Link href="/app/addresses" className="underline">
              shipping and billing addresses
            </Link>
          </span>
          , and{" "}
          <span>
            <Link href="/app/settings" className="underline">
              edit your account details
            </Link>
          </span>
          .
        </p>

        <div className="flex space-x-9">
          <Link href="/cart">
            <div className="border-[2px] rounded-lg border-kaiglo_grey-100 relative px-14 py-4 space-y-2 flex flex-col justify-center items-center">
              <span className="flex justify-center bg-kaiglo_critical-base rounded-full text-white text-[10px] font-medium w-4 h-4 absolute top-2 right-2">
                {cart.length}
              </span>
              <Image
                src={Cart}
                alt="cart icon"
                className="w-14 h-14"
                width={100}
                height={100}
              />
              <p className="text-sm text-kaiglo_grey-base">My Cart</p>
            </div>
          </Link>
          <Link href="/app/orders">
            <div className="border-[2px] rounded-lg border-kaiglo_grey-100 relative px-14 py-4 space-y-2 flex flex-col justify-center items-center">
              <span className="flex justify-center bg-kaiglo_critical-base rounded-full text-white text-[10px] font-medium w-4 h-4 absolute top-2 right-2">
                4
              </span>
              <Image
                src={OrderBox}
                alt="cart icon"
                className="w-14 h-14"
                width={100}
                height={100}
              />
              <p className="text-sm text-kaiglo_grey-base">My Orders</p>
            </div>
          </Link>

          <Link href="/app/wishlist">
            <div className="border-[2px] rounded-lg border-kaiglo_grey-100 relative px-14 py-4 space-y-2 flex flex-col justify-center items-center">
              <span className="flex justify-center bg-kaiglo_critical-base rounded-full text-white text-[10px] font-medium w-4 h-4 absolute top-2 right-2">
                {user?.wishListItems.length || 0}
              </span>
              <Image
                src={Wishlist}
                alt="cart icon"
                className="w-14 h-14"
                width={100}
                height={100}
              />
              <p className="text-sm text-center text-kaiglo_grey-base">
                My Wishlist
              </p>
            </div>
          </Link>
        </div>

        <div className="flex space-x-16">
          <div className="space-y-2 flex flex-col items-center">
            <Image src={Seller} alt="cart icon" className="w-16 h-16" />
            <p className="text-xs text-kaiglo_grey-base">Sell on Kaiglo</p>
          </div>
          <div className="space-y-2 flex flex-col items-center">
            <Image src={Refer} alt="cart icon" className="w-16 h-16" />
            <p className="text-xs text-kaiglo_grey-base">Refer a Friend</p>
          </div>
          <div className="space-y-2 flex flex-col items-center">
            <Image src={Affiliate} alt="cart icon" className="w-16 h-16" />
            <p className="text-xs text-kaiglo_grey-base">Affiliate Partner</p>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-2 2xl:grid-cols-5">
          {/* Rewards Card */}
          <div className="2xl:col-span-2 relative min-h-[176px] rounded-2xl overflow-hidden mr-4">
            <Image
              src={WalletBackground}
              width={100}
              height={100}
              alt="wallet background image"
              className="w-full h-full object-cover"
            />
            <div className="flex flex-col justify-between absolute top-0 right-0 bottom-0 left-0 p-5">
              <div className="text-white">
                <p className="font-bold text-2xl">₦0.0</p>
                <p className="text-xs">Your Balance</p>
              </div>

              <div className="flex w-full space-x-4">
                <Button
                  variant="outline"
                  className="bg-transparent rounded-full border-[1px] border-white text-white font-medium px-4 xl:px-8 py-2"
                  onClick={handleTopUpClick}
                >
                  Top up
                </Button>
                <Link href={"/app/rewards"}>
                  <Button
                    variant="outline"
                    className="bg-transparent rounded-full border-[1px] border-white text-white font-medium px-4 xl:px-8 py-2"
                  >
                    Balance History
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Refer Card */}
          <div className="2xl:col-span-2 flex bg-[#1258E2] rounded-2xl p-5">
            <div className="flex flex-col justify-between h-[178px]">
              <div className="text-white text-sm space-y-1">
                <p className="font-bold">
                  Refer your friends & earn ₦500 on each referral
                </p>
                <p>
                  Share your referral code with your friends and once they
                  signup and make a purchase, you get your points
                </p>
              </div>

              <Link href="/app/referral">
                <Button
                  variant="outline"
                  className="w-fit bg-transparent rounded-full border-[1px] border-white text-white font-medium px-4 xl:px-8 py-2"
                >
                  Refer Now
                </Button>
              </Link>
            </div>

            <Image src={Megaphone} alt="refer icon" className="w-14 h-14" />
          </div>

          <div className="hidden xl:block"></div>
          <div className="hidden xl:block"></div>
          <div className="hidden xl:block"></div>
        </div>
      </div>

      <TopupInfo
        open={showFirstConfirmation}
        setOpen={handleFirstConfirmationClose}
      />

      <Topup
        open={showTopUpDialog}
        setOpen={() => setShowTopUpDialog(false)}
        handleSubmit={handleTopUpSubmit}
      />

      <TopupInfoConfirmation
        open={showSecondConfirmation}
        setOpen={handleSecondConfirmationClose}
      />
    </>
  );
};

export default DesktopPage;
