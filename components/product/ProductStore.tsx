"use client";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import FlashSaleProductCard from "../landingPage/FlashSaleProductCard";
import { Button } from "../ui/button";
import Image from "next/image";
import Placeholder from "@/public/images/product-image-placeholder.png";
import useProductDetail from "@/hooks/useProductDetail";
import VerifiedBadge from "@/public/images/verified-badge.svg";
import { useGetStoreDetails } from "@/hooks/queries/store/getStoreDetails";
import Thumbnail1 from "@/public/images/product-thumbnail.jpg";
import Link from "next/link";
import { useGetStoreProducts } from "@/hooks/queries/store/getStoreProducts";

const generateStoreUrl = (storeName: string, storeId: string): string => {
  return `/store/${encodeURIComponent(storeName as string)}/${storeId}`;
};

const ProductStore = ({ productId }: { productId: string }) => {
  const { data } = useProductDetail(productId);
  const { store } = useGetStoreDetails(
    data?.response.store.storeName as string,
  );
  const { storeProducts } = useGetStoreProducts(store?.id as string);

  return (
    <div className="bg-white lg:rounded-2xl lg:mx-8 lg:p-6 px-4 pb-4 space-y-4">
      <div className="flex justify-end items-center">
        <Link
          href={generateStoreUrl(
            store?.storeName as string,
            store?.id as string,
          )}
          className="hidden lg:block"
        >
          <Button variant="secondary" className="rounded-full font-medium">
            View More <ChevronRightIcon className="w-4 h-4 hidden lg:block" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 space-y-6 lg:space-y-0">
        <div className="lg:col-span-4 flex space-x-4">
          <Image
            src={store?.profilePic || Placeholder}
            alt="Store"
            className="lg:w-32 lg:h-32 w-16 h-16 rounded-full object-cover"
            width={128}
            height={128}
          />
          <div className="flex flex-col space-y-2 w-full">
            <div className="flex flex-row justify-between items-center">
              <h1 className="font-bold">{data?.response.store.storeName}</h1>
              <Link
                href={generateStoreUrl(
                  store?.storeName as string,
                  store?.id as string,
                )}
              >
                <Button
                  variant="secondary"
                  className="rounded-full w-fit font-medium block lg:hidden"
                >
                  Visit Store
                </Button>
              </Link>
            </div>

            <div className="flex space-x-1">
              <p className="font-bold text-sm">
                {store?.storeSummary.followers}
                {(store?.storeSummary.followers as number) > 1000 ? "k" : ""}
              </p>
              <p className="text-kaiglo_grey-placeholder text-sm">
                Follower(s)
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
            <Link
              href={generateStoreUrl(
                store?.storeName as string,
                store?.id as string,
              )}
            >
              <Button
                variant="secondary"
                className="rounded-full w-fit font-medium lg:block hidden"
              >
                Visit Store
              </Button>
            </Link>
          </div>
        </div>
        <div className="lg:col-span-8 flex space-x-4 col-span-1 overflow-x-auto">
          {storeProducts
            ?.slice(0, 3)
            .map((product) => (
              <FlashSaleProductCard
                title={product.name}
                price={
                  product.productColors[0].productPriceDetails[0].newPrice
                    ? product.productColors[0].productPriceDetails[0].newPrice
                    : product.productColors[0].productPriceDetails[0].price
                }
                oldPrice={
                  product.productColors[0].productPriceDetails[0].newPrice
                    ? product.productColors[0].productPriceDetails[0].price
                    : undefined
                }
                imageUrl={product.productUrl}
                id={product.id}
                productViews={product.productViews}
              />
            ))}
        </div>
      </div>

      <div className="flex justify-center">
        <Link
          href={generateStoreUrl(
            store?.storeName as string,
            store?.id as string,
          )}
          className="lg:hidden block"
        >
          <Button
            variant="outline"
            className="flex space-x-2 rounded-full w-fit font-medium"
          >
            <span>View more products</span>{" "}
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default ProductStore;
