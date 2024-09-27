"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Search from "@/public/images/search-white.svg";
import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { createSlug } from "@/lib/utils";
import { debounce } from "lodash";
import OrderBox from "@/public/images/empty-state-order-box.svg";
import Loader from "../shared/Loader";
import { useSearchStore } from "@/hooks/queries/store/searchStoreProducts";
import { useGetStoreDetails } from "@/hooks/queries/store/getStoreDetails";

const StoreSearch = ({ storeName }: { storeName: string }) => {
  const { store } = useGetStoreDetails(storeName);
  const [searchTerm, setSearchTerm] = useState("");
  const { products, isFetchingProducts } = useSearchStore(
    searchTerm,
    store?.id as string,
  );
  const [isResultsVisible, setIsResultsVisible] = useState(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsResultsVisible(true);
  };

  const handleSearch = (term: string) => {
    if (term.trim() !== "") {
      setSearchTerm(term);
    }
  };

  const debouncedHandleSearch = debounce(() => handleSearch(searchTerm), 2000);

  useEffect(() => {
    debouncedHandleSearch();
    return () => {
      debouncedHandleSearch.cancel();
    };
  }, [searchTerm]);

  return (
    <div className="">
      <div className="relative flex items-center w-96">
        <Input
          className="h-12 px-6 text-sm rounded-full"
          placeholder="Search store"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <Button
          variant="primary"
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
          className="absolute max-h-[650px] w-[900px] overflow-hidden bg-white shadow-lg z-20"
        >
          {isFetchingProducts ? (
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
                              src={result.productUrl}
                              alt={result.name}
                              className="w-14 h-14 rounded-lg"
                              width={56}
                              height={56}
                            />
                            <span>{result.name}</span>
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
export default StoreSearch;
