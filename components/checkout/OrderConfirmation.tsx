"use client";

import CartLayout from "@/components/layouts/CartLayout";
import ModifiedButton from "@/components/shared/ModifiedButton";
import Link from "next/link";
import { useCartContext } from "@/contexts/CartContext";
import Image from "next/image";
import {
  createSlug,
  getSelectedProductPriceDetail,
  transformCartItemToOrderItem,
  truncate,
} from "@/lib/utils";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Suspense, useCallback, useEffect, useState } from "react";
import NewAddressDialog from "@/components/address/dialogs/NewAddressDialog";
import { useRouter } from "next/navigation";
import { useFetchUserProfile } from "@/hooks/queries/userProfile";
import Shipping from "@/public/images/shipping-accent.svg";
import AddressListDialog from "@/components/address/dialogs/AddressListDialog";
import { useGetAllAddresses } from "@/hooks/queries/address/getAllAddresses";
import { IAddress } from "@/interfaces/address.interface";
import PaymentDialog from "@/components/shared/PaymentDialog";
import useAuth from "@/hooks/useAuth";
import { useGetShippingCost } from "@/hooks/queries/getShippingCost";
import { CheckoutOrderItem } from "@/interfaces/checkout.interface";
import { fetchProductDetails } from "@/hooks/queries/products/useProductDetails";
import {
  ProductColor,
  ProductPriceDetail,
} from "@/interfaces/product.interface";
import { OrderSuccessDialog } from "@/components/shared/OrderSuccessDialog";
import BuyNowComponent from "./BuyNowComponent";
import { Dialog, DialogContent } from "../ui/dialog";
import Loader from "../shared/Loader";
import { Button } from "../ui/button";

// const isAddressComplete = (address: IAddress | undefined): boolean => {
//   return !!(
//     address &&
//     address.firstName &&
//     address.lastName &&
//     address.phoneNumber &&
//     address.name &&
//     address.city &&
//     address.state
//   );
// };

