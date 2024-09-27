"use client";

import { categories } from "@/constants/categories";
import useGetCategories from "@/hooks/queries/homePage/getCategories";
import { capitalizeFirstLetterOfEachWord } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

const CategoryGrid = () => {
  const { homeCategories, fetchingHomeCategories } = useGetCategories();

  if (fetchingHomeCategories) {
    return (
      <div className="grid grid-cols-3 lg:grid-cols-6 justify-between gap-y-10 my-20 px-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-2 rounded-full"
          >
            <div className="relative w-20 h-20 lg:w-[150px] lg:h-[150px] bg-slate-300 animate-pulse rounded-full"></div>
            <h3 className="text-sm font-bold bg-slate-300 animate-pulse h-4 lg:w-40 w-20 rounded-md"></h3>
            <p className="text-kaiglo_grey-base text-[10px] bg-slate-300 animate-pulse h-4 lg:w-40 w-20 rounded-md"></p>
          </div>
        ))}
      </div>
    );
  }

  const getCategoryImage = (category: string) => {
    const categoryImage = categories.find(
      (cat) => cat.name.toLowerCase() === category.toLowerCase(),
    );
    return categoryImage?.image;
  };

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 justify-between gap-y-10 px-8">
      {homeCategories?.slice(0, 6).map((category, index) => (
        <Link
          href={`/category/${category.category}`}
          key={index}
          className="flex flex-col items-center text-center gap-y-1"
        >
          <div className="relative w-20 h-20 lg:w-40 lg:h-40">
            <Image
              src={
                getCategoryImage(
                  category.category.toLowerCase(),
                ) as StaticImageData
              }
              alt={category.category}
              fill
              className="object-fit rounded-full"
            />
          </div>
          <h3 className="text-sm font-bold">
            {capitalizeFirstLetterOfEachWord(category.category)}
          </h3>
          <p className="text-kaiglo_grey-base text-[10px]">
            {/* {category.products} products */}
          </p>
        </Link>
      ))}
    </div>
  );
};
export default CategoryGrid;
