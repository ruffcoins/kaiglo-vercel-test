"use client";

import React, {
  useState,
  useCallback,
  useMemo,
  Dispatch,
  SetStateAction,
  Fragment,
  useEffect,
} from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  capitalizeFirstLetterOfEachWord,
  createSlug,
  truncate,
} from "@/lib/utils";
import useGetAllCategories from "@/hooks/queries/category/getAllCategories";
import Image from "next/image";
import ArrowRightIcon from "@/public/images/arrow-right.svg";
import MenuSquare from "@/public/images/menu-square.svg";
import { CategoryView } from "@/interfaces/responses/allCategory.interface";
import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { postRequest } from "@/utils/apiCaller";
import { IPaginatedProductResponse } from "@/interfaces/responses/product.interface";
import Link from "next/link";

const MegaMenu: React.FC = () => {
  const { allCategories } = useGetAllCategories();
  const initialTab = allCategories?.[0]?.id || "";
  const [currentTab, setCurrentTab] = useState<string | undefined>(initialTab);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [secondSubCategory, setSecondSubCategory] = useState("");

  const handleMouseEnter = useCallback((id: string) => {
    setCurrentTab(id);
  }, []);

  const memoizedCategories = useMemo(
    () => allCategories?.slice(0, 6) ?? [],
    [allCategories],
  );

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {memoizedCategories?.map((item) => (
          <NavigationMenuItem className="relative" key={item.id}>
            <NavigationMenuTrigger
              className="py-2.5 px-2.5 2xl:px-4 cursor-pointer hover:bg-kaiglo_grey-100 transition-colors duration-300 rounded-full text-sm font-normal normal-case"
              onMouseEnter={() => handleMouseEnter(item.id)}
              onClick={() => handleMouseEnter(item.id)}
            >
              {capitalizeFirstLetterOfEachWord(item.name)}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-screen">
              <CategoriesNavigationContent
                tabs={allCategories || []}
                currentTab={currentTab as string}
                setCurrentTab={
                  setCurrentTab as Dispatch<SetStateAction<string>>
                }
                category={category}
                setCategory={setCategory}
                subCategory={subCategory}
                setSubCategory={setSubCategory}
                secondSubCategory={secondSubCategory}
                setSecondSubCategory={setSecondSubCategory}
              />
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

// export default MegaMenu;

const CategoriesNavigationContent: React.FC<{
  tabs: CategoryView[];
  currentTab: string;
  setCurrentTab: React.Dispatch<SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<SetStateAction<string>>;
  subCategory: string;
  setSubCategory: React.Dispatch<SetStateAction<string>>;
  secondSubCategory: string;
  setSecondSubCategory: React.Dispatch<SetStateAction<string>>;
}> = React.memo(
  ({
    tabs,
    currentTab,
    setCurrentTab,
    category,
    setCategory,
    subCategory,
    setSubCategory,
    secondSubCategory,
    setSecondSubCategory,
  }) => {
    const [subSubCategoriesList, setSubSubCategoriesList] = useState<string[]>(
      [],
    );
    const router = useRouter();

    const filters = useMemo(
      () => ({
        category,
        subCategory,
        secondSubCategory,
      }),
      [category, subCategory, secondSubCategory],
    );

    const currentCategory = useMemo(
      () => tabs.find((tab) => tab.id === currentTab),
      [tabs, currentTab],
    );
    const [currentSubCategory, setCurrentSubCategory] = useState(
      currentCategory?.category?.[0]?.name,
    );

    const handleMouseEnterSubCategory = useCallback((name: string) => {
      setCurrentSubCategory(name);
      setSubCategory(name);
    }, []);

    useEffect(() => {
      const subCategory = currentCategory?.category?.find(
        (subCategory) => subCategory.name === currentSubCategory,
      );
      if (subCategory?.category?.length) {
        setSecondSubCategory(subCategory.category[0].name);
      }
    }, [currentSubCategory, currentCategory]);

    useEffect(() => {
      console.log(subSubCategoriesList);
    }, [subSubCategoriesList]);

    const queries = useQueries({
      queries: subSubCategoriesList.map((subSubCategory) => ({
        queryKey: [
          "sub-sub-category-products",
          {
            currentCategory: currentCategory?.name,
            subCategory: currentSubCategory,
            subSubCategory,
          },
        ],
        queryFn: () =>
          postRequest({
            url: `product/filter/${0}/?size=3`,
            payload: {
              category: currentCategory?.name,
              subCategory: currentSubCategory,
              secondSubCategory: subSubCategory,
            },
          }),
        enabled: !!(currentCategory && currentSubCategory && subSubCategory),
      })),
    }) as UseQueryResult<IPaginatedProductResponse>[];

    const isLoading = queries.some((query) => query.isLoading);
    const isError = queries.some((query) => query.isError);
    const data: IPaginatedProductResponse[] = queries.map(
      (query) => query.data as IPaginatedProductResponse,
    );

    useEffect(() => {
      console.log("currentCategory", currentCategory?.name);
      console.log("currentSubCategory", currentSubCategory);
      !isLoading && console.log("data", data);
      console.log("queries", queries[0]);
    }, [currentSubCategory, currentCategory]);

    return (
      <div className="h-[432px] px-8 xl:px-14 lg:py-6 xl:py-12 w-screen grid lg:grid-cols-4 xl:grid-cols-5 gap-x-8">
        {/* Column One */}
        <div className="h-[350px]">
          {tabs.slice(0, 7).map((tab) => (
            <ul className="text-kaiglo_grey-700" key={tab.id}>
              <li
                key={tab.id}
                className={`${currentTab === tab.id ? "bg-kaiglo_grey-100" : ""} flex items-center justify-between p-3 text-base font-medium hover:bg-kaiglo_grey-100 cursor-pointer rounded-lg transition-all duration-200 ease-in-out`}
                onMouseEnter={() => {
                  setCurrentTab(tab.id);
                  setCategory(tab.name);
                }}
                onClick={() => {
                  setCurrentTab(tab.id);
                  setCategory(tab.name);
                }}
              >
                <span>{tab.name}</span>
                <span>
                  <Image
                    src={ArrowRightIcon}
                    alt="arrow right"
                    className="w-5 h-5"
                    width={20}
                    height={20}
                  />
                </span>
              </li>
            </ul>
          ))}
        </div>

        <div className="lg:col-span-3 xl:col-span-4 grid lg:grid-cols-2 xl:grid-cols-3 gap-x-8">
          {/* Column Two */}
          <div className="border-x-[1px] space-y-6 overflow-y-auto h-[350px]">
            <p className="font-medium text-sm px-8 uppercase">
              Shop by category
            </p>

            <div className="grid grid-cols-3 gap-3">
              {currentCategory?.category?.map((subCategory) => (
                <div
                  className="flex flex-col items-center mb-4 cursor-pointer"
                  key={subCategory?.name}
                  onMouseEnter={() => {
                    handleMouseEnterSubCategory(subCategory?.name);
                    setSubSubCategoriesList([]);
                    subCategory.category.forEach((category) => {
                      setSubSubCategoriesList((prev) => [
                        ...prev,
                        category.name,
                      ]);
                    });
                  }}
                  onClick={() =>
                    router.push(
                      `/category/${currentCategory.name}/${subCategory?.name}`,
                    )
                  }
                >
                  <Image
                    src={subCategory?.productUrl as string}
                    alt={subCategory.name}
                    width={72}
                    height={72}
                    className="rounded-full w-[72px] h-[72px] bg-kaiglo_grey-100"
                  />
                  <p className="text-sm text-center text-kaiglo_grey-700 mt-1">
                    {subCategory.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column Three */}
          <div className="space-y-6 overflow-y-auto h-[350px]">
            {subSubCategoriesList.map((subSubCategory, index) => (
              <Fragment key={subSubCategory}>
                <p className="font-medium text-sm uppercase">
                  {subSubCategory}
                </p>

                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center space-y-2">
                    <Link
                      href={`/category/${currentCategory?.name}/${currentSubCategory}/${subSubCategory}`}
                      className="min-w-20 min-h-20 flex items-center justify-center rounded-full bg-gray-100"
                    >
                      <Image
                        src={MenuSquare}
                        alt={"Category Menu"}
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    </Link>

                    <p>View All</p>
                  </div>

                  {(queries[index]?.data?.content ?? []) &&
                    (queries[index]?.data?.content ?? []).length > 0 && (
                      <div className="grid grid-cols-2 gap-x-8">
                        {queries[index]?.data?.content
                          .slice(0, 2)
                          .map((product) => {
                            if (!product || !product.id) return null;
                            return (
                              <Link
                                href={`/product/${createSlug(product.name)}/${product.id}`}
                                key={product.id}
                                className="flex flex-col items-center cursor-pointer"
                              >
                                <Image
                                  src={
                                    product.productUrl ||
                                    "/placeholder-image.jpg"
                                  }
                                  alt={product.name || "Product image"}
                                  width={80}
                                  height={80}
                                  className="rounded-full min-h-20 max-h-20 min-w-20 max-w-20 bg-kaiglo_grey-100 object-cover"
                                />
                                <p className="text-sm text-center text-kaiglo_grey-700 mt-1 line-clamp-2">
                                  {product.name
                                    ? truncate(product.name, 10)
                                    : "Unnamed product"}
                                </p>
                              </Link>
                            );
                          })}
                      </div>
                    )}
                </div>

                {queries[index]?.isLoading ? (
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-full bg-gray-100 animate-pulse"></div>
                    <div className="w-20 h-20 rounded-full bg-gray-100 animate-pulse"></div>
                    <div className="w-20 h-20 rounded-full bg-gray-100 animate-pulse"></div>
                    <div className="w-20 h-20 rounded-full bg-gray-100 animate-pulse"></div>
                  </div>
                ) : queries[index].isError ? (
                  <p>Error loading products for {subSubCategory}</p>
                ) : (
                  // queries[index] && queries[index].data.content.length > 0 && (
                  //   queries[index]?.data.content.map((item, itemIndex) => {
                  //     <Fragment key={itemIndex}>
                  //       {item.name}
                  //     </Fragment>
                  // if (Array.isArray(item.content)) {
                  //   return (
                  //     <Fragment key={itemIndex}>
                  //       {item.content.map((product, productIndex) => (
                  //         <div key={`${product.id}-${productIndex}`}>{product.name}</div>
                  //       ))}
                  //     </Fragment>
                  //   );
                  // }
                  //   return null;
                  // })
                  // )
                  <></>
                )}
                {/* {!isLoading && (
                  data.length > 0 &&
                  data.map((item, index) => {
                    if (Array.isArray(item.content)) {
                      return (
                        <>
                          {item.content.map((product, productIndex) => (
                            <div key={`${product.id}-${productIndex}`}>{product.name}</div>
                          ))}
                        </>
                      );
                    }
                    return null;
                  })
                )} */}
              </Fragment>
            ))}
          </div>

          {/* <div className="space-y-6 overflow-y-auto h-[350px]">
            {currentCategory?.category
              ?.find((subCategory) => subCategory.name === currentSubCategory)
              ?.category?.map((subSubCategory) => (
                <Fragment key={subSubCategory?.name}>
                  <p className="font-medium text-sm uppercase">
                    {subSubCategory.name}
                  </p>

                  <div className="grid grid-cols-4 justify-center gap-3">
                    <div className="flex flex-col items-center">
                      <Link
                        href={subSubCategory.productUrl || "#"}
                        className="w-[72px] h-[72px] bg-kaiglo_grey-100 rounded-full flex justify-center items-center"
                      >
                        <Image
                          src={CategoryMenuIcon}
                          alt={"Category Menu"}
                          width={32}
                          height={32}
                          className="w-8 h-8"
                        />
                      </Link>

                      <p className="text-sm text-kaiglo_grey-700 mt-1">
                        View all
                      </p>
                    </div>


                    {subSubCategory?.category?.map((item) => (
                      <div
                        className="flex flex-col items-center mb-4"
                        key={item.name}
                      >
                        <Image
                          src={item?.productUrl as string}
                          alt={item.name}
                          width={72}
                          height={72}
                          className="rounded-full w-[72px] h-[72px] bg-kaiglo_grey-100"
                        />
                        <p className="text-sm text-kaiglo_grey-700 mt-1">
                          {item.name}
                        </p>
                      </div>
                    ))}

                  </div>
                </Fragment>
              ))}
            <p className="font-medium text-sm px-8 uppercase"></p>
          </div> */}

          <div className="hidden xl:block"></div>
        </div>
      </div>
    );
  },
);

export default MegaMenu;
