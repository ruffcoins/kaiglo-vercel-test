"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchProducts } from "@/hooks/queries/products/searchProducts";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Search from "@/public/images/search.svg";
import Loader from "../Loader";
import Link from "next/link";
import { ChevronRightIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { cn, createSlug, truncate } from "@/lib/utils";
import { debounce } from "lodash";
import { v4 as uuidv4 } from "uuid";
import OrderBox from "@/public/images/empty-state-order-box.svg";

const GlobalSearch = ({
  customTopClassname,
}: {
  customTopClassname?: string;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { products, isFetching } = useSearchProducts(searchTerm);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [recentSearches, setRecentSearches] = useState<
    Array<{ id: string; term: string }>
  >([]);
  const resultsRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="w-full relative">
      <div className="relative flex items-center w-full">
        <Input
          className="h-12 px-6 text-sm rounded-full"
          placeholder="Search for products"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <Button
          variant="accent"
          className="absolute w-8 h-8 p-0 rounded-full right-2"
        >
          <Image
            src={Search}
            alt="search icon"
            className="w-4 h-4"
            width={16}
            height={16}
          />
        </Button>
      </div>

      {isResultsVisible && (
        <div
          ref={resultsRef}
          className={cn(
            "fixed min-h-[calc(100vh-8rem)] lg:max-h-[650px] lg:top-auto overflow-y-scroll left-0 right-0 lg:overflow-hidden w-full bg-white shadow-lg z-20 lg:mt-6 mt-4",
          )}
        >
          {recentSearches.length > 0 && (
            <div className="">
              <div className="flex justify-between items-center bg-kaiglo_grey-100 py-3 px-6">
                <p className="font-medium text-sm">Search History</p>
                <Button
                  variant="critical"
                  className="bg-transparent font-medium"
                  onClick={() => {
                    clearSearchHistory();
                    setIsResultsVisible(false);
                  }}
                >
                  Clear
                </Button>
              </div>
              {recentSearches.slice(0, 3).map((search) => (
                <li
                  key={search.id}
                  className="flex items-center justify-between py-3 px-6 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSearch(search.term)}
                >
                  <span className="flex items-start space-x-2">
                    <span className="capitalize">{search.term}</span>
                  </span>

                  <CrossCircledIcon
                    className="w-4 h-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItemFromSearchHistory(search.id);
                    }}
                  />
                </li>
              ))}
            </div>
          )}
          {isFetching ? (
            <div className="flex justify-center items-center py-4 h-40">
              <Loader classNames="w-10 h-10" />
            </div>
          ) : (
            <>
              {products && products.length > 0 ? (
                <>
                  <div className="flex justify-between items-center bg-kaiglo_grey-100 py-3 px-6">
                    <p className="font-medium text-sm">
                      Showing {products.length} Search Result(s)
                    </p>
                    <Link href={`/product/search?searchTerm=${searchTerm}`}>
                      <Button
                        variant="info"
                        className="bg-transparent font-medium"
                        onClick={() => setIsResultsVisible(false)}
                      >
                        View All
                      </Button>
                    </Link>
                  </div>
                  <ul className="space-y-6">
                    {products.slice(0, 4).map((result) => (
                      <Link
                        href={`/product/${createSlug(result.name)}/${result.id}`}
                        key={result.id}
                      >
                        <li className="flex items-center justify-between py-3 px-6 hover:bg-gray-100 cursor-pointer">
                          <span className="flex items-start space-x-2">
                            <Image
                              src={result?.productViews[0].productUrl}
                              alt={result.name}
                              className="w-14 h-14 rounded-lg"
                              width={56}
                              height={56}
                            />
                            <span className="hidden lg:block">
                              {result.name}
                            </span>
                            <span className="text-sm lg:hidden">
                              {truncate(result.name, 80)}
                            </span>
                          </span>

                          <ChevronRightIcon className="w-4 h-4" />
                        </li>
                      </Link>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="flex flex-col justify-center items-center py-4 h-40 space-y-6">
                  <Image
                    src={OrderBox}
                    alt="order box"
                    className="w-14 h-14"
                    width={56}
                    height={56}
                  />
                  <p className="text-gray-500">No products found</p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default GlobalSearch;
