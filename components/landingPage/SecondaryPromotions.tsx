"use client";

import Image from "next/image";

import FifthPromotion from "@/public/images/fifth-promotion.jpg";
import SixthPromotion from "@/public/images/sixth-promotion.jpg";
import useGetSalePromotion from "@/hooks/queries/homePage/getSalePromotion";
import Loader from "../shared/Loader";
import Link from "next/link";

const SecondaryPromotionGrid = ({ saleName }: { saleName: string }) => {
  const { salesPromotion, fetchingSalesPromotion } =
    useGetSalePromotion(saleName);

  if (!salesPromotion || salesPromotion.endDate < new Date().toISOString()) {
    return null;
  }

  if (fetchingSalesPromotion) {
    return <Loader />;
  }

  console.log("salesPromotion", salesPromotion);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:px-8 px-4">
      <div className="relative h-[190px] md:h-80 lg:h-[360px] rounded-lg overflow-hidden">
        <Link href={`/sales/${saleName}`}>
          <Image
            src={salesPromotion.banners.desktopHome as string}
            alt="Fifth Promotion"
            fill
            className="object-cover"
          />
        </Link>
      </div>
      <div className="relative h-[190px] md:h-80 lg:h-[360px] rounded-lg overflow-hidden">
        <Link href={`/sales/${saleName}`}>
          <Image
            src={salesPromotion.banners.desktopHome2 as string}
            alt="Sixth Promotion"
            fill
            className="object-cover"
          />
        </Link>
      </div>
    </div>
  );
};
export default SecondaryPromotionGrid;
