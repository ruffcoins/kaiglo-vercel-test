import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductDetailsIntroductionSkeletonLoader = () => {
  return (
    <div className="grid grid-cols-12 gap-5 lg:mx-8 mx-4 border">
      <div className="lg:col-span-5 col-span-12">
        <Skeleton height={500} borderRadius={8} />
      </div>
      <div className="lg:col-span-7 col-span-12 rounded-2xl p-6 bg-white">
        <div className="flex flex-col justify-between h-full">
          <div className="space-y-4">
            <h1 className="font-bold lg:text-2xl">
              <Skeleton width={200} height={32} />
            </h1>
            <div className="flex lg:flex-row flex-col justify-between space-y-2 lg:space-y-0">
              <div className="flex space-x-2 items-center">
                <Skeleton circle={true} height={24} width={24} />
                <Skeleton width={100} />
              </div>
              <div className="w-fit flex items-center text-xs rounded-lg bg-kaiglo_grey-100 p-2.5 gap-2 font-bold">
                SKU: <Skeleton width={50} />
              </div>
            </div>
            <div className="border border-kaiglo_grey-disabled rounded-lg p-4">
              <Skeleton width={100} height={32} />
            </div>
            <div className="border border-kaiglo_grey-disabled rounded-lg p-4 space-y-2">
              <p className="font-medium">Select Colour, Size</p>
              <div className="flex justify-between items-center">
                <div className="flex gap-x-2 overflow-x-auto">
                  {[1, 2, 3, 4].map((_, index) => (
                    <Skeleton key={index} width={48} height={48} />
                  ))}
                </div>
              </div>
            </div>
            <div className="border border-kaiglo_grey-disabled rounded-lg p-4 space-y-2">
              <div className="flex space-x-2">
                <Skeleton circle={true} height={24} width={24} />
                <Skeleton width={100} />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 justify-between text-sm text-kaiglo_grey-base gap-x-8 gap-y-4">
                <Skeleton width={150} />
                <Skeleton width={50} />
                <Skeleton width={30} />
              </div>
            </div>
          </div>
          <div className="hidden lg:flex justify-between space-x-14 mt-8">
            <Skeleton width={200} height={48} />
            <Skeleton width={200} height={48} />
            <Skeleton circle={true} height={48} width={48} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsIntroductionSkeletonLoader;
