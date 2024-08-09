import HomepageLayout from "@/components/layouts/Homepage/HomepageLayout";
import React, { Suspense, useMemo } from "react";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";

export default function Home() {
  const components = useMemo(
    () => ({
      PromotionGrid: dynamic(
        () => import("@/components/landingPage/Promotion"),
      ),
      CategoryGrid: dynamic(
        () => import("@/components/landingPage/Categories"),
      ),
      SecondaryPromotionGrid: dynamic(
        () => import("@/components/landingPage/SecondaryPromotions"),
      ),
      FlashSale: dynamic(() => import("@/components/landingPage/FlashSale")),
      FeaturedProducts: dynamic(
        () => import("@/components/landingPage/FeaturedProducts"),
      ),
      TopSellingProducts: dynamic(
        () => import("@/components/landingPage/TopSellingProducts"),
      ),
      GroupBuyProducts: dynamic(
        () => import("@/components/landingPage/GroupBuyProducts"),
      ),
      AppDealsProducts: dynamic(
        () => import("@/components/landingPage/AppDealsProducts"),
      ),
      TertiaryPromotions: dynamic(
        () => import("@/components/landingPage/TertiaryPromotions"),
      ),
      NewArrivalProducts: dynamic(
        () => import("@/components/landingPage/NewArrivalProducts"),
      ),
      SneakersProducts: dynamic(
        () => import("@/components/landingPage/SneakersProducts"),
      ),
      TopBrands: dynamic(() => import("@/components/landingPage/TopBrands")),
      RecommendedProducts: dynamic(
        () => import("@/components/landingPage/RecommendedProducts"),
      ),
    }),
    [],
  );

  return (
    <HomepageLayout>
      <div className="space-y-20 mb-20 overflow-x-hidden">
        <Suspense fallback={<div>Loading Sales...</div>}>
          <components.PromotionGrid />
          <components.CategoryGrid />
          <components.SecondaryPromotionGrid />
        </Suspense>

        <Suspense fallback={<div>Loading Flash Sale...</div>}>
          <components.FlashSale />
        </Suspense>

        <Suspense fallback={<div>Loading Featured Products...</div>}>
          <components.FeaturedProducts />
        </Suspense>

        <Suspense fallback={<div>Loading Top Selling Products...</div>}>
          <components.TopSellingProducts />
        </Suspense>

        <Suspense fallback={<div>Loading Tertiary Promotions...</div>}>
          <components.TertiaryPromotions />
        </Suspense>

        <Suspense fallback={<div>Loading Group Buy Products...</div>}>
          <components.GroupBuyProducts />
        </Suspense>

        <Suspense fallback={<div>Loading App Deals Products...</div>}>
          <components.AppDealsProducts />
        </Suspense>

        <Suspense fallback={<div>Loading Top Brands...</div>}>
          <components.TopBrands />
        </Suspense>

        <Suspense fallback={<div>Loading New Arrivals...</div>}>
          <components.NewArrivalProducts />
        </Suspense>

        <Suspense fallback={<div>Loading Recommended Products...</div>}>
          <components.RecommendedProducts />
        </Suspense>

        <div className="hidden lg:flex flex-col gap-y-4">
          <div className="bg-white flex flex-col items-center lg:mx-8 xl:mx-14 mx-4 rounded-lg py-10 px-16 gap-y-4 text-center">
            <p className="text-sm">We’d love to hear what you think!</p>
            <Button
              variant="outline"
              className="rounded-full border-kaiglo_grey-placeholder font-medium h-12 w-44"
            >
              Give Feedback
            </Button>
          </div>

          <div className="bg-white flex flex-col items-center lg:mx-8 xl:mx-14 mx-4 rounded-lg py-10 px-16 gap-y-4 text-center">
            <p className="font-medium text-lg">
              Kaiglo makes online shopping in Nigeria simple and convenient.
            </p>
            <p className="text-sm ">
              We provide a diverse choice of trustworthy items. Participate in
              the daily offers and get the most affordable prices on a wide
              selection of items.
            </p>
            <p className="text-sm">
              We are an online store where you can get all of your fashion
              items, electronics, as well as backpacks, household appliances,
              kids' products, household items for men, women, and children; cool
              gadgets, computers, beauty products, powerbanks, and more on the
              move. What else is there? You would have exactly these items
              delivered to you. Shop online with peace since Kaiglo provides the
              safest online shopping payment option, allowing you to make
              stress-free purchases using your chosen checkout platform.
              Whatever you want to buy, Kaiglo has it, is working on getting
              them, and much more at reasonable costs. Kaiglo is for everyone,
              regardless of taste, class, or preferences. You can also pay upon
              delivery for added convenience.
            </p>
          </div>
        </div>
      </div>
    </HomepageLayout>
  );
}