const OrderConfirmation = () => {
  const { isLoggedIn } = useAuth();
  const { checkoutItems, getCheckoutTotal } = useCartContext();
  const checkoutTotal = getCheckoutTotal();
  const router = useRouter();
  const [openNewAddressDialog, setOpenNewAddressDialog] = useState(false);
  const { user } = useFetchUserProfile();
  const [openAddressListDialog, setOpenAddressListDialog] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [lga, setLga] = useState<string | undefined>("");
  const [state, setState] = useState<string | undefined>("");
  const [transformedCartItems, setTransformedCartItems] = useState<
    CheckoutOrderItem[]
  >([]);
  const [orderCreated, setOrderCreated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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
  const [defaultAddress, setDefaultAddress] = useState<IAddress | undefined>({
    city: "",
    defaultAddress: true,
    firstName: "",
    lastName: "",
    name: "",
    phoneNumber: "",
    state: "",
    id: "",
  });

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

  const getProductPriceDetail = async (
    productId: string,
    selectedColor: string,
    selectedSize?: string,
    selectedRamSize?: string,
    selectedStorage?: string,
  ) => {
    const data = await fetchProductDetails(productId);

    return getSelectedProductPriceDetail(
      data?.response.productColors as ProductColor[],
      selectedColor,
      data?.response.productUrl,
      selectedSize,
      selectedRamSize,
      selectedStorage,
    );
  };

  const getStoreInformation = async (productId: string) => {
    const data = await fetchProductDetails(productId);
    const storeId = data?.response.store.id;
    const storeName = data?.response.store.storeName;
    const freeShipping = data?.response.freeShipping;
    const sales = data?.response.sales;
    return { storeId, storeName, freeShipping, sales };
  };

  const transformCart = async () => {
    try {
      const transformedItems = await Promise.all(
        checkoutItems.map(async (cartItem) => {
          try {
            const productPriceDetail = await getProductPriceDetail(
              cartItem.productId,
              cartItem.color,
              cartItem.size || undefined,
              cartItem.ramSize || undefined,
              cartItem.storage || undefined,
            );

            if (!productPriceDetail) {
              throw new Error(
                `Product price detail not found for cartItem: ${JSON.stringify(cartItem)}`,
              );
            }

            const productInformation = await getStoreInformation(
              cartItem.productId,
            );

            return transformCartItemToOrderItem(
              cartItem,
              checkoutAddress?.name +
                ", " +
                checkoutAddress?.city +
                ", " +
                checkoutAddress?.state,
              user.firstName + " " + user.lastName,
              productPriceDetail.priceDetail as ProductPriceDetail,
              checkoutAddress?.state as string,
              productInformation.storeId as string,
              productInformation.storeName as string,
              user?.id,
              "",
              productInformation.freeShipping,
              productInformation.sales,
              "PENDING",
              productPriceDetail.url as string,
            );
          } catch (innerError) {
            console.error("Error processing cartItem:", cartItem, innerError);
            throw innerError;
          }
        }),
      );

      // console.log(checkoutAddress)
      setTransformedCartItems(transformedItems);
    } catch (error: any) {
      console.error("Failed to transform cart items:", error);
      console.error("Error details:", error.message, error.stack);
    }
  };

  // Transform cart items whenever cart is updated
  useEffect(() => {
    transformCart();
  }, [checkoutItems, checkoutAddress, user, state, lga]);

  return (
    <>
      <CartLayout
        shippingCost={shippingCost}
        proceedToCheckout={proceedToCheckout}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 px-4 lg:px-8 gap-4 lg:gap-6 h-[calc(100vh-4.5rem)] pb-32 lg:pb-0 overflow-y-scroll">
          <div className="lg:col-span-3 space-y-4 relative">
            <div className="hidden lg:flex bg-white items-center justify-between p-6 h-[72px] rounded-xl">
              <p className="font-medium text-xl">Order Confirmation</p>
            </div>

            <div className="relative">
              <div className="space-y-4 lg:h-[calc(100vh-20rem)] overflow-y-scroll flex flex-col">
                {/* Shipping Address */}
                <div className="lg:order-1 order-2 rounded-xl bg-white w-full lg:p-4 lg:space-y-4 flex flex-col min-h-32 font-medium">
                  <div className="flex justify-between items-center space-y-4 lg:space-y-0">
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
                      <div className="flex lg:flex-row flex-col space-y-4 lg:space-x-6 lg:space-y-0">
                        <div className="bg-kaiglo_accent-100 p-3 rounded-lg w-fit">
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

                {/* Selected Items */}
                <div className="order-1 lg:order-2 rounded-xl bg-white w-full lg:p-4 lg:space-y-4 space-y-4 flex flex-col lg:min-h-32 font-medium">
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

                  <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
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

                <div
                  className="lg:hidden block order-last pt-4"
                  style={{ boxShadow: "0 -4px 8px rgba(0, 0, 0, 0.08)" }}
                >
                  <div className="bg-white space-y-2">
                    <p className="flex items-center justify-between text-sm">
                      <span className="text-kaiglo_grey-placeholder">
                        Subtotal:
                      </span>
                      <span className="font-medium">
                        ₦{checkoutTotal.toLocaleString()}
                      </span>
                    </p>
                    <p className="flex items-center justify-between text-sm">
                      <span className="text-kaiglo_grey-placeholder">
                        Shipping:
                      </span>
                      {checkoutAddress ? (
                        <span className="font-medium text-right text-kaiglo_info-base">
                          {isCalculatingShippingCost
                            ? "Calculating..."
                            : formattedShippingCost}
                        </span>
                      ) : (
                        <Button
                          variant="info"
                          onClick={() => setOpenAddressListDialog(true)}
                          className="bg-transparent"
                        >
                          Select Address
                        </Button>
                      )}
                    </p>
                    <p className="flex items-center justify-between text-sm">
                      <span className="text-kaiglo_grey-placeholder">
                        Coupon:
                      </span>
                      <span className="font-medium text-kaiglo_brand-base">
                        None
                      </span>
                    </p>
                    <p className="flex items-center justify-between text-sm">
                      <span className="">Total:</span>
                      <span className="font-medium text-lg">
                        ₦
                        {(
                          checkoutTotal + (Number(shippingCost?.price) || 0)
                        ).toLocaleString() ?? 0}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* <div className="absolute bottom-0 rounded-xl bg-white w-full p-6 space-y-1 flex justify-between items-center">
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
            </div> */}
            </div>
          </div>

          <div className="lg:block hidden lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl p-6 space-y-4">
              <p className="font-medium">Summary</p>
              <p className="flex items-center justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">
                  ₦{checkoutTotal.toLocaleString()}
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span>Shipping:</span>
                {checkoutAddress ? (
                  <span className="font-medium text-right text-kaiglo_info-base">
                    {isCalculatingShippingCost
                      ? "Calculating..."
                      : formattedShippingCost}
                  </span>
                ) : (
                  <Button
                    variant="info"
                    onClick={() => setOpenAddressListDialog(true)}
                    className="bg-transparent"
                  >
                    Select Address
                  </Button>
                )}
              </p>
              <p className="flex items-center justify-between">
                <span>Coupon:</span>
                <span className="font-medium text-kaiglo_brand-base">
                  {/* ₦{subTotal.toLocaleString()} */}
                  None
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span>Total:</span>
                <span className="font-medium text-xl">
                  ₦
                  {(
                    checkoutTotal + (Number(shippingCost?.price) || 0)
                  ).toLocaleString() ?? 0}
                </span>
              </p>
              <ModifiedButton
                variant="primary"
                disabled={shippingCost?.price === undefined}
                className="w-full font-medium rounded-full px-8 py-3 disabled:cursor-not-allowed"
                type={"button"}
                value="PLACE ORDER"
                onClick={proceedToCheckout}
              />
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
          checkoutAmount={checkoutTotal.toString()}
          shippingAmount={shippingCost?.price as string}
          totalAmount={checkoutTotal + Number(shippingCost?.price)}
          lga={lga as string}
          state={state as string}
          checkoutItems={checkoutItems}
          address={
            checkoutAddress?.name +
            ", " +
            checkoutAddress?.city +
            ", " +
            checkoutAddress?.state
          }
          name={user.firstName + " " + user.lastName}
          email={user.email}
          transformedCartItems={transformedCartItems}
          setOrderCreated={setOrderCreated}
          setIsProcessing={setIsProcessing}
        />
      )}

      {isProcessing && !orderCreated && (
        <Dialog open={isProcessing}>
          <DialogContent className="flex items-center justify-center lg:w-[552px]">
            <div className="flex flex-col items-center space-y-4">
              <Loader />
              <p className="text-lg font-medium">Processing your order...</p>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {orderCreated && (
        <OrderSuccessDialog
          orderCreated={orderCreated}
          setOrderCreated={setOrderCreated}
        />
      )}
    </>
  );
};

export default OrderConfirmation;
