"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ModifiedButton from "../shared/ModifiedButton";

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

export default BuyNowComponent;
