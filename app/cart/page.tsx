"use client";

import Image from "next/image";
import GreyTrash from "@/public/images/grey-trash.svg";
import CartEmptyState from "@/components/emptyStates/CartEmptyState";
import { Button } from "@/components/ui/button";
import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { cn, createSlug, truncate } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { useCartContext } from "@/contexts/CartContext";
import ModifiedButton from "@/components/shared/ModifiedButton";
import { useEffect, useState } from "react";
import DeleteCartItemsDialog from "@/components/cart/dialogs/DeleteCartItemsDialog";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AuthDialog } from "@/components/auth/dialogs/AuthDialog";
import EnterOtp from "@/components/auth/dialogs/EnterOtp";
import useAuth from "@/hooks/useAuth";

const Cart = () => {
  // console.log('Start'); // Synchronous code

  // setTimeout(() => {
  //   console.log('Timeout 1'); // Asynchronous code
  // }, 0);

  // Promise.resolve().then(() => {
  //   console.log('Promise 1'); // Asynchronous code
  // }).then(() => {
  //   console.log('Promise 2'); // Asynchronous code
  // });

  // setTimeout(() => {
  //   console.log('Timeout 2'); // Asynchronous code
  // }, 0);

  // console.log('End'); // Synchronous code
  const router = useRouter();
  const pathname = usePathname();
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

  useEffect(() => {
    if (!isLoggedIn) {
      sessionStorage.setItem("originalUrl", pathname);
    }
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 lg:px-8 px-4 gap-6 overflow-y-auto">
        <div className="lg:col-span-3 col-span-4 space-y-4 relative">
          <div className="hidden lg:flex bg-white items-center justify-between p-6 h-[72px] rounded-xl">
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
            <div className="relative lg:h-[calc(100vh-16rem)] h-[calc(100vh-15rem)] overflow-y-auto">
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={`${item.productId}-${index}`}
                    className="flex flex-row items-center lg:justify-between lg:items-center lg:p-4 lg:rounded-xl lg:space-x-4 space-x-3 bg-white"
                  >
                    <Checkbox
                      id={`checkbox-${item.productId}-${index}`}
                      className="lg:w-6 lg:h-6 border-kaiglo_grey-placeholder border-2"
                      checked={checkedItems[`${item.productId}-${index}`]}
                      onCheckedChange={(checked) =>
                        toggleItemCheck(
                          item.productId,
                          index,
                          checked as boolean,
                        )
                      }
                    />
                    <Link
                      href={`/product/${createSlug(item.productName)}/${item.productId}`}
                    >
                      <Image
                        src={item.productUrl}
                        alt="Product"
                        className="lg:w-[88px] lg:h-[88px] min-w-[72px] min-h-[72px] rounded"
                        width={88}
                        height={88}
                      />
                    </Link>

                    <div className="space-y-1 flex flex-col w-full">
                      <div className="flex flex-row justify-between lg:justify-start lg:flex-col">
                        <h3 className="text-sm hidden lg:block">
                          {item.productName}
                        </h3>
                        <h3 className="text-sm lg:hidden block">
                          {truncate(item.productName, 23)}
                        </h3>

                        <h3 className="text-sm font-bold">
                          &#x20A6;{item?.price.toLocaleString()}
                        </h3>
                      </div>

                      <div>
                        <p className="text-xs">
                          Colour:{" "}
                          <span className="text-kaiglo_grey-base font-normal capitalize">
                            {item.color}
                          </span>
                        </p>

                        <div className="flex lg:space-x-4 space-x-2 items-center justify-between">
                          <div className="flex space-x-3">
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

                          <div className="rounded-full lg:hidden flex items-center w-fit border h-6">
                            <Button variant="outline" className="border-0 px-2">
                              <MinusCircledIcon
                                className={cn(
                                  "lg:w-6 lg:h-6 w-4 h-4",
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
                            <span className="text-xs">
                              {parseInt(item.quantity)}
                            </span>
                            <Button variant="outline" className="border-0 px-2">
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
                                  "lg:w-6 lg:h-6 w-4 h-4",
                                )}
                              />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:border rounded-full lg:border-kaiglo_grey-placeholder lg:h-12 lg:flex hidden items-center justify-center">
                      <Button variant="outline" className="border-0 p-2 lg:p-4">
                        <MinusCircledIcon
                          className={cn(
                            "lg:w-6 lg:h-6 w-4 h-4",
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
                      <Button variant="outline" className="border-0 p-2 lg:p-4">
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
                            "lg:w-6 lg:h-6 w-4 h-4",
                          )}
                        />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <CartEmptyState />
          )}
        </div>

        {/* Desktop Side Nav */}
        <div className="lg:block hidden lg:col-span-1 col-span-4 space-y-4">
          <div className="bg-white rounded-xl p-6 space-y-4">
            <p className="font-medium">Cart Summary</p>
            <p className="flex items-center justify-between">
              <span>Subtotal:</span>
              <span className="font-medium">₦{subTotal.toLocaleString()}</span>
            </p>
            <p className="flex items-center justify-between">
              <span>Total Amount:</span>
              <span className="font-medium text-xl">
                ₦{subTotal.toLocaleString()}
              </span>
            </p>

            <>
              {allItemsAreUnchecked(checkedItems) && (
                <p className="text-sm text-kaiglo_critical-base font-medium">
                  Select items to checkout
                </p>
              )}
              <ModifiedButton
                variant="primary"
                disabled={allItemsAreUnchecked(checkedItems)}
                className="w-full font-medium rounded-full px-8 py-3"
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
            </>
          </div>

          <div className="bg-white rounded-xl p-6 font-medium h-[380px]">
            <p>Delivery & Return</p>
          </div>
        </div>

        {/* Mobile Bottom Nav */}
        <div className="lg:hidden flex justify-between items-center fixed bottom-0 right-0 left-0 bg-white overflow-x-hidden px-4">
          <div className="bg-white py-2">
            <p className="flex space-x-2 items-center">
              <span>Total</span>
              <span className="font-medium text-xl">
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
      </div>

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
