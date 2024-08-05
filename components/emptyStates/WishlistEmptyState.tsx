import Image from "next/image";
import EmptyHeart from "@/public/images/empty-heart.svg";

const WishlistEmptyState = () => {
  return (
    <div className="lg:h-[calc(100vh-20rem)] h-[calc(100vh-10rem)] col-span-full flex flex-col items-center justify-center space-y-4 lg:border rounded-lg">
      <div className="gap-2.5 flex flex-col items-center">
        <Image
          src={EmptyHeart}
          alt="wishlist icon"
          className="w-14 h-14 opacity-20"
        />
        <p className="font-medium text-lg">This list is empty.</p>
      </div>

      <div className="text-kaiglo_grey-placeholder text-center text-sm">
        <p>You don't have any products in the wishlist yet.</p>
        <p> You will find a lot of interesting products on the website</p>
      </div>
    </div>
  );
};
export default WishlistEmptyState;
