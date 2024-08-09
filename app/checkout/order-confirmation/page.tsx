"use client";

import CartLayout from "@/components/layouts/CartLayout";
import ModifiedButton from "@/components/shared/ModifiedButton";
import Link from "next/link";
import { useCartContext } from "@/contexts/CartContext";
import Image from "next/image";
import { createSlug, truncate } from "@/lib/utils";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Suspense, useCallback, useEffect, useState } from "react";
import NewAddressDialog from "@/components/address/dialogs/NewAddressDialog";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchUserProfile } from "@/hooks/queries/userProfile";
import Shipping from "@/public/images/shipping-accent.svg";
import AddressListDialog from "@/components/address/dialogs/AddressListDialog";
import { useGetAllAddresses } from "@/hooks/queries/address/getAllAddresses";
import { IAddress } from "@/interfaces/address.interface";
import PaymentDialog from "@/components/shared/PaymentDialog";
import useAuth from "@/hooks/useAuth";
import { useGetShippingCost } from "@/hooks/queries/getShippingCost";
import React from "react";

const BuyNowComponent = () => {
  const searchParams = useSearchParams();
  const buyNow = searchParams.get("buyNow");
  return (
    <Link href="/cart">
      <ModifiedButton
        type="button"
        variant="secondary"
        value={buyNow ? "View Cart" : "Modify Cart"}
        className="rounded-full w-fit !h-fit text-sm py-1 px-3"
      />
    </Link>
  );
};

