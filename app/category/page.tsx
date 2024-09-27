"use client";

import InnerPageLayout from "@/components/layouts/InnerPageLayout";
import useGetAllCategories from "@/hooks/queries/category/getAllCategories";
import Link from "next/link";
import Image from "next/image";
import { capitalizeFirstLetterOfEachWord } from "@/lib/utils";

const Category = () => {
  const { allCategories } = useGetAllCategories();

  return (
    <InnerPageLayout>
      <div className="grid lg:grid-cols-6 grid-cols-3 lg:gap-6 gap-4 lg:my-20 lg:mt-44 mt-32 mb-20">
        {allCategories
          ?.filter(
            (category) =>
              category.productUrl !== "" &&
              category.productUrl !== null &&
              category.productUrl !== undefined,
          )
          .map((category, index) => (
            <Link
              href={`/category/${category.name}`}
              key={index}
              className="flex flex-col items-center text-center gap-y-1"
            >
              <div className="relative w-20 h-20 lg:w-40 lg:h-40">
                <Image
                  src={category?.productUrl as string}
                  alt={category.name}
                  fill
                  className="object-fit rounded-full"
                />
              </div>
              <h3 className="text-sm lg:font-bold font-medium">
                {capitalizeFirstLetterOfEachWord(category.name)}
              </h3>
              <p className="text-kaiglo_grey-base text-[10px]">
                {/* {category.products} products */}
              </p>
            </Link>
          ))}
      </div>
    </InnerPageLayout>
  );
};

export default Category;
