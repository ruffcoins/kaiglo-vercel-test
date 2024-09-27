"use client";

import ErrorComponent from "@/components/shared/ErrorComponent";
import { useRecommendedProducts } from "@/hooks/queries/products/recommendedProducts";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ProductCard from "../product/ProductCard";
import Loader from "../shared/Loader";
import ProductCardSkeleton from "../shared/ProductCardSkeleton";
import useProductRowLength from "@/hooks/useProductRowLength";

const RecommendedProducts = () => {
  const { length } = useProductRowLength();
  const {
    recommendedProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetchRecommendedProducts,
  } = useRecommendedProducts();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === "loading") {
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

  if (status === "error") {
    return (
      <ErrorComponent
        message="Failed to load recommended products."
        action={refetchRecommendedProducts}
      />
    );
  }

  return (
    <div className="lg:px-8 px-4 space-y-5">
      <h1 className="font-medium text-base lg:text-[32px]">
        Recommended Products
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
        {recommendedProducts?.map((product) => (
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
            discount={product.productColors[0].productPriceDetails[0].discount}
            imageUrl={product.productUrl}
            kaigloSale={product.kaigloSale as string}
            sales={product.sales}
            sold={product.sold}
            featured={product.featured}
            productViews={product.productViews}
          />
        ))}
      </div>

      {/* {isFetchingNextPage && (
        <div className="flex justify-center items-center h-40">
          <Loader />
        </div>
      )} */}
      {/* <div ref={ref}> */}
      {/* This empty div acts as a sentinel for the IntersectionObserver */}
      {/* </div> */}
    </div>
  );
};

export default RecommendedProducts;
