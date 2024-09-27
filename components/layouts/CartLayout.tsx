"use client";

import { usePathname, useRouter } from "next/navigation";
import DesktopHeader from "../shared/headers/DesktopHeader";
import Trash from "@/public/images/trash.svg";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Breadcrumb from "../shared/Breadcrumb";
import { ReactNode, useState } from "react";
import Image from "next/image";
import { useCartContext } from "@/contexts/CartContext";
import DeleteCartItemsDialog from "../cart/dialogs/DeleteCartItemsDialog";
import CartPageBottomNav from "../shared/CartPageBottomNav";
import { ShippingCost } from "@/interfaces/responses/cart.interface";

interface CartLayoutProps {
  children: ReactNode;
  shippingCost?: ShippingCost | undefined;
  breadcrumbItems?: {
    label: string;
    href?: string | undefined;
  }[];
  productId?: string;
  proceedToCheckout?: () => void;
}

const CartLayout = ({
  children,
  breadcrumbItems,
  shippingCost,
  productId,
  proceedToCheckout,
}: CartLayoutProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { cart, checkedItems, removeCheckedItems } = useCartContext();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const allItemsAreUnchecked = (items: Record<string, boolean>): boolean => {
    return Object.values(items).every((value) => value === false);
  };

  return (
    <>
      <main className="w-screen overflow-hidden bg-white lg:bg-transparent h-screen">
        <DesktopHeader showCallToOrder={false} />
        <div className="lg:hidden flex items-center justify-between border-b-2 border-kaiglo_grey-disabled py-4 px-5 bg-white">
          <ChevronLeftIcon className="w-6 h-6" onClick={() => router.back()} />
          <h1 className="text-xl font-medium text-center flex-1">
            {pathname === "/cart" && "My Cart"}
            {pathname === "/checkout/order-confirmation" &&
              "Order Confirmation"}
          </h1>
          {pathname === "/cart" && cart.length > 0 && (
            <Image
              src={Trash}
              alt="trash icon"
              width={24}
              height={24}
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                if (allItemsAreUnchecked(checkedItems)) {
                  return;
                } else {
                  setOpenDeleteModal(true);
                }
              }}
            />
          )}
        </div>

        {breadcrumbItems && <Breadcrumb items={breadcrumbItems} />}

        <div className="relative lg:mt-40">{children}</div>

        <CartPageBottomNav
          allowCTA={false}
          productId={productId}
          shippingCost={shippingCost}
          proceedToCheckout={proceedToCheckout || (() => {})}
        />
      </main>

      {openDeleteModal && (
        <DeleteCartItemsDialog
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          deleteCartItems={removeCheckedItems}
        />
      )}
    </>
  );
};

export default CartLayout;
