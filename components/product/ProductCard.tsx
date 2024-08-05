"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import AddToWishlistButton from "@/components/product/AddToWishlistButton";
import ProductBadge from "@/components/product/ProductBadge";
import Rating from "@/components/shared/Rating";
import Cart from "@/public/images/cart.svg";
import FeaturedCart from "@/public/images/cart-featured.svg";
import GroupBuyCart from "@/public/images/group-buy-cart.svg";
import AppDealsCart from "@/public/images/app-deals-cart.svg";
import { cn, createSlug, truncate } from "@/lib/utils";
import Link from "next/link";
import { useFetchUserProfile } from "@/hooks/queries/userProfile";
import useIsProductInWishlist from "@/hooks/useIsProductInWishlist";
import useProductDetail from "@/hooks/useProductDetail";
import ProductSelectionDialog from "./ProductSelectionDialog";
import { useState } from "react";
import { AuthDialog } from "../auth/dialogs/AuthDialog";
import EnterOtp from "../auth/dialogs/EnterOtp";
import CartSideSheet from "../cart/CartSideSheet";

export interface ProductCardProps {
  id: string;
  sales: boolean;
  kaigloSale: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  imageUrl: string;
  sold: number;
  category: string;
  discount: number;
  featured?: boolean;
}

const ProductCard = ({
  id,
  sales,
  kaigloSale,
  name,
  sold,
  category,
  price,
  oldPrice,
  imageUrl,
  rating,
  discount,
  featured,
}: ProductCardProps) => {
  const { user } = useFetchUserProfile();
  const { isOnMyWishList, setIsOnMyWishList } = useIsProductInWishlist(
    id,
    user?.wishListItems,
  );

  const {
    data,
    colors,
    toggleProductSelectionDialog,
    openProductSelectionDialog,
    setOpenProductSelectionDialog,
  } = useProductDetail(id);

  const [openSideCart, setOpenSideCart] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <>
      <Card className=" min-h-full p-2 lg:p-4 space-y-1.5 flex flex-col justify-between cursor-pointer">
        <div>
          <div className="relative">
            <Link href={`/product/${createSlug(name)}/${id}`}>
              <Image
                src={imageUrl}
                alt="product image"
                className="w-full h-[154px] lg:h-[220px] rounded-lg"
                width={150}
                height={220}
              />
            </Link>
            <div className="absolute top-2 right-2">
              <AddToWishlistButton
                isOnMyWishList={isOnMyWishList}
                setIsOnMyWishList={setIsOnMyWishList}
                id={id}
                name={name}
                price={price}
                imageUrl={imageUrl}
              />
            </div>
            {(sales || kaigloSale !== null) && (
              <div className="absolute top-2 left-2">
                <ProductBadge
                  kaigloSale={kaigloSale}
                  discount={discount}
                  type={kaigloSale}
                />
              </div>
            )}
          </div>

          <div className="mt-1.5 space-y-0.5">
            <p className={cn("hidden lg:block text-sm mt-1 capitalize")}>
              {truncate(name.toLowerCase(), 20)}
            </p>
            <p className={cn("lg:hidden block text-sm mt-1 capitalize")}>
              {truncate(name.toLowerCase(), 16)}
            </p>
            <p
              className={cn(
                "text-sm font-normal capitalize text-kaiglo_grey-placeholder",
              )}
            >
              {truncate(category.toLocaleLowerCase(), 16)}
            </p>
            <div className="flex lg:flex-row flex-col items-start lg:items-center lg:space-x-4 space-y-1 lg:space-y-0">
              <Rating rating={rating} />
              {sold > 0 && <span className="text-xs">{sold} sold</span>}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <p className="font-bold">₦{price.toLocaleString()}</p>
            {sales && (
              <p className="text-kaiglo_grey-placeholder text-sm line-through">
                ₦{oldPrice?.toLocaleString()}
              </p>
            )}
          </div>

          <div
            className={cn(
              "w-10 h-10 flex justify-center items-center rounded-lg",
              kaigloSale === "GROUP_BUY" && "!bg-kaiglo_attention-100",
              kaigloSale === "APP_ONLY_DEALS" && "!bg-kaiglo_info-100",
              featured && "!bg-kaiglo_purple-100",
              "bg-kaiglo_grey-100",
            )}
          >
            <Image
              src={
                kaigloSale === "GROUP_BUY"
                  ? GroupBuyCart
                  : kaigloSale === "APP_ONLY_DEALS"
                    ? AppDealsCart
                    : featured
                      ? FeaturedCart
                      : Cart
              }
              alt="cart icon"
              onClick={toggleProductSelectionDialog}
            />
          </div>
        </div>
      </Card>

      {openProductSelectionDialog && (
        <ProductSelectionDialog
          colors={colors}
          productUrl={data?.response.productUrl as string}
          productId={data?.response.id as string}
          productName={data?.response.name as string}
          open={openProductSelectionDialog}
          setOpen={setOpenProductSelectionDialog}
          setOpenAuthModal={setOpenAuthModal}
          setOpenSideCart={setOpenSideCart}
        />
      )}

      {openSideCart && (
        <CartSideSheet
          open={openSideCart}
          setOpen={setOpenSideCart}
          setOpenProductSelectionDialog={setOpenProductSelectionDialog}
        />
      )}

      {openAuthModal && (
        <AuthDialog
          openAuthModal={openAuthModal}
          setOpenAuthModal={setOpenAuthModal}
          setShowOtpModal={setShowOtpModal}
          setEmail={setEmail}
          setPhone={setPhone}
        />
      )}

      {showOtpModal && (
        <EnterOtp
          open={showOtpModal}
          setOpen={setShowOtpModal}
          email={email}
          phone={phone}
        />
      )}
    </>
  );
};
export default ProductCard;
