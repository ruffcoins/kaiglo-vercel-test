"use client";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import ErrorComponent from "@/components//shared/ErrorComponent";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import { useFilterProducts } from "@/hooks/queries/products/filterProducts";
import { capitalizeFirstLetterOfEachWord } from "@/lib/utils";
import { useRouter } from "next/navigation";

const CategoryProductsIntroduction = ({
  category,
  subCategory,
}: {
  category: string;
  subCategory: string;
}) => {
  const router = useRouter();
  const filters = {
    category: decodeURIComponent(category),
    subCategory,
  };

  const {
    filterProducts,
    refetchFilterProducts,
    isRefetching,
    error,
    isFetching,
  } = useFilterProducts(filters, 6);

  if (error) {
    return (
      <ErrorComponent
        message="Failed to load top selling products."
        action={refetchFilterProducts}
      />
    );
  }

  if (isFetching && !isRefetching) {
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
    filterProducts?.length > 0 && (
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-base lg:text-[32px]">
            {capitalizeFirstLetterOfEachWord(subCategory)}
          </h1>
          <Button
            variant="secondary"
            disabled={isFetching}
            className="rounded-full font-medium disabled:cursor-wait text-sm lg:text-base"
            onClick={() => router.push(`/category/${category}/${subCategory}`)}
          >
            More Products{" "}
            <ChevronRightIcon className="w-5 h-5 hidden lg:block" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {filterProducts.map((product) => (
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
              productViews={product.productViews}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default CategoryProductsIntroduction;
