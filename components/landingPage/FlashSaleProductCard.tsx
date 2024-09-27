"use client";
import Image, { StaticImageData } from "next/image";
import Rating from "@/components/shared/Rating";
import { createSlug, truncate } from "@/lib/utils";
import AddToWishlistButton from "@/components/product/AddToWishlistButton";
import useIsProductInWishlist from "@/hooks/useIsProductInWishlist";
import { useFetchUserProfile } from "@/hooks/queries/userProfile";
import { useGetRatingAndReviewSummary } from "@/hooks/queries/products/getRatingSummary";
import Link from "next/link";
import { ProductView } from "@/interfaces/product.interface";
import Placeholder from "@/public/images/product-image-placeholder.png";

interface FlashSaleProductCardProps {
  id: string;
  title: string;
  price: number | string;
  oldPrice?: number;
  imageUrl: StaticImageData | string;
  productViews: ProductView[];
}

const FlashSaleProductCard: React.FC<FlashSaleProductCardProps> = ({
  id,
  title,
  price,
  oldPrice,
  imageUrl,
  productViews,
}) => {
  const { user } = useFetchUserProfile();

  const { isOnMyWishList, setIsOnMyWishList } = useIsProductInWishlist(
    id,
    user?.wishListItems,
  );
  const { ratingAndReviewSummary } = useGetRatingAndReviewSummary(id);

  return (
    <Link href={`/product/${createSlug(title)}/${id}`}>
      <div className="bg-white p-3 rounded-lg flex items-start gap-2 min-w-[265px] min-h-[120px]">
        <div className="relative">
          <Image
            src={imageUrl || Placeholder}
            alt={title}
            className="w-[96px] rounded"
            width={130}
            height={130}
          />
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
          <h2 className="font-medium">{truncate(title, 12)}</h2>
          <Rating rating={ratingAndReviewSummary?.averageRating || 0} />
          <div className="text-sm font-medium">{`₦${price.toLocaleString()}`}</div>
          {oldPrice && (
            <div className="text-[10px] text-kaiglo_grey-placeholder line-through">
              {`₦${oldPrice?.toLocaleString()}`}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default FlashSaleProductCard;
