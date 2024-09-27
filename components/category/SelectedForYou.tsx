"use client";

import Image from "next/image";
import Shoe from "@/public/images/shoe.svg";
import Bag from "@/public/images/bag.svg";
import Gymwear from "@/public/images/gymwear.svg";
import { useProductCategoryDetail } from "@/hooks/queries/products/productCategoryDetail";
import { capitalizeFirstLetterOfEachWord, cn } from "@/lib/utils";
import Link from "next/link";

const SelectedForYou = ({ categoryName }: { categoryName: string }) => {
  const { productCategoryDetail } = useProductCategoryDetail(categoryName);

  const images = [Shoe, Bag, Gymwear];

  return (
    <div className="space-y-5">
      <h1 className="font-medium lg:text-[32px] text-lg">Selected for you</h1>

      <div className="lg:grid lg:grid-cols-3 flex overflow-x-auto lg:space-x-5 w-full scrollbar-hide">
        {productCategoryDetail?.productCategory.category
          .slice(0, 3)
          .map((category, index) => (
            <div
              className="lg:col-span-1 flex-shrink-0 flex rounded-xl bg-white overflow-hidden min-w-[250px] lg:min-w-0 mb-4 lg:mb-0 mr-4 lg:mr-0"
              key={index}
            >
              <Image
                src={images[index]}
                alt="search"
                className="lg:p-4 lg:w-48 lg:h-48 w-32 h-32"
                width={128}
                height={128}
              />

              <div className="w-full p-4 space-y-2">
                <Link
                  href={`/category/${categoryName}/${category?.name}`}
                  className="font-medium normal-case lg:text-base text-sm"
                >
                  {capitalizeFirstLetterOfEachWord(category?.name)}
                </Link>
                <div className="flex flex-col space-y-2">
                  {category?.category.slice(0, 4).map((item, index) => (
                    <Link
                      href={`/category/${categoryName}/${category?.name}/${item.name}`}
                      key={index}
                      className="text-kaiglo_grey-placeholder lg:text-base text-sm"
                    >
                      {capitalizeFirstLetterOfEachWord(item.name)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default SelectedForYou;
