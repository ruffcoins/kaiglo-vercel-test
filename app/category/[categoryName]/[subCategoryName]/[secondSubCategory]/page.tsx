"use client";

import Loader from "@/components/shared/Loader";
import InnerPageLayout from "@/components/layouts/InnerPageLayout";
import dynamic from "next/dynamic";

const SecondSubCategoryProductsPage = dynamic(
  () => import("@/components/category/SecondSubCategoriesProductsPage"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-[200px] w-screen">
        <Loader />
      </div>
    ),
  },
);

export default async function Page({
  params,
}: {
  params: {
    categoryName: string;
    subCategoryName: string;
    secondSubCategory: string;
  };
}) {
  const { categoryName, subCategoryName, secondSubCategory } = params;
  return (
    <InnerPageLayout>
      <div className="lg:my-10 my-24 space-y-5 min-h-[calc(100vh-8rem)]">
        <SecondSubCategoryProductsPage
          Category={decodeURIComponent(categoryName)}
          SubCategory={decodeURIComponent(subCategoryName)}
          SecondSubCategory={decodeURIComponent(secondSubCategory)}
        />
      </div>
    </InnerPageLayout>
  );
}
