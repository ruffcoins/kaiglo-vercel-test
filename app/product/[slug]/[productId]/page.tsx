import Image from "next/image";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Store from "@/public/images/store.jpg";
import VerifiedBadge from "@/public/images/verified-badge.svg";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import FlashSaleProductCard from "@/components/landingPage/FlashSaleProductCard";
import Thumbnail1 from "@/public/images/product-thumbnail.jpg";
import Thumbnail2 from "@/public/images/product-thumbnail-1.jpg";
import Thumbnail3 from "@/public/images/product-thumbnail-2.jpg";
import ProductDescription from "@/components/product/ProductDescription";
import ProductReviews from "@/components/product/ProductReview";
import RelatedProducts from "@/components/product/RelatedProducts";
import InnerPageLayout from "@/components/layouts/InnerPageLayout";
import Loader from "@/components/shared/Loader";
import ProductDetailsIntroductionSkeletonLoader from "@/components/product/skeletons/ProductDetailsIntroductionSkeletonLoader";

export default async function Product({
  params,
}: {
  params: { slug: string; productId: string };
}) {
  const { slug, productId } = params;

  // Dynamically import the ClientInnerPages component with SSR disabled
  const ProductDetailsIntroduction = dynamic(
    () => import("@/components/product/ProductDetailsIntroduction"),
    {
      ssr: false,
      loading: () => <ProductDetailsIntroductionSkeletonLoader />,
    },
  );

  return (
    <InnerPageLayout>
      <div className="space-y-5 my-10">
        <ProductDetailsIntroduction productId={productId} />

        <div className="bg-white rounded-2xl lg:mx-8 xl:mx-14 mx-4 p-6 space-y-4">
          <div className="flex justify-end items-center">
            <Button variant="secondary" className="rounded-full font-medium">
              View More <ChevronRightIcon className="w-4 h-4 hidden lg:block" />
            </Button>
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-5 flex space-x-4">
              <Image src={Store} alt="Store" width={128} height={128} />
              <div className="flex flex-col space-y-2">
                <h1 className="font-bold">Variety Store</h1>
                <div className="flex space-x-1">
                  <p className="font-bold text-sm">251k</p>
                  <p className="text-kaiglo_grey-placeholder text-sm">
                    Followers
                  </p>
                </div>
                <div className="flex space-x-4">
                  <div className="flex space-x-1">
                    <Image src={VerifiedBadge} alt="verified badge" />
                    <p className="text-sm">Top Seller</p>
                  </div>
                  <div className="flex space-x-1">
                    <Image src={VerifiedBadge} alt="verified badge" />
                    <p className="text-sm">Verified Seller</p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className="rounded-full w-fit font-medium"
                >
                  Visit Store
                </Button>
              </div>
            </div>
            <div className="col-span-7 flex space-x-4">
              <FlashSaleProductCard
                title="Adidas Boost Breathable Lightweight Gymnastics Running Sneakers"
                price="₦780,580"
                oldPrice="₦880,580"
                rating={3}
                imageUrl={Thumbnail1}
                id="jhjk"
              />
              <FlashSaleProductCard
                title="Water Dispenser"
                price="₦780,580"
                oldPrice="₦880,580"
                rating={3}
                imageUrl={Thumbnail2}
                id="kkjkl"
              />
              <FlashSaleProductCard
                title="Water Dispenser"
                price="₦780,580"
                oldPrice="₦880,580"
                rating={3}
                imageUrl={Thumbnail3}
                id="kkjkl"
              />
            </div>
          </div>
        </div>

        <ProductDescription />

        <ProductReviews />

        <div className="lg:mx-8 xl:mx-14 mx-4 rounded-2xl p-6 bg-white space-y-8">
          <h2 className="text-3xl font-medium">
            Seller’s Warranty + Return Policy
          </h2>
          <p>
            We offer free return within 7 days of purchase.{" "}
            <span className="text-kaiglo_info-base">Learn more</span>
          </p>
        </div>

        <div className="lg:mx-8 xl:mx-14 mx-4 rounded-2xl p-6 bg-white">
          <RelatedProducts />
        </div>
      </div>
    </InnerPageLayout>
  );
}
