"use client";

import dynamic from "next/dynamic";
import Loader from "../shared/Loader";
import { useProductCategoryDetail } from "@/hooks/queries/products/productCategoryDetail";

const CategoryProductsIntroduction = dynamic(
  () => import("@/components/category/CategoryProductsIntroduction"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-[200px] w-screen">
        <Loader />
      </div>
    ),
  },
);

const SubCategoriesList = ({ categoryName }: { categoryName: string }) => {
  const { productCategoryDetail } = useProductCategoryDetail(categoryName);

  return (
    <div className="space-y-20">
      {productCategoryDetail?.productCategory.category.map((category) => (
        <CategoryProductsIntroduction
          key={category.name}
          category={categoryName}
          subCategory={category.name}
        />
      ))}
    </div>
  );
};
export default SubCategoriesList;
