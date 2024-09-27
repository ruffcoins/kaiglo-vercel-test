"use client";

import { useGetStoreDetails } from "@/hooks/queries/store/getStoreDetails";
import Image from "next/image";
import Placeholder from "@/public/images/product-image-placeholder.png";
import ModifiedButton from "../shared/ModifiedButton";
import { useFollowStore } from "@/hooks/mutation/store/followStore";
import { useUnfollowStore } from "@/hooks/mutation/store/unfollowStore";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const StoreIntroduction = ({ storeName }: { storeName: string }) => {
  const { store } = useGetStoreDetails(storeName);
  const { isLoggedIn } = useAuth();

  const { followStore, followingStore } = useFollowStore(
    store?.id as string,
    store?.storeName as string,
  );
  const { unfollowStore, unfollowingStore } = useUnfollowStore(
    store?.id as string,
    store?.storeName as string,
  );

  return (
    <div className="lg:mx-8 lg:rounded-lg space-y-4 mt-10 lg:mt-0 mb-4">
      <Image
        src={store?.bannerImage || Placeholder}
        alt="Store Banner"
        className="h-72 lg:rounded-lg w-full object-cover"
        height={272}
        width={1440}
      />

      <div className="bg-white lg:p-6 p-4 lg:rounded-lg space-y-8">
        <div className="lg:grid lg:grid-cols-12">
          <div className="lg:hidden col-span-12 flex flex-col gap-3">
            <div className="flex gap-3">
              <Image
                src={store?.profilePic || Placeholder}
                alt="Store"
                className="lg:w-32 lg:h-32 w-20 h-20 rounded-full object-cover border"
                width={128}
                height={128}
              />
              <div className="flex flex-col justify-center space-y-3">
                <h1 className="font-bold text-xl">
                  {decodeURIComponent(storeName)}
                </h1>
                {isLoggedIn && (
                  <div>
                    {store?.followingStore ? (
                      <ModifiedButton
                        variant="primary"
                        className="rounded-full font-medium w-fit h-8 px-4"
                        type="button"
                        value={unfollowingStore ? "Please wait..." : "Unfollow"}
                        disabled={unfollowingStore}
                        onClick={() => unfollowStore()}
                      />
                    ) : (
                      <ModifiedButton
                        variant="primary"
                        className="rounded-full font-medium h-8 w-fit px-4"
                        type="button"
                        value={followingStore ? "Please wait..." : "Follow"}
                        disabled={followingStore}
                        onClick={() => followStore()}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            <p>{store?.description}</p>
          </div>

          <div className="hidden lg:flex lg:col-span-10 col-span-12 space-x-4">
            <Image
              src={store?.profilePic || Placeholder}
              alt="Store"
              className="lg:w-32 lg:h-32 w-20 h-20 rounded-full object-cover border"
              width={128}
              height={128}
            />
            <div className="flex flex-col space-y-2">
              <h1 className="font-bold text-xl">
                {decodeURIComponent(storeName)}
              </h1>
              <p>{store?.description}</p>
            </div>
          </div>

          {isLoggedIn && (
            <div className="hidden lg:flex col-span-2 space-x-4 justify-end">
              {store?.followingStore ? (
                <ModifiedButton
                  variant="primary"
                  className="rounded-full font-medium w-fit px-8"
                  type="button"
                  value={unfollowingStore ? "Please wait..." : "Unfollow"}
                  disabled={unfollowingStore}
                  onClick={() => unfollowStore()}
                />
              ) : (
                <ModifiedButton
                  variant="primary"
                  className="rounded-full font-medium w-fit px-8"
                  type="button"
                  value={followingStore ? "Please wait..." : "Follow"}
                  disabled={followingStore}
                  onClick={() => followStore()}
                />
              )}
            </div>
          )}
        </div>
        <div className="lg:grid lg:grid-cols-12 lg:space-x-20 lg:space-y-0 space-y-4">
          <div className="lg:col-span-4 flex flex-row lg:space-x-4 space-x-2">
            <div className="bg-kaiglo_grey-100 py-2 lg:px-4 px-2 uppercase text-sm lg:space-x-2.5 space-x-1.5 rounded-lg items-center flex flex-wrap">
              <span className="font-medium">
                {store?.storeSummary.successfulSales}
              </span>
              <span>Successful Sales</span>
            </div>
            <div className="bg-kaiglo_grey-100 py-2 lg:px-4 px-2 uppercase text-sm lg:space-x-2.5 space-x-1.5 rounded-lg items-center flex flex-wrap">
              <span className="font-medium">
                {store?.storeSummary.productCount}
              </span>
              <span>Products</span>
            </div>
          </div>

          <div className="lg:col-span-8 flex lg:flex-row flex-col lg:space-x-4 space-y-4 lg:space-y-0">
            <div className="bg-kaiglo_grey-100 py-2 px-4 uppercase text-sm space-x-2.5 rounded-lg flex items-center">
              <div className="lg:w-fit w-full">PRODUCT QUALITY:</div>

              <div className="w-56 h-3 bg-kaiglo_grey-placeholder rounded-full">
                <div
                  className="h-3 bg-kaiglo_accent-base rounded-full"
                  style={{
                    width: `${(((store?.storeRating.qualityRating.sum ?? 0) / ((store?.storeRating.qualityRating.count ?? 0) * 5)) * 100).toFixed(0)}%`,
                  }}
                ></div>
              </div>
              <div className="font-medium">
                {(() => {
                  const count = store?.storeRating.qualityRating.count ?? 0;
                  const sum = store?.storeRating.qualityRating.sum ?? 0;
                  return count > 0
                    ? ((sum / (count * 5)) * 100).toFixed(0)
                    : "0";
                })()}
                %
              </div>
            </div>
            <div className="bg-kaiglo_grey-100 py-2 px-4 uppercase text-sm space-x-2.5 rounded-lg flex items-center">
              <div className="lg:w-fit w-full">DELIVERY RATE:</div>

              <div className="w-56 h-3 bg-kaiglo_grey-placeholder rounded-full">
                <div
                  className="h-3 bg-kaiglo_accent-base rounded-full"
                  style={{
                    width: `${(((store?.storeRating.deliveryRating.sum ?? 0) / ((store?.storeRating.deliveryRating.count ?? 0) * 5)) * 100).toFixed(0)}%`,
                  }}
                ></div>
              </div>
              <div className="font-medium">
                {(() => {
                  const count = store?.storeRating.deliveryRating.count ?? 0;
                  const sum = store?.storeRating.deliveryRating.sum ?? 0;
                  return count > 0
                    ? ((sum / (count * 5)) * 100).toFixed(0)
                    : "0";
                })()}
                %
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StoreIntroduction;
