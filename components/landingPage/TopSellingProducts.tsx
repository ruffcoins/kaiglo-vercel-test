"use client";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Suspense, useEffect, useState } from "react";
import ErrorComponent from "@/components//shared/ErrorComponent";
import { useTopSellingProducts } from "@/hooks/queries/products/topSellingProducts";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import ProductGrid from "../product/ProductGrid";

const TopSellingProducts = () => {
  const {
    topSellingProducts,
    fetchingTopSellingProducts,
    topSellingProductsError,
    topSellingProductsPaused,
    refetchTopSellingProducts,
  } = useTopSellingProducts();

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );
  const [numberOfProducts, setNumberOfProducts] = useState(0);

  const handleResize = () => setScreenWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const determineNumberOfProducts = () => {
      if (screenWidth < 640) return 2;
      if (screenWidth >= 768 && screenWidth < 1280) return 4;
      if (screenWidth >= 1280 && screenWidth <= 1440) return 5;
      return 6;
    };
    setNumberOfProducts(determineNumberOfProducts());
  }, [screenWidth]);

  if (topSellingProductsError) {
    return (
      <ErrorComponent
        message="Failed to load group buy products."
        action={refetchTopSellingProducts}
      />
    );
  }

  if (!topSellingProducts || topSellingProducts.length === 0) {
    return null;
  }

  return (
    <div className="lg:px-8 xl:px-14 px-4 space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-base lg:text-[32px]">Top Selling</h1>
        <Button
          variant="secondary"
          disabled={fetchingTopSellingProducts}
          className="rounded-full font-medium disabled:cursor-wait"
        >
          More Products <ChevronRightIcon className="w-5 h-5 hidden lg:block" />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        <Suspense
          fallback={
            <ProductGrid
              isLoading={fetchingTopSellingProducts}
              isPaused={topSellingProductsPaused}
              products={topSellingProducts}
              numberOfProducts={numberOfProducts}
            />
          }
        >
          <ProductGrid
            isLoading={fetchingTopSellingProducts}
            isPaused={topSellingProductsPaused}
            products={topSellingProducts}
            numberOfProducts={numberOfProducts}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default TopSellingProducts;
