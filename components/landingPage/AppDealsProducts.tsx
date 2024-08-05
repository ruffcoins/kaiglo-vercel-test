"use client";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ErrorComponent from "@/components/shared/ErrorComponent";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import { useAppDealsProducts } from "@/hooks/queries/products/appDealsProducts";

const AppDealsProducts = () => {
  const {
    appDealsProducts,
    fetchingAppDealsProducts,
    appDealsProductsError,
    appDealsProductsPaused,
    refetchAppDealsProducts,
  } = useAppDealsProducts();
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );
  const [numberOfProducts, setNumberOfProducts] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenWidth < 640) {
      setNumberOfProducts(2);
    } else if (screenWidth >= 768 && screenWidth < 1280) {
      setNumberOfProducts(4);
    } else if (screenWidth >= 1280 && screenWidth <= 1440) {
      setNumberOfProducts(5);
    } else {
      setNumberOfProducts(6);
    }
  }, [screenWidth]);

  return appDealsProductsError ? (
    <ErrorComponent
      message="Failed to load app deals products."
      action={refetchAppDealsProducts}
    />
  ) : (
    appDealsProducts && appDealsProducts?.length > 0 && (
      <div className="lg:px-8 xl:px-14 px-4 space-y-5">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-base lg:text-[32px]">
            App Exclusive Deals - 50% OFF
          </h1>
          <Button
            variant="info"
            disabled={fetchingAppDealsProducts}
            className="rounded-full font-medium disabled:cursor-wait"
          >
            More Products{" "}
            <ChevronRightIcon className="w-5 h-5 hidden lg:block" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {fetchingAppDealsProducts || appDealsProductsPaused
            ? Array.from({ length: numberOfProducts }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : appDealsProducts
                ?.slice(0, numberOfProducts)
                ?.map((product, index) => (
                  <ProductCard
                    id={product.id}
                    key={index}
                    sales={product.sales}
                    name={product.name}
                    price={
                      product.productColors[0].productPriceDetails[0].newPrice
                        ? product.productColors[0].productPriceDetails[0]
                            .newPrice
                        : product.productColors[0].productPriceDetails[0].price
                    }
                    oldPrice={
                      product.productColors[0].productPriceDetails[0].newPrice
                        ? product.productColors[0].productPriceDetails[0].price
                        : undefined
                    }
                    rating={5}
                    imageUrl={product.productUrl}
                    sold={product.sold}
                    category={product.category}
                    discount={
                      product.productColors[0].productPriceDetails[0].discount
                    }
                    kaigloSale={product.kaigloSale as string}
                    featured={product.featured}
                  />
                ))}
        </div>
      </div>
    )
  );
};

export default AppDealsProducts;
