"use client";
import Image, { StaticImageData } from "next/image";
import Rating from "@/components/shared/Rating";
import { truncate } from "@/lib/utils";
import AddToWishlistButton from "@/components/product/AddToWishlistButton";
import useIsProductInWishlist from "@/hooks/useIsProductInWishlist";
import { useFetchUserProfile } from "@/hooks/queries/userProfile";

interface FlashSaleProductCardProps {
  id: string;
  title: string;
  price: number | string;
  oldPrice: string;
  rating: number;
  imageUrl: StaticImageData | string;
}

const FlashSaleProductCard: React.FC<FlashSaleProductCardProps> = ({
  id,
  title,
  price,
  oldPrice,
  rating,
  imageUrl,
}) => {
  const { user } = useFetchUserProfile();

  const { isOnMyWishList, setIsOnMyWishList } = useIsProductInWishlist(
    id,
    user?.wishListItems,
  );

  return (
    <div className="bg-white p-3 rounded-lg flex items-start gap-2 w-full">
      <div className="relative">
        <Image src={imageUrl} alt={title} className="w-[98px] rounded" />
        <div className="absolute top-2 right-2">
          <AddToWishlistButton
            isOnMyWishList={isOnMyWishList}
            setIsOnMyWishList={setIsOnMyWishList}
            id={id}
            name={title}
            price={price as number}
            imageUrl={imageUrl as string}
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-1.5">
        <h2 className="font-medium">{truncate(title, 15)}</h2>
        <Rating rating={rating} />
        <div className="text-sm font-medium">{price}</div>
        <div className="text-[10px] text-kaiglo_grey-placeholder line-through">
          {oldPrice}
        </div>
      </div>
    </div>
  );
};

export default FlashSaleProductCard;
