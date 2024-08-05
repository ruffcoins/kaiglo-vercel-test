import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="relative w-full h-80 p-4 bg-white rounded-lg shadow-sm">
      <div className="animate-pulse">
        <div className="w-full h-36 bg-gray-200 rounded-md"></div>
        <div className="absolute top-4 left-4 w-16 h-6 bg-gray-200 rounded-full"></div>
        <div className="absolute top-4 right-4 w-8 h-8 bg-gray-200 rounded-full"></div>
        <div className="mt-4 h-6 w-3/4 bg-gray-200 rounded-md"></div>
        <div className="mt-2 h-2 w-1/3 bg-gray-200 rounded-md"></div>
        <div className="mt-4 h-2 w-2/3 bg-gray-200 rounded-md"></div>
        <div className="mt-2 h-2 w-1/4 bg-gray-200 rounded-md"></div>
        <div className="mt-4 h-4 w-1/2 bg-gray-200 rounded-md"></div>
        <div className="mt-2 h-3 w-1/3 bg-gray-200 rounded-md"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
