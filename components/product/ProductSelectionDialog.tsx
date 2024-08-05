import React, { SetStateAction, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import Placeholder from "@/public/images/product-image-placeholder.png";
import { ProductColor } from "@/interfaces/product.interface";
import CartSideSheet from "../cart/CartSideSheet";
import { useFetchUserProfile } from "@/hooks/queries/userProfile";
import useAddItemToCart from "@/hooks/mutation/cart/addItemToCart";
import {
  getCartFromCookies,
  ICacheCart,
  saveCartToCookies,
} from "@/lib/cookieUtils";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/contexts/CartContext";
import useAuth from "@/hooks/useAuth";

interface ProductSelectionProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  colors: ProductColor[];
  productUrl: string;
  productId: string;
  productName: string;
  setOpenAuthModal: React.Dispatch<SetStateAction<boolean>>;
  setOpenSideCart: React.Dispatch<SetStateAction<boolean>> | undefined;
}

const ProductSelectionDialog = ({
  open,
  setOpen,
  colors,
  productUrl,
  productId,
  productName,
  setOpenAuthModal,
  setOpenSideCart,
}: ProductSelectionProps) => {
  const { user } = useFetchUserProfile();
  const { isLoggedIn } = useAuth();
  const { addItemToCart } = useAddItemToCart();
  const { setCheckoutItems } = useCartContext();
  const router = useRouter();

  const [buyNowProduct, setBuyNowProduct] = useState<ICacheCart | undefined>(
    undefined,
  );
  const [availableSizes, setAvailableSizes] = useState<(string | undefined)[]>(
    [],
  );
  const [availableRamSizes, setAvailableRamSizes] = useState<
    (string | undefined)[]
  >([]);
  const [availableStorages, setAvailableStorages] = useState<
    (string | undefined)[]
  >([]);
  const [currentPrice, setCurrentPrice] = useState<number>(0);

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined,
  );
  const [selectedRamSize, setSelectedRamSize] = useState<string | undefined>(
    undefined,
  );
  const [selectedStorage, setSelectedStorage] = useState<string | undefined>(
    undefined,
  );

  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(1);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    const selectedColorData = colors.find((c) => c.color.color === color);
    if (selectedColorData) {
      // Get unique values for this specific color
      const sizesForThisColor = Array.from(
        new Set(selectedColorData.productPriceDetails.map((d) => d.size)),
      );
      const ramSizesForThisColor = Array.from(
        new Set(selectedColorData.productPriceDetails.map((d) => d.ramSize)),
      );
      const storagesForThisColor = Array.from(
        new Set(selectedColorData.productPriceDetails.map((d) => d.storage)),
      );

      setAvailableSizes(sizesForThisColor);
      setAvailableRamSizes(ramSizesForThisColor);
      setAvailableStorages(storagesForThisColor);

      // Set the first available options as selected
      if (sizesForThisColor.length > 0) setSelectedSize(sizesForThisColor[0]);
      if (ramSizesForThisColor.length > 0)
        setSelectedRamSize(ramSizesForThisColor[0]);
      if (storagesForThisColor.length > 0)
        setSelectedStorage(storagesForThisColor[0]);

      setCurrentPrice(
        updatePrice(
          selectedColor,
          selectedSize,
          selectedRamSize,
          selectedStorage,
          quantity,
        ),
      );

      updateMaxQuantity(
        selectedColorData,
        sizesForThisColor[0],
        ramSizesForThisColor[0],
        storagesForThisColor[0],
      );
    }
  };

  const updatePrice = (
    color: string,
    size?: string,
    ramSize?: string,
    storage?: string,
    quantity: number = 1,
  ) => {
    const selectedColorData = colors.find((c) => c.color.color === color);
    if (selectedColorData) {
      const matchingPriceDetail = selectedColorData.productPriceDetails.find(
        (d) =>
          d.size === size && d.ramSize === ramSize && d.storage === storage,
      );
      if (matchingPriceDetail) {
        if (matchingPriceDetail.newPrice) {
          return matchingPriceDetail.newPrice * quantity;
        } else {
          return matchingPriceDetail.price * quantity;
        }
      }
    }
    return 0;
  };

  const adjustQuantity = (newMaxQuantity: number) => {
    setQuantity((prevQuantity) => {
      if (prevQuantity > newMaxQuantity) {
        // If current quantity exceeds new max, set it to new max
        return newMaxQuantity;
      }
      return prevQuantity;
    });
  };

  const updateMaxQuantity = (
    colorData: ProductColor,
    size?: string,
    ramSize?: string,
    storage?: string,
  ) => {
    const matchingPriceDetail = colorData.productPriceDetails.find(
      (d) => d.size === size && d.ramSize === ramSize && d.storage === storage,
    );
    if (matchingPriceDetail && matchingPriceDetail.quantity) {
      const newMaxQuantity = matchingPriceDetail.quantity;
      setMaxQuantity(parseInt(newMaxQuantity));
      adjustQuantity(parseInt(newMaxQuantity));
    } else {
      setMaxQuantity(1);
      adjustQuantity(1);
    }
  };

  const handleSizeChange = (size: string | undefined) => {
    setSelectedSize(size);
    const selectedColorData = colors.find(
      (c) => c.color.color === selectedColor,
    );
    if (selectedColorData) {
      updateMaxQuantity(
        selectedColorData,
        size,
        selectedRamSize,
        selectedStorage,
      );
    }

    setCurrentPrice(
      updatePrice(
        selectedColor,
        size,
        selectedRamSize,
        selectedStorage,
        quantity,
      ),
    );
  };

  const handleRamSizeChange = (ramSize: string | undefined) => {
    setSelectedRamSize(ramSize);
    const selectedColorData = colors.find(
      (c) => c.color.color === selectedColor,
    );
    if (selectedColorData) {
      updateMaxQuantity(
        selectedColorData,
        selectedSize,
        ramSize,
        selectedStorage,
      );
    }

    setCurrentPrice(
      updatePrice(
        selectedColor,
        selectedSize,
        ramSize,
        selectedStorage,
        quantity,
      ),
    );
  };

  const handleStorageChange = (storage: string | undefined) => {
    setSelectedStorage(storage);
    const selectedColorData = colors.find(
      (c) => c.color.color === selectedColor,
    );
    if (selectedColorData) {
      updateMaxQuantity(
        selectedColorData,
        selectedSize,
        selectedRamSize,
        storage,
      );
    }

    setCurrentPrice(
      updatePrice(
        selectedColor,
        selectedSize,
        selectedRamSize,
        storage,
        quantity,
      ),
    );
  };

  const increaseQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity((prev) => {
        const newQuantity = Math.min(maxQuantity, prev + 1);
        setCurrentPrice(
          updatePrice(
            selectedColor,
            selectedSize,
            selectedRamSize,
            selectedStorage,
            newQuantity,
          ),
        );
        return newQuantity;
      });
    }
  };

  const reduceQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => {
        const newQuantity = Math.max(1, prev - 1);
        setCurrentPrice(
          updatePrice(
            selectedColor,
            selectedSize,
            selectedRamSize,
            selectedStorage,
            newQuantity,
          ),
        );
        return newQuantity;
      });
    }
  };

  useEffect(() => {
    if (colors.length > 0) {
      const firstColor = colors[0].color.color;
      const firstPriceDetail = colors[0].productPriceDetails[0];

      setSelectedColor(firstColor);
      setSelectedSize(firstPriceDetail.size);
      setSelectedRamSize(firstPriceDetail.ramSize);
      setSelectedStorage(firstPriceDetail.storage);

      setAvailableSizes(
        Array.from(new Set(colors[0].productPriceDetails.map((d) => d.size))),
      );
      setAvailableRamSizes(
        Array.from(
          new Set(colors[0].productPriceDetails.map((d) => d.ramSize)),
        ),
      );
      setAvailableStorages(
        Array.from(
          new Set(colors[0].productPriceDetails.map((d) => d.storage)),
        ),
      );

      updateMaxQuantity(
        colors[0],
        firstPriceDetail.size,
        firstPriceDetail.ramSize,
        firstPriceDetail.storage,
      );

      setCurrentPrice(
        updatePrice(
          firstColor,
          firstPriceDetail.size,
          firstPriceDetail.ramSize,
          firstPriceDetail.storage,
          quantity,
        ),
      );
    }
  }, [colors]);

  useEffect(() => {
    setCurrentPrice(
      updatePrice(
        selectedColor,
        selectedSize,
        selectedRamSize,
        selectedStorage,
        quantity,
      ),
    );
  }, [selectedColor, selectedSize, selectedRamSize, selectedStorage, quantity]);

  useEffect(() => {
    const getPrice = colors
      .find((c) => c.color.color === selectedColor)
      ?.productPriceDetails.find(
        (d) =>
          d.size === selectedSize &&
          d.ramSize === selectedRamSize &&
          d.storage === selectedStorage,
      );

    const product = {
      color: selectedColor,
      platform: "WEB",
      price: getPrice?.newPrice ?? getPrice?.price ?? 0,
      productId,
      productUrl,
      quantity: quantity.toString(),
      ramSize: selectedRamSize || "",
      size: selectedSize || "",
      storage: selectedStorage || "",
      userId: user?.id || "",
      productName: productName,
      maxQuantity: maxQuantity.toString(),
    };

    setBuyNowProduct(product);
  }, [selectedColor, selectedSize, selectedRamSize, selectedStorage, quantity]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="w-[563px] transition-all duration-500"
          data-testid="auth-dialog"
        >
          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle>
                <h1>Select Colour, Size Option</h1>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-2">
              <div className="text-kaiglo_grey-base font-medium text-sm space-x-2">
                <span>COLOUR:</span>
                <span className="text-kaiglo_brand-base capitalize">
                  {selectedColor}
                </span>
              </div>
              <div className="flex space-x-2">
                {colors.map((color, index) => (
                  <Image
                    key={index}
                    src={color.colorUrl || Placeholder}
                    alt={"product image"}
                    width={80}
                    height={80}
                    className={`min-h-20 max-h-20 max-w-20 min-w-20 border-2 rounded-xl cursor-pointer ${selectedColor === color.color.color ? "border-4 border-kaiglo_success-base " : "border-kaiglo_grey-placeholder"}`}
                    onClick={() => handleColorChange(color.color.color)}
                  />
                ))}
              </div>
            </div>

            {availableSizes.length > 0 && availableSizes[0] !== undefined && (
              <div className="space-y-2">
                <div className="text-kaiglo_grey-base font-medium text-sm space-x-2">
                  <span>SIZE:</span>
                  <span className="text-kaiglo_brand-base">{selectedSize}</span>
                </div>
                <div className="flex space-x-2">
                  {availableSizes.map((size, index) => (
                    <Button
                      variant="outline"
                      key={index}
                      className={`w-14 h-14 px-4 py-2 border rounded-xl  ${selectedSize === size ? "bg-kaiglo_success-base text-white" : "bg-white border-2 text-kaiglo_grey-base border-kaiglo_grey-placeholder font-medium"}`}
                      onClick={() => handleSizeChange(size as string)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {availableRamSizes.length > 0 &&
              availableRamSizes[0] !== undefined && (
                <div className="space-y-2">
                  <div className="text-kaiglo_grey-base font-medium text-sm space-x-2">
                    <span>RAM SIZE:</span>
                    <span className="text-kaiglo_brand-base">
                      {selectedRamSize}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    {availableRamSizes.map((ram, index) => (
                      <Button
                        variant="outline"
                        key={index}
                        className={`w-14 h-14 px-4 py-2 border rounded-xl  ${selectedRamSize === ram ? "bg-kaiglo_success-base text-white" : "bg-white border-2 text-kaiglo_grey-base border-kaiglo_grey-placeholder font-medium"}`}
                        onClick={() => handleRamSizeChange(ram as string)}
                      >
                        {ram}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

            {availableStorages.length > 0 &&
              availableStorages[0] !== undefined && (
                <div className="space-y-2">
                  <div className="text-kaiglo_grey-base font-medium text-sm space-x-2">
                    <span>STORAGE SIZE:</span>
                    <span className="text-kaiglo_brand-base">
                      {selectedStorage}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    {availableStorages.map((storage, index) => (
                      <Button
                        variant="outline"
                        key={index}
                        className={`w-14 h-14 px-4 py-2 border rounded-xl  ${selectedStorage === storage ? "bg-kaiglo_success-base text-white" : "bg-white border-2 text-kaiglo_grey-base border-kaiglo_grey-placeholder font-medium"}`}
                        onClick={() => handleStorageChange(storage as string)}
                      >
                        {storage}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="text-kaiglo_grey-base font-medium text-sm space-x-2">
                    <span>QUANTITY:</span>
                    <span className="text-kaiglo_brand-base">{quantity}</span>
                  </div>
                  <div className="border rounded-full border-kaiglo_grey-placeholder h-12 flex items-center justify-center">
                    <Button variant="outline" className="border-0">
                      <MinusCircledIcon
                        className={cn(
                          "w-6 h-6",
                          quantity <= 1 &&
                            "text-kaiglo_grey-placeholder cursor-not-allowed",
                        )}
                        onClick={reduceQuantity}
                      />
                    </Button>
                    <span>{quantity}</span>
                    <Button variant="outline" className="border-0">
                      <PlusCircledIcon
                        onClick={increaseQuantity}
                        className={cn(
                          quantity === maxQuantity &&
                            "text-kaiglo_grey-placeholder cursor-not-allowed",
                          "w-6 h-6",
                        )}
                      />
                    </Button>
                  </div>
                </div>

                {maxQuantity === 0 && (
                  <p className="text-kaiglo_critical-500 text-sm">
                    Out of Stock
                  </p>
                )}
              </div>

              <div className="">
                <div className="flex items-center space-x-4 text-kaiglo_grey-base font-medium text-sm">
                  <span> PRICE:</span>
                  <span className="text-xl font-bold">
                    ₦
                    {quantity === 0
                      ? colors[0].productPriceDetails[0].price.toLocaleString()
                      : currentPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between space-x-14">
              <Button
                variant="accent"
                className={cn(
                  quantity < 1 && "cursor-not-allowed",
                  "text-black rounded-full w-full h-12 uppercase font-medium bg-kaiglo_accent-100",
                )}
                disabled={quantity < 1}
                onClick={() => {
                  if (quantity > 0) {
                    setOpenSideCart?.(true);
                    setOpen(false);

                    const item: ICacheCart = {
                      color: selectedColor,
                      platform: "WEB",
                      price: currentPrice / quantity,
                      productId,
                      productUrl,
                      quantity: quantity.toString(),
                      ramSize: selectedRamSize || "",
                      size: selectedSize || "",
                      storage: selectedStorage || "",
                      userId: user?.id || "",
                      productName: productName,
                      maxQuantity: maxQuantity.toString(),
                    };

                    if (user) {
                      addItemToCart(item);
                    } else {
                      const tempCart = getCartFromCookies();
                      tempCart.push(item);
                      saveCartToCookies(tempCart);
                    }
                  }
                }}
              >
                Add to Cart
              </Button>

              <Button
                variant="primary"
                className={cn(
                  quantity < 1 && "cursor-not-allowed",
                  "bg-kaiglo_brand-base w-full h-12 text-white rounded-full px-8 py-3 uppercase font-medium",
                )}
                disabled={quantity < 1}
                onClick={() => {
                  setCheckoutItems([buyNowProduct as ICacheCart]);
                  if (isLoggedIn) {
                    router.push("/checkout/order-confirmation");
                  } else {
                    setOpenAuthModal(true);
                  }
                }}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductSelectionDialog;
