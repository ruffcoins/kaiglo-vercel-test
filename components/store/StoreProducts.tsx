"use client";

import ErrorComponent from "@/components/shared/ErrorComponent";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ProductCard from "../product/ProductCard";
import Loader from "../shared/Loader";
import ProductCardSkeleton from "../shared/ProductCardSkeleton";
import useProductRowLength from "@/hooks/useProductRowLength";
import { useGetStoreProducts } from "@/hooks/queries/store/getStoreProducts";
import { useGetStoreDetails } from "@/hooks/queries/store/getStoreDetails";
import dynamic from "next/dynamic";
import { useProductCategoryDetail } from "@/hooks/queries/products/productCategoryDetail";

const FilterComponent = dynamic(
  () => import("@/components/shared/FilterComponent"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-[200px] w-screen border">
        <Loader />
      </div>
    ),
  },
);

const StoreProducts = ({ storeName }: { storeName: string }) => {
  const { storeProductsLength } = useProductRowLength();
  const { store } = useGetStoreDetails(storeName);
  const {
    storeProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetchStoreProducts,
  } = useGetStoreProducts(store?.id as string);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [brands, setBrands] = useState<string[]>([]);
  const [kaigloSale, setKaigloSale] = useState("");
  const [name, setName] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [secondSubCategory, setSecondSubCategory] = useState("");
  const [productColorNames, setProductColorNames] = useState<string[]>([]);
  const [productSales, setProductSales] = useState<string[]>([]);
  const [productShipping, setProductShipping] = useState<string[]>([]);
  const [productSizes, setProductSizes] = useState<string[]>([]);
  const [ramSizes, setRamSizes] = useState<string[]>([]);
  const [sort, setSort] = useState("");
  const [storages, setStorages] = useState<string[]>([]);

  const filters = {
    minPrice,
    maxPrice,
    category,
    brands,
    kaigloSale,
    name,
    subCategory,
    secondSubCategory,
    productColorNames,
    productSales,
    productShipping,
    productSizes,
    ramSizes,
    sort,
    storages,
  };

  const [categoryToFilterBy, setCategoryToFilterBy] = useState("");

  useEffect(() => {
    if (storeProducts && storeProducts.length > 0) {
      setCategoryToFilterBy(storeProducts[0].category);
    }
  }, [storeProducts]);

  const { productCategoryDetail } =
    useProductCategoryDetail(categoryToFilterBy);

  if (status === "loading") {
    return (
      <div className="px-4 space-y-5 lg:px-8">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {Array.from({ length: storeProductsLength }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <ErrorComponent
        message="Failed to load store products."
        action={refetchStoreProducts}
      />
    );
  }

  return (
    <div className="grid grid-cols-12 mx-4 lg:mx-8 gap-x-5">
      <div className="h-20 lg:block hidden lg:col-span-3 col-span-12 rounded-lg">
        <FilterComponent
          min={1000}
          max={1000000}
          products={storeProducts}
          category={category}
          brand={brands[0]}
          brands={productCategoryDetail?.brands || []}
          productColorName={productColorNames[0]}
          productColorNames={
            productCategoryDetail?.productColorCode.map(
              (color) => color.color,
            ) || []
          }
          productSize={productSizes[0]}
          productSizes={[]}
          productShipping={productShipping[0]}
          productSale={productSales[0]}
          productSales={productCategoryDetail?.sales || []}
          setCategory={setCategory}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          setBrands={setBrands}
          setProductColorNames={setProductColorNames}
          setProductSizes={setProductSizes}
          setProductShipping={setProductShipping}
          setProductSales={setProductSales}
          name={name}
          setName={setName}
          setSort={setSort}
          setKaigloSale={setKaigloSale}
        />
      </div>
      <div className="lg:col-span-9 col-span-12">
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {storeProducts.map((product) => (
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
                productViews={product?.productViews}
              />
            ))}
          </div>

          {isFetchingNextPage && (
            <div className="flex items-center justify-center h-40">
              <Loader />
            </div>
          )}
          <div ref={ref}>
            {/* This empty div acts as a sentinel for the IntersectionObserver */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProducts;
