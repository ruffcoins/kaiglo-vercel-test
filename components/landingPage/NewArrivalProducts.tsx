"use client";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import ErrorComponent from "@/components/shared/ErrorComponent";
import { useNewArrivalsProducts } from "@/hooks/queries/products/newArrivals";
import ProductCardSkeleton from "../shared/ProductCardSkeleton";
import useProductRowLength from "@/hooks/useProductRowLength";
import ProductCard from "../product/ProductCard";

const NewArrivalsProducts = () => {
  const { length } = useProductRowLength();
  const {
    newArrivalsProducts,
    fetchingNewArrivalsProducts,
    newArrivalsProductsError,
    refetchNewArrivalsProducts,
  } = useNewArrivalsProducts();

  if (newArrivalsProductsError) {
    return (
      <ErrorComponent
        message="Failed to load new arrivals."
        action={refetchNewArrivalsProducts}
      />
    );
  }

  if (fetchingNewArrivalsProducts) {
    return (
      <div className="lg:px-8 xl:px-14 px-4 space-y-5">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
          {Array.from({ length }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    newArrivalsProducts.length > 0 && (
      <div className="lg:px-8 xl:px-14 px-4 space-y-5">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-base lg:text-[32px]">New Arrivals</h1>
          <Button
            variant="secondary"
            disabled={fetchingNewArrivalsProducts}
            className="rounded-full font-medium disabled:cursor-wait"
          >
            More Products{" "}
            <ChevronRightIcon className="w-5 h-5 hidden lg:block" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {newArrivalsProducts.slice(0, length).map((product) => (
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
              rating={5}
              discount={
                product.productColors[0].productPriceDetails[0].discount
              }
              imageUrl={product.productUrl}
              kaigloSale={product.kaigloSale as string}
              sales={product.sales}
              sold={product.sold}
              featured={product.featured}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default NewArrivalsProducts;
