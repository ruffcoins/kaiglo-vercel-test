"use client";

import Image from "next/image";
import useHomeContentBanner from "@/hooks/queries/homePage/getHomeContentBanner";
import Link from "next/link";
import Loader from "../shared/Loader";

const TopBrands = () => {
  const { homeContentBanner, fetchingHomeContentBanner } =
    useHomeContentBanner();

  if (fetchingHomeContentBanner) {
    return (
      <div className="flex justify-center items-center h-36">
        <Loader />
      </div>
    );
  }

  return (
    <div className="hidden lg:block px-8 space-y-5">
      <h1 className="font-medium text-[32px]">Top Brands</h1>

      <div className="flex justify-between">
        {homeContentBanner?.topBrands?.map((brand) => (
          <Link href={brand?.url as string} key={brand.id}>
            <Image
              src={brand.image as string}
              alt={brand.name}
              className="w-36 h-36 rounded-full"
              width={144}
              height={144}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopBrands;
