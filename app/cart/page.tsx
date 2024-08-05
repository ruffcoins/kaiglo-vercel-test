"use client";

import CartLayout from "@/components/layouts/CartLayout";
import Image from "next/image";
import GreyTrash from "@/public/images/grey-trash.svg";
import CartEmptyState from "@/components/emptyStates/CartEmptyState";
import { Button } from "@/components/ui/button";
import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { cn, createSlug } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { useCartContext } from "@/contexts/CartContext";
import ModifiedButton from "@/components/shared/ModifiedButton";
import { useState } from "react";
import DeleteCartItemsDialog from "@/components/cart/dialogs/DeleteCartItemsDialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthDialog } from "@/components/auth/dialogs/AuthDialog";
import EnterOtp from "@/components/auth/dialogs/EnterOtp";
import useAuth from "@/hooks/useAuth";

const Cart = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const {
    cart,
    incrementItemQuantity,
    decrementItemQuantity,
    subTotal,
    toggleItemCheck,
    checkedItems,
    removeCheckedItems,
    setCheckoutItems,
    getCheckedItems,
  } = useCartContext();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const allItemsAreUnchecked = (items: Record<string, boolean>): boolean => {
    return Object.values(items).every((value) => value === false);
  };

  return (
    <>
      <CartLayout>
        <div className="grid grid-cols-4 lg:px-8 xl:px-14 gap-6">
          <div className="col-span-3 space-y-4 relative">
            <div className="bg-white flex items-center justify-between p-6 h-[72px] rounded-xl">
              <p className="font-medium text-xl">MY CART</p>
              <Image
                src={GreyTrash}
                alt="grey trash icon"
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
            </div>

            {cart.length > 0 ? (
              <div className="relative h-[calc(100vh-16rem)] ">
                <div className="space-y-4 h-[calc(100vh-23rem)] overflow-y-scroll">
                  {cart.map((item, index) => (
                    <div
                      key={`${item.productId}-${index}`}
                      className="flex justify-between items-center p-4 rounded-xl space-x-4 bg-white"
                    >
                      <Checkbox
                        id={`checkbox-${item.productId}-${index}`}
                        className="w-6 h-6 border-kaiglo_grey-placeholder border-2"
                        checked={checkedItems[`${item.productId}-${index}`]}
                        onCheckedChange={(checked) =>
                          toggleItemCheck(
                            item.productId,
                            index,
                            checked as boolean,
                          )
                        }
                      />
                      <Image
                        src={item.productUrl}
                        alt="Product"
                        className="w-[88px] h-[88px] rounded"
                        width={88}
                        height={88}
                      />

                      <Link
                        href={`/product/${createSlug(item.productName)}/${item.productId}`}
                        className="space-y-1 flex-1"
                      >
                        <div className="space-y-0.5">
                          <h3 className="text-sm">{item.productName}</h3>

                          <h3 className="text-sm font-bold">
                            &#x20A6;{item?.price.toLocaleString()}
                          </h3>

                          <p className="text-xs">
                            Colour:{" "}
                            <span className="text-kaiglo_grey-base font-normal capitalize">
                              {item.color}
                            </span>
                          </p>

                          <div className="flex space-x-4 items-center">
                            <p className="text-xs">
                              Qty: <span className="">{item.quantity}</span>
                            </p>

                            {item.size && item.size?.length > 0 && (
                              <p className="text-xs">
                                Size: <span className="">{item.size}</span>
                              </p>
                            )}

                            {item.ramSize && item.ramSize?.length > 0 && (
                              <p className="text-xs">
                                Ram: <span className="">{item.ramSize}</span>
                              </p>
                            )}

                            {item.storage && item.storage?.length > 0 && (
                              <p className="text-xs">
                                Storage:{" "}
                                <span className="">{item.storage}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>

                      <div className="border rounded-full border-kaiglo_grey-placeholder h-12 flex items-center justify-center">
                        <Button variant="outline" className="border-0">
                          <MinusCircledIcon
                            className={cn(
                              "w-6 h-6",
                              parseInt(item.quantity) <= 1 &&
                                "text-kaiglo_grey-placeholder cursor-not-allowed",
                            )}
                            onClick={() => {
                              if (parseInt(item.quantity) > 1) {
                                decrementItemQuantity(index);
                              }
                            }}
                          />
                        </Button>
                        <span>{parseInt(item.quantity)}</span>
                        <Button variant="outline" className="border-0">
                          <PlusCircledIcon
                            onClick={() => {
                              if (
                                parseInt(item.quantity) <
                                parseInt(item.maxQuantity)
                              ) {
                                incrementItemQuantity(index);
                              }
                            }}
                            className={cn(
                              parseInt(item.quantity) ===
                                parseInt(item.maxQuantity) &&
                                "text-kaiglo_grey-placeholder cursor-not-allowed",
                              "w-6 h-6",
                            )}
                          />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-0 rounded-xl bg-white w-full p-6 space-y-1 flex justify-between items-center">
                  <div>
                    <p className="font-medium space-x-2">
                      <span className="text-kaiglo_grey-placeholder">
                        Total
                      </span>
                      <span className="text-black">
                        ₦{subTotal.toLocaleString()}
                      </span>
                    </p>
                    {allItemsAreUnchecked(checkedItems) && (
                      <p className="text-sm text-kaiglo_critical-base font-medium">
                        Select items to checkout
                      </p>
                    )}
                  </div>
                  <ModifiedButton
                    variant="primary"
                    disabled={allItemsAreUnchecked(checkedItems)}
                    className="w-fit font-medium rounded-full px-8 py-3"
                    type={"button"}
                    value="PROCEED TO CHECKOUT"
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
            ) : (
              <CartEmptyState />
            )}
          </div>
          <div className="col-span-1 space-y-4">
            <div className="bg-white rounded-xl p-6 space-y-4">
              <p className="font-medium">Cart Summary</p>
              <p className="flex items-center justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">
                  ₦{subTotal.toLocaleString()}
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span>Tax:</span>
                <span className="font-medium">₦0.0</span>
              </p>
              <p className="flex items-center justify-between">
                <span>Total Amount:</span>
                <span className="font-medium text-xl">
                  ₦{subTotal.toLocaleString()}
                </span>
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 font-medium h-[380px]">
              <p>Delivery & Return</p>
            </div>
          </div>
        </div>
      </CartLayout>

      {openDeleteModal && (
        <DeleteCartItemsDialog
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          deleteCartItems={removeCheckedItems}
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
export default Cart;