const OrderConfirmation = () => {
  const { isLoggedIn } = useAuth();
  const { checkoutItems, getCheckoutTotal } = useCartContext();
  const checkoutTotal = getCheckoutTotal();
  const router = useRouter();
  const [openNewAddressDialog, setOpenNewAddressDialog] = useState(false);
  const { user } = useFetchUserProfile();
  const [openAddressListDialog, setOpenAddressListDialog] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [lga, setLga] = useState<string | undefined>();
  const [state, setState] = useState<string | undefined>();

  const {
    shippingCost,
    fetchingShippingCost,
    refetchShippingCost,
    isRefetchingShippingCost,
  } = useGetShippingCost(lga as string, state as string);

  useEffect(() => {
    if (!isLoggedIn && typeof window !== "undefined") {
      window.location.replace("/cart");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (checkoutItems.length === 0) {
      router.replace("/cart");
    }
  }, [checkoutItems]);

  const { addresses, fetchingAddresses } = useGetAllAddresses();
  const [defaultAddress, setDefaultAddress] = useState<IAddress | undefined>();

  const getDefaultAddress = useCallback(() => {
    return addresses?.find((address) => address.defaultAddress === true);
  }, [addresses]);

  useEffect(() => {
    if (!fetchingAddresses && addresses && addresses?.length > 0) {
      setDefaultAddress(getDefaultAddress());
      setCheckoutAddress(getDefaultAddress());
    }
  }, [getDefaultAddress]);

  const [checkoutAddress, setCheckoutAddress] = useState<IAddress | undefined>(
    defaultAddress,
  );

  const handleAddressSelection = (address: IAddress) => {
    setCheckoutAddress(address);
    setLga(address.city);
    setState(address.state);
  };

  const proceedToCheckout = () => {
    setOpenPaymentDialog((prev) => !prev);
  };

  const refetch = async () => {
    await refetchShippingCost();
  };

  useEffect(() => {
    if (checkoutAddress) {
      setLga(checkoutAddress.city);
      setState(checkoutAddress.state);
      refetch();
    }
  }, [checkoutAddress, lga, state]);

  const isCalculatingShippingCost =
    fetchingShippingCost || isRefetchingShippingCost;
  const formattedShippingCost = `₦${(Number(shippingCost?.price) || 0).toLocaleString()}`;

  useEffect(() => {
    if (shippingCost?.price === undefined) {
      refetch();
    }
  }, [shippingCost]);

  return (
    <>
      <CartLayout>
        <div className="grid grid-cols-4 lg:px-8 xl:px-14 gap-6">
          <div className="col-span-3 space-y-4 relative">
            <div className="bg-white flex items-center justify-between p-6 h-[72px] rounded-xl">
              <p className="font-medium text-xl">Order Confirmation</p>
            </div>

            <div className="relative h-[calc(100vh-16rem)] ">
              <div className="space-y-4 h-[calc(100vh-23rem)] overflow-y-scroll">
                <div className="rounded-xl bg-white w-full p-4 space-y-4 flex flex-col min-h-32 font-medium">
                  <div className="flex justify-between items-center">
                    <p>Shipping Address</p>

                    {user && user.address.length > 0 && (
                      <ModifiedButton
                        type="button"
                        variant="secondary"
                        value="Change"
                        className="rounded-full w-fit !h-fit text-sm py-1 px-3"
                        onClick={() => setOpenAddressListDialog(true)}
                      />
                    )}
                  </div>
                  <div className="flex">
                    {user && user.address.length > 0 ? (
                      <div className="flex space-x-6">
                        <div className="bg-kaiglo_accent-100 p-3 rounded-lg">
                          <Image
                            src={Shipping}
                            alt="Shipping"
                            className="w-6 h-6"
                          />
                        </div>

                        <p className="flex flex-col space-y-0.5 text-sm font-normal">
                          <span className="text-kaiglo_grey-placeholder">
                            Full Name
                          </span>
                          <span className="text-base">
                            {checkoutAddress?.firstName ||
                              user.address[0].firstName}{" "}
                            {checkoutAddress?.lastName ||
                              user.address[0].lastName}
                          </span>
                        </p>
                        <p className="flex flex-col space-y-0.5 text-sm font-normal">
                          <span className="text-kaiglo_grey-placeholder">
                            Phone Number
                          </span>
                          <span className="text-base">
                            {checkoutAddress?.phoneNumber ||
                              user.address[0].phoneNumber}
                          </span>
                        </p>
                        <p className="flex flex-col space-y-0.5 text-sm font-normal">
                          <span className="text-kaiglo_grey-placeholder">
                            Address
                          </span>
                          <span className="text-base">
                            {checkoutAddress?.name || user.address[0].name}
                          </span>
                        </p>
                        <p className="flex flex-col space-y-0.5 text-sm font-normal">
                          <span className="text-kaiglo_grey-placeholder">
                            City
                          </span>
                          <span className="text-base">
                            {checkoutAddress?.city || user.address[0].city}
                          </span>
                        </p>
                        <p className="flex flex-col space-y-0.5 text-sm font-normal">
                          <span className="text-kaiglo_grey-placeholder">
                            State
                          </span>
                          <span className="text-base">
                            {checkoutAddress?.state || user.address[0].state}
                          </span>
                        </p>
                      </div>
                    ) : (
                      <div className="flex w-full justify-center">
                        <ModifiedButton
                          type="button"
                          variant="secondary"
                          value="Add Address"
                          className="rounded-full w-fit py-3 px-8"
                          onClick={() => {
                            setOpenNewAddressDialog(true);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="rounded-xl bg-white w-full p-4 space-y-4 flex flex-col min-h-32 font-medium">
                  <div className="flex justify-between items-center">
                    <p>Selected Items</p>
                    <Suspense
                      fallback={
                        <div className="bg-gray-200 h-10 w-40 animate-pulse"></div>
                      }
                    >
                      <BuyNowComponent />
                    </Suspense>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {checkoutItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 space-x-4 bg-white border rounded-lg"
                      >
                        <Image
                          src={item.productUrl}
                          alt="Product"
                          className="w-[88px] h-[88px] rounded"
                          width={88}
                          height={88}
                        />
                        <Link
                          href={`/product/${createSlug(item.productName)}/${item.productId}`}
                          className="space-y-1 flex-1 overflow-hidden"
                        >
                          <div className="space-y-0.5">
                            <h3 className="text-sm font-normal">
                              {truncate(item.productName, 30)}
                            </h3>

                            <h3 className="text-sm font-bold">
                              &#x20A6;{item?.price.toLocaleString()}
                            </h3>

                            <p className="text-xs font-normal">
                              Colour:{" "}
                              <span className="text-kaiglo_grey-base font-normal capitalize">
                                {item.color}
                              </span>
                            </p>

                            <div className="flex space-x-4 items-center font-normal">
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
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 rounded-xl bg-white w-full p-6 space-y-1 flex justify-between items-center">
                <div>
                  <p className="font-medium space-x-2">
                    <span className="text-kaiglo_grey-placeholder">Total</span>
                    <span className="text-black">
                      ₦{checkoutTotal.toLocaleString()}
                    </span>
                  </p>
                </div>
                <ModifiedButton
                  variant="primary"
                  disabled={shippingCost?.price === undefined}
                  className="w-fit font-medium rounded-full px-8 py-3 disabled:cursor-not-allowed"
                  type={"button"}
                  value="PLACE ORDER"
                  onClick={proceedToCheckout}
                />
              </div>
            </div>
          </div>

          <div className="col-span-1 space-y-4">
            <div className="bg-white rounded-xl p-6 space-y-4">
              <p className="font-medium">Summary</p>
              <p className="flex items-center justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">
                  ₦{checkoutTotal.toLocaleString()}
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span>Shipping Fees:</span>
                <span className="font-medium text-right text-kaiglo_info-base">
                  {checkoutAddress
                    ? isCalculatingShippingCost
                      ? "Calculating..."
                      : formattedShippingCost
                    : "Select Address"}
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span>Coupon:</span>
                <span className="font-medium text-kaiglo_brand-base">
                  {/* ₦{subTotal.toLocaleString()} */}
                  None
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span>Tax:</span>
                <span className="font-medium">₦0.0</span>
              </p>
              <p className="flex items-center justify-between">
                <span>Total Amount:</span>
                <span className="font-medium text-xl">
                  ₦
                  {(
                    checkoutTotal + (Number(shippingCost?.price) || 0)
                  ).toLocaleString() ?? 0}
                </span>
              </p>
            </div>

            <div className="flex justify-between bg-white rounded-xl p-6 font-medium h-20">
              <p>Have a Coupon?</p>
              <ChevronDownIcon className="w-6 h-6" />
            </div>
          </div>
        </div>
      </CartLayout>

      {openNewAddressDialog && (
        <NewAddressDialog
          open={openNewAddressDialog}
          setOpen={setOpenNewAddressDialog}
        />
      )}

      {openAddressListDialog && (
        <AddressListDialog
          open={openAddressListDialog}
          setOpen={setOpenAddressListDialog}
          setCheckoutAddress={handleAddressSelection}
          currentSelectedAddress={checkoutAddress}
        />
      )}

      {openPaymentDialog && (
        <PaymentDialog
          open={openPaymentDialog}
          setOpen={setOpenPaymentDialog}
          totalAmount={checkoutTotal}
          lga={lga as string}
          state={state as string}
        />
      )}
    </>
  );
};
export default OrderConfirmation;
