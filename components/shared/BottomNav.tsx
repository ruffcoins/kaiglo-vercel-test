"use client";

import { bottomNavMenu } from "@/constants/menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import useProductDetail from "@/hooks/useProductDetail";
import ProductSelectionDialog from "../product/ProductSelectionDialog";
import { AuthDialog } from "../auth/dialogs/AuthDialog";
import EnterOtp from "../auth/dialogs/EnterOtp";
import { useState } from "react";

export interface BottomNavProps {
  allowCTA: boolean;
  productId?: string;
}

const BottomNav = ({ allowCTA, productId }: BottomNavProps) => {
  const pathname = usePathname();

  const {
    data,
    colors,
    toggleProductSelectionDialog,
    openProductSelectionDialog,
    setOpenProductSelectionDialog,
  } = useProductDetail(productId as string);

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <>
      <div
        className="lg:hidden fixed bottom-0 right-0 left-0 bg-white grid grid-cols-4 rounded-t-2xl overflow-x-hidden gap-3 py-2"
        style={{ boxShadow: "0 -4px 8px rgba(0, 0, 0, 0.08)" }}
      >
        <div className="flex flex-col col-span-4">
          {allowCTA && (
            <div className="grid grid-cols-2 justify-between p-5 space-x-3">
              <Button
                variant="primary"
                className="bg-kaiglo_brand-base h-12 text-white rounded-full px-8 py-3 uppercase font-medium"
                onClick={toggleProductSelectionDialog}
              >
                Buy Now
              </Button>

              <Button
                variant="accent"
                className="text-black rounded-full h-12 uppercase font-medium bg-kaiglo_accent-100"
                onClick={toggleProductSelectionDialog}
              >
                Add to Cart
              </Button>
            </div>
          )}

          <div className="grid grid-cols-4 gap-x-6 px-4">
            {bottomNavMenu.map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 p-1 cursor-pointer",
                  (pathname === item.link ||
                    (pathname.includes("/app/") && item.title === "Account") ||
                    (pathname.includes("/product/") &&
                      item.title === "Category") ||
                    (pathname.includes("/category/") &&
                      item.title === "Category")) &&
                    "bg-kaiglo_success-100 rounded-lg",
                )}
              >
                <Image
                  src={
                    pathname === item.link
                      ? item.activeIcon
                      : pathname.includes("/app/") && item.title === "Account"
                        ? item.activeIcon
                        : (pathname.includes("/product/") ||
                              pathname.includes("/category/")) &&
                            item.title === "Category"
                          ? item.activeIcon
                          : item.inactiveIcon
                  }
                  alt={`${item.title} navigation icon`}
                  className="w-6 h-6"
                  width={24}
                  height={24}
                />

                <span
                  className={cn(
                    pathname === item.link
                      ? "text-kaiglo_brand-base font-medium"
                      : pathname.includes("/app/") && item.title === "Account"
                        ? "text-kaiglo_brand-base font-medium"
                        : (pathname.includes("/product/") ||
                              pathname.includes("/category/")) &&
                            item.title === "Category"
                          ? "text-kaiglo_brand-base font-medium"
                          : "text-kaiglo_grey-placeholder font-normal",
                    "text-[10px]",
                  )}
                >
                  {item.title}
                </span>
              </Link>
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
export default BottomNav;
