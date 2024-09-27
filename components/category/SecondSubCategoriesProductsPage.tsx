"use client";

import FilterComponent from "../shared/FilterComponent";
import Loader from "../shared/Loader";
// import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { useFilterProducts } from "@/hooks/queries/products/filterProducts";
import { useInView } from "react-intersection-observer";
import ProductCardSkeleton from "../shared/ProductCardSkeleton";
import ErrorComponent from "../shared/ErrorComponent";
import Image from "next/image";
import OrderBox from "@/public/images/order-box.svg";
import { Button } from "../ui/button";
import ArrowLeft from "@/public/images/arrow-left.svg";
import Breadcrumb from "../shared/Breadcrumb";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { capitalizeFirstLetterOfEachWord, cn, sortOptions } from "@/lib/utils";
import { useProductCategoryDetail } from "@/hooks/queries/products/productCategoryDetail";
import ProductCard from "../product/ProductCard";

const SearchPage = ({
  Category,
  SubCategory,
  SecondSubCategory,
}: {
  Category: string;
  SubCategory: string;
  SecondSubCategory: string;
}) => {
  const router = useRouter();
  // const {
  //   filterProducts,
  //   refetchfilterProducts,
  //   isFetchingNextPage,
  //   fetchNextPage,
  //   hasNextPage,
  //   status,
  //   isRefetching,
  //   totalProducts,
  // } = usefilterProducts();

  const isMobile = window.innerWidth < 768;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    {
      label: isMobile
        ? "..."
        : capitalizeFirstLetterOfEachWord(decodeURIComponent(Category)),
      href: `/category/${Category}`,
    },
    {
      label: isMobile
        ? "..."
        : capitalizeFirstLetterOfEachWord(decodeURIComponent(SubCategory)),
      href: `/category/${Category}/${SubCategory}`,
    },
    {
      label: capitalizeFirstLetterOfEachWord(
        decodeURIComponent(SecondSubCategory),
      ),
    },
  ];

  const getSortLabel = (value: string) => {
    return sortOptions.find((option) => option.value === value)?.label;
  };

  const { ref, inView } = useInView();

  const [openSortDropdown, setOpenSortDropdown] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [category, setCategory] = useState(Category);
  const [brands, setBrands] = useState<string[]>([]);
  const [productColorNames, setProductColorNames] = useState<string[]>([]);
  const [productSales, setProductSales] = useState<string[]>([]);
  const [productShipping, setProductShipping] = useState<string[]>([]);
  const [productSizes, setProductSizes] = useState<string[]>([]);
  const [kaigloSale, setKaigloSale] = useState("");
  const [name, setName] = useState("");
  const [subCategory, setSubCategory] = useState(SubCategory);
  const [secondSubCategory, setSecondSubCategory] = useState("");
  // const [ramSizes, setRamSizes] = useState<string[]>([]);
  const [sort, setSort] = useState("Default Sorting");
  // const [storages, setStorages] = useState<string[]>([]);

  const filters = {
    minPrice,
    maxPrice,
    category: Category,
    brands,
    productColorNames,
    productSales,
    productShipping,
    productSizes,
    kaigloSale,
    name,
    subCategory: SubCategory,
    secondSubCategory: SecondSubCategory,
    // ramSizes,
    sort,
    // storages,
  };

  const {
    filterProducts,
    isFetchingNextPage,
    refetchFilterProducts,
    fetchNextPage,
    hasNextPage,
    status,
    isRefetching,
    totalProducts,
  } = useFilterProducts(filters, 15);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    refetchFilterProducts();
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
    refetchFilterProducts,
  ]);

  if (status === "error") {
    return (
      <ErrorComponent
        message="Failed to load group buy products."
        action={refetchFilterProducts}
      />
    );
  }

  const [categoryToFilterBy, setCategoryToFilterBy] = useState("");

  useEffect(() => {
    if (filterProducts.length > 0) {
      setCategoryToFilterBy(filterProducts[0].category);
    }
  }, [filterProducts]);

  const { productCategoryDetail } =
    useProductCategoryDetail(categoryToFilterBy);

  return (
    <>
      <div className="h-[72px] bg-white rounded-lg lg:p-4 mx-1 lg:mx-8 flex items-center justify-between">
        <div className="flex items-center lg:space-x-6 ">
          <Image
            src={ArrowLeft}
            alt="arrow left"
            className="w-6 h-6 cursor-pointer lg:block hidden"
            onClick={() => router.push("/")}
          />
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="lg:flex items-center space-x-4 hidden">
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
              <div className="absolute w-56 p-4 z-10 top-16 rounded-lg right-10 border bg-white">
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
      <div className="grid lg:grid-cols-12 grid-cols-2 lg:mx-8 mx-4 gap-x-5">
        <div className="h-20 col-span-3 rounded-lg lg:block hidden">
          <FilterComponent
            min={1000}
            max={1000000}
            products={filterProducts}
            category={category}
            subCategory={subCategory}
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
            setSubCategory={setSubCategory}
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
          <div className="lg:col-span-9 col-span-2 grid lg:grid-cols-4 grid-cols-2 lg:gap-5 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : filterProducts.length > 0 ? (
          <div className="lg:col-span-9 col-span-full">
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
                {filterProducts.map((product) => (
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
          <div className="h-[calc(100vh-24rem)] col-span-9 flex flex-col items-center justify-center space-y-4">
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
                setMinPrice(0);
                setMaxPrice(0);
                setCategory("");
                setBrands([]);
                setProductColorNames([]);
                setProductSizes([]);
                setProductShipping([]);
                setProductSales([]);
                setName("");
                refetchFilterProducts();
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
export default SearchPage;
