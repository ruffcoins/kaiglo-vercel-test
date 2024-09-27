"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CountdownTimer from "@/components/shared/CountdownTimer";
import Flash from "@/public/images/flash.png";
import FlashSaleProductCard from "@/components/landingPage/FlashSaleProductCard";
import { Button } from "@/components/ui/button";
import { useGetSalePromotion } from "@/hooks/queries/homePage/getSalePromotion";
import { cn } from "@/lib/utils";
import Loader from "../shared/Loader";
import { useGetSalePromotionProducts } from "@/hooks/queries/homePage/getSalePromotionProducts";
import Link from "next/link";

const FlashSale: React.FC = () => {
  const { salesPromotion, fetchingSalesPromotion } =
    useGetSalePromotion("FLASH_SALES");
  const { promotionProducts } = useGetSalePromotionProducts("FLASH_SALES");

  const [background, setBackground] = useState("");

  useEffect(() => {
    if (salesPromotion) {
      setBackground(salesPromotion?.colors.background);
    }
  }, [salesPromotion]);

  if (!salesPromotion || salesPromotion.endDate < new Date().toISOString()) {
    return null;
  }

  if (fetchingSalesPromotion) {
    return <Loader />;
  }

  return (
    <div
      className={cn(
        `w-full py-14 flex flex-col items-center justify-between gap-y-14 overflow-hidden`,
      )}
      style={{ background: background }}
    >
      <div className="grid lg:grid-cols-2 items-center w-full md:w-[80%] 2xl:w-[60%] lg:space-x-12 px-4 space-y-6 lg:space-y-0">
        <div className="flex items-center relative lg:h-[300px] overflow-hidden">
          <Link href="/sales/FLASH_SALES">
            <Image
              alt="flash sale main product"
              src={salesPromotion?.banners.background as string}
              className="object-cover rounded-lg"
              fill
            />
          </Link>
        </div>

        <div className="lg:space-y-5 space-y-6 w-full text-center lg:text-start">
          <div className="space-y-6 lg:space-y-0">
            <h1 className="text-[40px] font-bold flex justify-center lg:justify-start items-center space-x-2.5">
              <span>Flash Sales</span>
              <span role="img" aria-label="flash">
                <Image
                  alt="flash"
                  src={Flash}
                  className="w-8 h-8"
                  width={32}
                  height={32}
                />
              </span>
            </h1>
            <p className="text-kaiglo_grey-base">
              Hurry and get discounts on all Brands Items up to 50%
            </p>
          </div>

          <CountdownTimer endDate={salesPromotion?.endDate as string} />

          <Link href="/sales/FLASH_SALES">
            <Button variant="primary" className="font-medium mt-6">
              Go Shopping
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex overflow-scroll justify-between w-full px-8 overflow-x-auto gap-x-4">
        {promotionProducts.map((product) => (
          <FlashSaleProductCard
            key={product.id}
            title={product.name}
            price={
              product.productColors[0].productPriceDetails[0].newPrice
                ? product.productColors[0].productPriceDetails[0].newPrice
                : product.productColors[0].productPriceDetails[0].price
            }
            oldPrice={
              product.productColors[0].productPriceDetails[0].newPrice
                ? product.productColors[0].productPriceDetails[0].price
                : undefined
            }
            imageUrl={product.productUrl}
            id={product.id}
            productViews={product.productViews}
          />
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
