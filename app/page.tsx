import HomepageLayout from "@/components/layouts/Homepage/HomepageLayout";
import React from "react";
import FeaturedProducts from "@/components/landingPage/FeaturedProducts";
import PromotionGrid from "@/components/landingPage/Promotion";
import CategoryGrid from "@/components/landingPage/Categories";
import SecondaryPromotionGrid from "@/components/landingPage/SecondaryPromotions";
import FlashSale from "@/components/landingPage/FlashSale";
import TopSellingProducts from "@/components/landingPage/TopSellingProducts";
import GroupBuyProducts from "@/components/landingPage/GroupBuyProducts";
import AppDealsProducts from "@/components/landingPage/AppDealsProducts";
import TertiaryPromotions from "@/components/landingPage/TertiaryPromotions";
import NewArrivalProducts from "@/components/landingPage/NewArrivalProducts";
import SneakersProducts from "@/components/landingPage/SneakersProducts";
import TopBrands from "@/components/landingPage/TopBrands";
import RecommendedProducts from "@/components/landingPage/RecommendedProducts";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <HomepageLayout>
      <div className="space-y-20 mb-20 overflow-x-hidden">
        <PromotionGrid />
        <CategoryGrid />
        <SecondaryPromotionGrid />
        <FlashSale />
        <FeaturedProducts />
        <TopSellingProducts />
        <TertiaryPromotions />
        <GroupBuyProducts />
        <AppDealsProducts />
        <TopBrands />
        <NewArrivalProducts />
        <SneakersProducts />
        <RecommendedProducts />

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
