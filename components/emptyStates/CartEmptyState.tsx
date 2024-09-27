import Image from "next/image";
import Cart from "@/public/images/cart.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CartEmptyState = () => {
  return (
    <div className="h-[calc(100vh-30rem)] col-span-full flex flex-col items-center justify-center space-y-4">
      <div className="gap-2.5 flex flex-col items-center">
        <Image
          src={Cart}
          alt="cart image"
          className="w-14 h-14 opacity-30"
          width={56}
          height={56}
        />
        <p className="font-bold">Your cart is empty.</p>
      </div>

      <div className="text-kaiglo_grey-placeholder text-center">
        <p>No product has been added to your cart yet.</p>
        <p>You will find a lot of interesting products on the website.</p>
      </div>

      <Link href="/">
        <Button variant="secondary" className="w-36 font-medium">
          Browse Products
        </Button>
      </Link>
    </div>
  );
};
export default CartEmptyState;
