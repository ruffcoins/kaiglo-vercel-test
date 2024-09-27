"use client";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import ErrorComponent from "@/components/shared/ErrorComponent";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import { useAppDealsProducts } from "@/hooks/queries/products/appDealsProducts";
import useProductRowLength from "@/hooks/useProductRowLength";
import { useRouter } from "next/navigation";

const AppDealsProducts = () => {
  const { length } = useProductRowLength();
  const router = useRouter();
  const {
    appDealsProducts,
    isFetching: fetchingAppDealsProducts,
    error: appDealsProductsError,
    refetchAppDealsProducts,
  } = useAppDealsProducts();

  if (appDealsProductsError) {
    return (
      <ErrorComponent
        message="Failed to load app deals products."
        action={refetchAppDealsProducts}
      />
    );
  }

  if (fetchingAppDealsProducts) {
    return (
      <div className="lg:px-8 px-4 space-y-5">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
          {Array.from({ length }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    appDealsProducts?.length > 0 && (
      <div className="lg:px-8 px-4 space-y-5">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-base lg:text-[32px]">
            App Exclusive Deals - 50% OFF
          </h1>
          <Button
            variant="attention"
            className="rounded-full font-medium disabled:cursor-wait text-sm lg:text-base"
            onClick={() => router.push("/product/app-deal")}
          >
            More Products{" "}
            <ChevronRightIcon className="w-5 h-5 hidden lg:block" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {appDealsProducts.slice(0, length).map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
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
              category={product.category}
              discount={
                product.productColors[0].productPriceDetails[0].discount
              }
              imageUrl={product.productUrl}
              kaigloSale={product.kaigloSale as string}
              sales={product.sales}
              sold={product.sold}
              featured={product.featured}
              cartImageColor="info"
              productViews={product.productViews}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default AppDealsProducts;
