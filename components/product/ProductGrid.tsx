import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import { IProduct } from "@/interfaces/product.interface";
import { Suspense, lazy } from "react";

const ProductCard = lazy(() => import("@/components/product/ProductCard"));

interface ProductGridProps {
  products: IProduct[] | undefined;
  isLoading: boolean;
  isPaused: boolean;
  numberOfProducts?: number;
}

const ProductGrid = ({
  numberOfProducts,
  isLoading,
  isPaused,
  products,
}: ProductGridProps) => {
  if (isLoading || isPaused) {
    return (
      <>
        {Array.from({ length: numberOfProducts || 0 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </>
    );
  }

  return (
    <>
      {products?.slice(0, numberOfProducts)?.map((product, index) => (
        <Suspense key={index} fallback={<ProductCardSkeleton />}>
          <ProductCard
            id={product.id}
            sales={product.sales}
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
            imageUrl={product.productUrl}
            sold={product.sold}
            category={product.category}
            discount={product.productColors[0].productPriceDetails[0].discount}
            kaigloSale={product.kaigloSale as string}
            featured={product.featured}
            productViews={product.productViews}
          />
        </Suspense>
      ))}
    </>
  );
};

export default ProductGrid;
