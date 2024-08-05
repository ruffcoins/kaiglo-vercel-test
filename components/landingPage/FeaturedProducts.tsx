"use client";

import { useFeaturedProducts } from "@/hooks/queries/products/featuredProducts";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Suspense, useEffect, useState } from "react";
import ErrorComponent from "@/components/shared/ErrorComponent";
import ProductGrid from "@/components/product/ProductGrid";
import { useQueryClient } from "@tanstack/react-query";

const FeaturedProducts = () => {
  const {
    fetchingFeaturedProducts,
    featuredProducts,
    featuredProductsError,
    featuredProductsPaused,
    refetchFeaturedProducts,
  } = useFeaturedProducts();

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );
  const [numberOfProducts, setNumberOfProducts] = useState(0);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenWidth < 640) setNumberOfProducts(2);
    else if (screenWidth >= 768 && screenWidth < 1280) setNumberOfProducts(4);
    else if (screenWidth >= 1280 && screenWidth <= 1440) setNumberOfProducts(5);
    else setNumberOfProducts(6);
  }, [screenWidth]);

  if (featuredProductsError) {
    return (
      <ErrorComponent
        message="Failed to load featured products."
        action={refetchFeaturedProducts}
      />
    );
  }

  if (!featuredProducts || featuredProducts.length === 0) {
    return null;
  }

  return (
    <div className="lg:px-8 xl:px-14 px-4 space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-base lg:text-[32px]">
          Featured Products
        </h1>
        <Button
          variant="purple"
          className="rounded-full font-medium disabled:cursor-wait"
        >
          More Products <ChevronRightIcon className="w-5 h-5 hidden lg:block" />
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        <Suspense
          fallback={
            <ProductGrid
              isLoading={fetchingFeaturedProducts}
              isPaused={featuredProductsPaused}
              products={featuredProducts}
              numberOfProducts={numberOfProducts}
            />
          }
        >
          <ProductGrid
            isLoading={fetchingFeaturedProducts}
            isPaused={featuredProductsPaused}
            products={featuredProducts}
            numberOfProducts={numberOfProducts}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default FeaturedProducts;
