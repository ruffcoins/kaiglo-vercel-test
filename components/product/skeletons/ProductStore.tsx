import Skeleton from "react-loading-skeleton";

const ProductStoreSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl lg:mx-8 mx-4 p-6 space-y-4">
      <div className="flex justify-end items-center">
        <Skeleton width={120} height={40} borderRadius={20} />
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-5 flex space-x-4">
          <Skeleton circle={true} height={128} width={128} />
          <div className="flex flex-col space-y-2">
            <h1 className="font-bold">
              <Skeleton width={200} height={24} />
            </h1>
            <div className="flex space-x-1">
              <Skeleton width={50} height={20} />
              <Skeleton width={100} height={20} />
            </div>
            <div className="flex space-x-4">
              <div className="flex space-x-1">
                <Skeleton circle={true} height={24} width={24} />
                <Skeleton width={100} height={20} />
              </div>
              <div className="flex space-x-1">
                <Skeleton circle={true} height={24} width={24} />
                <Skeleton width={100} height={20} />
              </div>
            </div>
            <Skeleton width={120} height={20} borderRadius={20} />
          </div>
        </div>
        <div className="col-span-7 flex space-x-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="w-full flex space-x-4">
              <div className="w-full">
                <Skeleton height={100} borderRadius={8} />
              </div>
              <div className="space-y-2">
                <Skeleton width={150} height={20} />
                <Skeleton width={100} height={20} />
                <Skeleton width={50} height={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductStoreSkeleton;
