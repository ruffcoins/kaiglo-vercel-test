"use client";

import Loader from "../shared/Loader";
import ProductCard from "./ProductCard";
import { useEffect, useRef, useState } from "react";
import { useFilterProducts } from "@/hooks/queries/products/filterProducts";
import { useInView } from "react-intersection-observer";
import ProductCardSkeleton from "../shared/ProductCardSkeleton";
import ErrorComponent from "../shared/ErrorComponent";
import Image from "next/image";
import OrderBox from "@/public/images/order-box.svg";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { useProductCategoryDetail } from "@/hooks/queries/products/productCategoryDetail";
import { Input } from "../ui/input";
import Search from "@/public/images/search.svg";
import MobileFilterComponent from "../shared/MobileFilterComponent";
import { useSearchProducts } from "@/hooks/queries/products/searchProducts";
import { v4 as uuidv4 } from "uuid";
import { debounce } from "lodash";

const MobileSearchPage = () => {
  const searchParams = useSearchParams();
  const searchTermParam = searchParams.get("searchTerm") || "";
  const [openFilter, setOpenFilter] = useState(false);

  const { ref, inView } = useInView();

  // ---------------------------------------------------------------------------
  const [searchTerm, setSearchTerm] = useState("");
  const { products, isFetching } = useSearchProducts(searchTerm);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [recentSearches, setRecentSearches] = useState<
    Array<{ id: string; term: string }>
  >([]);
  const resultsRef = useRef<HTMLDivElement>(null);

  //----------------------------------------------------------------------------

  const [openSortDropdown, setOpenSortDropdown] = useState(false);
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [category, setCategory] = useState("");
  const [brands, setBrands] = useState<string[]>([]);
  const [productColorNames, setProductColorNames] = useState<string[]>([]);
  const [productSales, setProductSales] = useState<string[]>([]);
  const [productShipping, setProductShipping] = useState<string[]>([]);
  const [productSizes, setProductSizes] = useState<string[]>([]);
  const [kaigloSale, setKaigloSale] = useState("");
  const [name, setName] = useState(searchTerm);
  // const [subCategory, setSubCategory] = useState("");
  // const [secondSubCategory, setSecondSubCategory] = useState("");
  // const [ramSizes, setRamSizes] = useState<string[]>([]);
  const [sort, setSort] = useState("Default Sorting");
  // const [storages, setStorages] = useState<string[]>([]);

  const [categoryToFilterBy, setCategoryToFilterBy] = useState("");

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
        message="Failed to load products."
        action={refetchFilterProducts}
      />
    );
  }

  useEffect(() => {
    if (filterProducts.length > 0) {
      setCategoryToFilterBy(filterProducts[0].category);
    }
  }, [filterProducts]);

  const { productCategoryDetail } =
    useProductCategoryDetail(categoryToFilterBy);

  const router = useRouter();

  // ---------------------------------------------------------------------------

  useEffect(() => {
    setName(searchTermParam);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setIsResultsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [resultsRef]);

  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setName(e.target.value);
    setIsResultsVisible(true);
  };

  const handleSearch = (term: string) => {
    if (term.trim() !== "") {
      setSearchTerm(term);
      setRecentSearches((prevSearches) => {
        const newSearch = { id: uuidv4(), term };
        const updatedSearches = [newSearch, ...prevSearches];
        const limitedSearches = updatedSearches.slice(0, 3);
        localStorage.setItem("recentSearches", JSON.stringify(limitedSearches));
        return limitedSearches;
      });
    }
  };

  const debouncedHandleSearch = debounce(() => handleSearch(searchTerm), 2000);

  useEffect(() => {
    debouncedHandleSearch();
    return () => {
      debouncedHandleSearch.cancel();
    };
  }, [searchTerm]);

  const removeItemFromSearchHistory = (id: string) => {
    setRecentSearches((prevSearches) =>
      prevSearches.filter((item) => item.id !== id),
    );
  };

  const clearSearchHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return openFilter ? (
    <MobileFilterComponent
      min={minPrice}
      max={maxPrice}
      products={filterProducts}
      category={category}
      brand={brands[0]}
      brands={productCategoryDetail?.brands || []}
      productColorName={productColorNames[0]}
      productColorNames={
        productCategoryDetail?.productColorCode.map((color) => color.color) ||
        []
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
      setOpenFilter={setOpenFilter}
    />
  ) : (
    <div className="lg:hidden">
      <div className="h-16 bg-white w-full flex items-center space-x-4 px-5 py-2 fixed top-0 z-10">
        <ChevronLeftIcon
          className="w-8 h-8 cursor-pointer"
          onClick={() => router.back()}
        />
        <Button
          variant="outline"
          className="absolute w-8 h-8 p-0 rounded-full left-[52px] border-0"
        >
          <Image
            src={Search}
            alt="search icon"
            className="w-4 h-4 opacity-50"
            width={16}
            height={16}
          />
        </Button>
        <Input
          className="rounded-full w-full border pl-10 border-kaiglo_grey-disabled text-sm h-11"
          placeholder="Search products, brands..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <MixerHorizontalIcon
          className="w-8 h-8"
          onClick={() => setOpenFilter(true)}
        />
      </div>
      <div className="grid grid-cols-12 px-4">
        {status === "loading" || isRefetching ? (
          <div className="col-span-12 grid grid-cols-2 md:grid-cols-3 gap-5 my-14 ">
            {Array.from({ length: 3 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : filterProducts.length > 0 ? (
          <div className="col-span-12 my-14">
            <div className="space-y-2 mt-4">
              <p className="font-medium">{totalProducts} products found</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
          <div className="h-[calc(100vh-24rem)] col-span-12 flex flex-col items-center justify-center space-y-4">
            <Image
              src={OrderBox}
              alt="order box"
              className="w-14 h-14 opacity-50"
              width={56}
              height={56}
            />
            <p className="font-bold">No filter results</p>
            <p className="text-center">
              Try changing the brand, colour, size, or sort by
            </p>
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
                setName(searchTerm);
                refetchFilterProducts();
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
export default MobileSearchPage;
