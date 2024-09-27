import Image from "next/image";
import OrderBox from "@/public/images/empty-state-order-box.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const OrderEmptyState = () => {
  return (
    <div className="h-[calc(100vh-24rem)] col-span-full flex flex-col items-center justify-center space-y-4">
      <div className="gap-2.5 flex flex-col items-center">
        <Image
          src={OrderBox}
          alt="order box"
          className="w-14 h-14"
          width={56}
          height={56}
        />
        <p className="font-bold">This list is empty.</p>
      </div>

      <div className="text-kaiglo_grey-placeholder text-center">
        <p>No order has been made yet.</p>
        <p>You will find a lot of interesting products on the website</p>
      </div>

      <Link href="/">
        <Button variant="secondary" className="w-36 font-medium">
          Browse Products
        </Button>
      </Link>
    </div>
  );
};
export default OrderEmptyState;
