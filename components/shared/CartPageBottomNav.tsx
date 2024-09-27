"use client";

import { bottomNavMenu } from "@/constants/menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useProductDetail from "@/hooks/useProductDetail";
import ProductSelectionDialog from "../product/ProductSelectionDialog";
import { AuthDialog } from "../auth/dialogs/AuthDialog";
import EnterOtp from "../auth/dialogs/EnterOtp";
import { useState } from "react";
import ModifiedButton from "./ModifiedButton";
import { useCartContext } from "@/contexts/CartContext";
import useAuth from "@/hooks/useAuth";
import { ShippingCost } from "@/interfaces/responses/cart.interface";

export interface CartPageBottomNavProps {
  allowCTA: boolean;
  productId?: string;
  shippingCost?: ShippingCost | undefined;
  proceedToCheckout: () => void;
}

const CartPageBottomNav = ({
  productId,
  shippingCost,
  proceedToCheckout,
}: CartPageBottomNavProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { subTotal, checkedItems, setCheckoutItems, getCheckedItems } =
    useCartContext();

  const allItemsAreUnchecked = (items: Record<string, boolean>): boolean => {
    return Object.values(items).every((value) => value === false);
  };

  const {
    data,
    colors,
    toggleProductSelectionDialog,
    openProductSelectionDialog,
    setOpenProductSelectionDialog,
  } = useProductDetail(productId as string);

  return (
    <>
      <div
        className="lg:hidden fixed bottom-0 right-0 left-0 bg-white grid grid-cols-4 rounded-t-2xl overflow-x-hidden gap-3 py-2"
        style={{
          boxShadow:
            pathname !== "/checkout/order-confirmation"
              ? "0 -4px 8px rgba(0, 0, 0, 0.08)"
              : "none",
        }}
      >
        <div className="flex flex-col col-span-4 gap-4">
          {pathname === "/cart" && (
            <div className="flex justify-between items-center px-4 pt-2">
              <div className="bg-white py-2 w-full">
                <p className="flex space-x-2 items-center font-medium">
                  <span className="text-kaiglo_grey-placeholder">Total</span>
                  <span className="font-medium">
                    ₦{subTotal.toLocaleString()}
                  </span>
                </p>
                {allItemsAreUnchecked(checkedItems) && (
                  <p className="text-sm text-kaiglo_critical-base font-medium">
                    Select items to checkout
                  </p>
                )}
              </div>

              <div className="">
                <ModifiedButton
                  variant="primary"
                  disabled={allItemsAreUnchecked(checkedItems)}
                  className="w-fit font-medium rounded-full px-4 py-2 border"
                  type={"button"}
                  value="CHECKOUT"
                  onClick={() => {
                    if (isLoggedIn) {
                      const itemsToCheckout = getCheckedItems();
                      setCheckoutItems(itemsToCheckout);
                      router.push("/checkout/order-confirmation");
                    } else {
                      setOpenAuthModal(true);
                    }
                  }}
                />
              </div>
            </div>
          )}

          {pathname === "/checkout/order-confirmation" && (
            <div className="flex justify-center items-center mx-4">
              <ModifiedButton
                variant="primary"
                disabled={shippingCost?.price === undefined}
                className="w-full font-medium rounded-full px-8 py-3 disabled:cursor-not-allowed"
                type={"button"}
                value="PLACE ORDER"
                onClick={proceedToCheckout}
              />
            </div>
          )}

          <div className="grid grid-cols-4 gap-x-6 px-4">
            {/* This code block renders a bottom navigation menu */}
            {bottomNavMenu.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  if (item.title === "Account" && !isLoggedIn) {
                    router.push("/auth/authenticate");
                  } else {
                    router.push(item.link);
                  }
                }}
              >
                <Link
                  href={item.link}
                  key={index}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 p-1 cursor-pointer",
                    // Applies a background color and rounded corners if the item is active
                    pathname === item.link ||
                      (pathname.includes("/app/") &&
                        item.title === "Account") ||
                      (pathname.includes("/product/") &&
                        item.title === "Category") ||
                      ((pathname === "/checkout/order-confirmation" ||
                        pathname === "/cart") &&
                        item.title === "Cart")
                      ? "bg-kaiglo_success-100 rounded-lg"
                      : "",
                  )}
                >
                  {/* Renders the icon for each menu item */}
                  <Image
                    src={
                      // Chooses between active and inactive icon based on current path
                      pathname === item.link
                        ? item.activeIcon
                        : pathname.includes("/app/") && item.title === "Account"
                          ? item.activeIcon
                          : pathname.includes("/product/") &&
                              item.title === "Category"
                            ? item.activeIcon
                            : pathname === "/checkout/order-confirmation" &&
                                item.title === "Cart"
                              ? item.activeIcon
                              : item.inactiveIcon
                    }
                    alt={`${item.title} navigation icon`}
                    className="w-6 h-6"
                    width={24}
                    height={24}
                  />

                  {/* Renders the title for each menu item */}
                  <span
                    className={cn(
                      // Applies different text styles based on whether the item is active
                      pathname === item.link
                        ? "text-kaiglo_brand-base font-medium"
                        : pathname.includes("/app/") && item.title === "Account"
                          ? "text-kaiglo_brand-base font-medium"
                          : pathname.includes("/product/") &&
                              item.title === "Category"
                            ? "text-kaiglo_brand-base font-medium"
                            : pathname === "/checkout/order-confirmation" &&
                                item.title === "Cart"
                              ? "text-kaiglo_brand-base font-medium"
                              : "text-kaiglo_grey-placeholder font-normal",
                      "text-[10px]",
                    )}
                  >
                    {item.title}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {openProductSelectionDialog && (
        <ProductSelectionDialog
          colors={colors}
          productUrl={data?.response.productUrl as string}
          productId={data?.response.id as string}
          productName={data?.response.name as string}
          open={openProductSelectionDialog}
          setOpen={setOpenProductSelectionDialog}
          setOpenAuthModal={setOpenAuthModal}
          setOpenSideCart={undefined}
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
export default CartPageBottomNav;
