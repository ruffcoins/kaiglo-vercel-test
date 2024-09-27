"use client";

import Image from "next/image";
// import Banner from '@/public/images/Group_Buy_Banner.png'
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Breadcrumb from "../shared/Breadcrumb";
import ArrowLeft from "@/public/images/arrow-left.svg";
import { useRouter } from "next/navigation";
import { cn, sortOptions } from "@/lib/utils";
import ErrorComponent from "../shared/ErrorComponent";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import FilterComponent from "../shared/FilterComponent";
import ProductCardSkeleton from "../shared/ProductCardSkeleton";
import ProductCard from "../product/ProductCard";
import Loader from "../shared/Loader";
import { Button } from "../ui/button";
import OrderBox from "@/public/images/order-box.svg";
import { useFeaturedProducts } from "@/hooks/queries/products/featuredProducts";
import { useProductCategoryDetail } from "@/hooks/queries/products/productCategoryDetail";

const Introduction = () => {
  const router = useRouter();

  const {
    featuredProducts,
    refetchFeaturedProducts,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    status,
    isRefetching,
    totalProducts,
  } = useFeaturedProducts();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Featured Products" },
  ];

  const getSortLabel = (value: string) => {
    return sortOptions.find((option) => option.value === value)?.label;
  };

  const { ref, inView } = useInView();

  const [openSortDropdown, setOpenSortDropdown] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [brands, setBrands] = useState<string[]>([]);
  const [productColorNames, setProductColorNames] = useState<string[]>([]);
  const [productSales, setProductSales] = useState<string[]>([]);
  const [productShipping, setProductShipping] = useState<string[]>([]);
  const [productSizes, setProductSizes] = useState<string[]>([]);
  const [kaigloSale, setKaigloSale] = useState("");
  const [name, setName] = useState("");
  // const [subCategory, setSubCategory] = useState("");
  // const [secondSubCategory, setSecondSubCategory] = useState("");
  // const [ramSizes, setRamSizes] = useState<string[]>([]);
  const [sort, setSort] = useState("Default Sorting");
  // const [storages, setStorages] = useState<string[]>([]);

  const filters = {
    minPrice,
    maxPrice,
    category,
    brands,
    productColorNames,
    productSales,
    productShipping,
    productSizes,
    kaigloSale,
    name,
    // subCategory,
    // secondSubCategory,
    // ramSizes,
    sort,
    // storages,
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    refetchFeaturedProducts();
  }, [
    minPrice,
    maxPrice,
    category,
    brands,
    productColorNames,
    productSales,
    productShipping,
    productSizes,
    name,
    sort,
    kaigloSale,
    refetchFeaturedProducts,
  ]);

  if (status === "error") {
    return (
      <ErrorComponent
        message="Failed to load group buy products."
        action={refetchFeaturedProducts}
      />
    );
  }

  const [categoryToFilterBy, setCategoryToFilterBy] = useState("");

  useEffect(() => {
    if (featuredProducts.length > 0) {
      setCategoryToFilterBy(featuredProducts[0].category);
    }
  }, [featuredProducts]);

  const { productCategoryDetail } =
    useProductCategoryDetail(categoryToFilterBy);

  return (
    <div className="lg:mx-8 rounded-lg space-y-4 lg:mt-10 lg:mb-4 mt-16">
      {/* <Image
        src={Banner}
        alt="Group Buy Banner"
        className="h-72 rounded-lg w-full object-cover"
        height={272}
        width={1440}
      /> */}
      <div className="h-[72px] bg-white rounded-lg lg:p-4 flex mx-1 lg:mx-0 items-center justify-between">
        <div className="flex items-center lg:space-x-6">
          <Image
            src={ArrowLeft}
            alt="arrow left"
            className="w-6 h-6 cursor-pointer hidden lg:block"
            onClick={() => router.back}
          />
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="lg:flex items-center space-x-4 relative hidden">
          <p className="text-sm text-kaiglo_grey-placeholder font-medium">
            {totalProducts} products found
          </p>

          <>
            <div
              className="w-52 justify-between border rounded-lg h-10 flex items-center px-2 relative cursor-pointer"
              onClick={() => setOpenSortDropdown((prev) => !prev)}
            >
              <p className="font-medium">
                {getSortLabel(sort) || "Default Sorting"}
              </p>
              <ChevronDownIcon
                className={cn(
                  "w-6 h-6 text-kaiglo_grey-placeholder",
                  openSortDropdown && "rotate-180",
                )}
              />
            </div>

            {openSortDropdown && (
              <div className="absolute w-56 p-4 z-10 top-11 rounded-lg right-0 border bg-white">
                {sortOptions.map((option) => (
                  <p
                    key={option.value}
                    className="font-medium py-2 cursor-pointer hover:bg-kaiglo_grey-100"
                    onClick={() => {
                      setSort(option.value);
                      setOpenSortDropdown(false);
                    }}
                  >
                    {option.label}
                  </p>
                ))}
              </div>
            )}
          </>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 grid-cols-2 lg:gap-x-5">
        <div className="h-20 col-span-3 rounded-lg lg:block hidden">
          <FilterComponent
            min={1000}
            max={1000000}
            products={featuredProducts}
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
        {status === "loading" || isRefetching ? (
          <div className="lg:col-span-9 col-span-2 grid lg:grid-cols-4 grid-cols-2 lg:gap-5 gap-4 mx-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="lg:col-span-9 col-span-full mx-4">
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
                {featuredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
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
        ) : (
          <div className="h-[calc(100vh-8rem)] col-span-9 flex flex-col items-center justify-center space-y-4">
            <Image
              src={OrderBox}
              alt="order box"
              className="w-14 h-14 opacity-50"
              width={56}
              height={56}
            />
            <p className="font-bold">No filter results</p>
            <p>Try changing the brand, colour, size, or sort by</p>
            <Button
              variant="secondary"
              className="w-48 font-medium rounded-lg"
              onClick={() => {
                setMinPrice(1000);
                setMaxPrice(1000000);
                setCategory("");
                setBrands([]);
                setProductColorNames([]);
                setProductSizes([]);
                setProductShipping([]);
                setProductSales([]);
                setName("");
                setSort("");
                refetchFeaturedProducts();
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Introduction;
