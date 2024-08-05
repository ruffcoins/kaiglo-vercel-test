"use client";

import ErrorComponent from "@/components/shared/ErrorComponent";
import { useRecommendedProducts } from "@/hooks/queries/products/recommendedProducts";
import { Suspense } from "react";
import ProductGrid from "../product/ProductGrid";

const RecommendedProducts = () => {
  const {
    recommendedProducts,
    fetchingRecommendedProducts,
    recommendedProductsError,
    recommendedProductsPaused,
    refetchRecommendedProducts,
  } = useRecommendedProducts();

  if (recommendedProductsError) {
    return (
      <ErrorComponent
        message="Failed to load group buy products."
        action={refetchRecommendedProducts}
      />
    );
  }

  if (!recommendedProducts || recommendedProducts.length === 0) {
    return null;
  }

  return (
    <div className="lg:px-8 xl:px-14 px-4 space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-base lg:text-[32px]">Recommended</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        <Suspense
          fallback={
            <ProductGrid
              isLoading={fetchingRecommendedProducts}
              isPaused={recommendedProductsPaused}
              products={recommendedProducts}
            />
          }
        >
          <ProductGrid
            isLoading={fetchingRecommendedProducts}
            isPaused={recommendedProductsPaused}
            products={recommendedProducts}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default RecommendedProducts;