import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { cn, truncate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useCartContext } from "@/contexts/CartContext";
import { calculateSubTotal } from "@/lib/cartUtils";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const CartSideSheet = ({
  open,
  setOpen,
  setOpenProductSelectionDialog,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  setOpenProductSelectionDialog: (open: boolean) => void;
}) => {
  const { cart, removeItem, setCheckoutItems } = useCartContext();
  const subTotal = calculateSubTotal(cart);
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet
        key="right"
        open={open}
        onOpenChange={() => {
          setOpen(!open);
          setOpenProductSelectionDialog(false);
        }}
      >
        <SheetContent
          side="right"
          className="p-0 m-0 w-[340px] flex flex-col justify-between"
        >
          <div className="">
            <SheetHeader className="border-b h-16 flex flex-row px-6 items-center bg-white">
              <SheetTitle>Shopping Cart</SheetTitle>
            </SheetHeader>
            <div className="divide-y overflow-y-auto h-[calc(100vh-18rem)]">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start py-[18px] px-6 space-x-4 w-full"
                >
                  <Image
                    src={item.productUrl}
                    alt="Product"
                    className="w-20 h-20 rounded"
                    width={80}
                    height={80}
                  />

                  <div className="space-y-4 flex-1">
                    <div className="space-y-0.5">
                      <h3 className="font-bold flex-wrap">
                        {truncate(item.productName, 30)}
                      </h3>
                      <p className="font-medium">
                        Colour:{" "}
                        <span className="text-kaiglo_grey-base font-normal capitalize">
                          {item.color}
                        </span>
                      </p>
                      {item.size && item.size?.length > 0 && (
                        <p className="font-medium">
                          Size:{" "}
                          <span className="text-kaiglo_grey-base font-normal">
                            {item.size}
                          </span>
                        </p>
                      )}

                      {item.ramSize && item.ramSize?.length > 0 && (
                        <p className="font-medium">
                          Ram:{" "}
                          <span className="text-kaiglo_grey-base font-normal">
                            {item.ramSize}
                          </span>
                        </p>
                      )}

                      {item.storage && item.storage?.length > 0 && (
                        <p className="font-medium">
                          Storage:{" "}
                          <span className="text-kaiglo_grey-base font-normal">
                            {item.storage}
                          </span>
                        </p>
                      )}
                    </div>

                    <p className="font-medium text-sm">
                      <span className="text-kaiglo_grey-placeholder">
                        {item.quantity} x{" "}
                      </span>
                      &#x20A6;{item.price.toLocaleString()}
                    </p>
                  </div>

                  <CrossCircledIcon
                    className="h-6 w-6 text-kaiglo_grey-placeholder cursor-pointer"
                    onClick={() => removeItem(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="divide-y border-y fixed bottom-0 right-0 z-10 w-[340px] bg-white">
            <div className="flex justify-between py-[18px] px-6">
              <span className="font-medium">Subtotal: </span>
              <span className="font-bold text-kaiglo_brand-base text-xl">
                &#x20A6;{subTotal.toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col space-y-2 py-[18px] px-6">
              <Button
                variant="primary"
                className={cn(
                  "rounded-full py-3 px-8 min-h-12 mt-2 lg:mt-0 font-medium",
                  !isLoggedIn && window.innerWidth <= 768 && "hidden",
                )}
                onClick={() => {
                  setCheckoutItems(cart);
                  router.push("/checkout/order-confirmation");
                }}
              >
                Checkout
              </Button>
              <Link href="/cart">
                <Button
                  variant="secondary"
                  className="rounded-full py-3 px-8 min-h-12 mt-2 lg:mt-0 font-medium w-full"
                >
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default CartSideSheet;
