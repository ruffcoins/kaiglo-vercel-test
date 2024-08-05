"use client";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Suspense, useEffect, useState } from "react";
import ErrorComponent from "@/components/shared/ErrorComponent";
import { useNewArrivalsProducts } from "@/hooks/queries/products/newArrivals";
import ProductGrid from "@/components/product/ProductGrid";

const NewArrivalsProducts = () => {
  const {
    newArrivalsProducts,
    fetchingNewArrivalsProducts,
    newArrivalsProductsError,
    newArrivalsProductsPaused,
    refetchNewArrivalsProducts,
  } = useNewArrivalsProducts();
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

  if (newArrivalsProductsError) {
    return (
      <ErrorComponent
        message="Failed to load group buy products."
        action={refetchNewArrivalsProducts}
      />
    );
  }

  if (!newArrivalsProducts || newArrivalsProducts.length === 0) {
    return null;
  }

  return (
    <div className="lg:px-8 xl:px-14 px-4 space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-base lg:text-[32px]">New Arrivals</h1>
        <Button
          variant="secondary"
          disabled={fetchingNewArrivalsProducts}
          className="rounded-full font-medium disabled:cursor-wait"
        >
          More Products <ChevronRightIcon className="w-5 h-5 hidden lg:block" />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        <Suspense
          fallback={
            <ProductGrid
              isLoading={fetchingNewArrivalsProducts}
              isPaused={newArrivalsProductsPaused}
              products={newArrivalsProducts}
              numberOfProducts={numberOfProducts}
            />
          }
        >
          <ProductGrid
            isLoading={fetchingNewArrivalsProducts}
            isPaused={newArrivalsProductsPaused}
            products={newArrivalsProducts}
            numberOfProducts={numberOfProducts}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default NewArrivalsProducts;
