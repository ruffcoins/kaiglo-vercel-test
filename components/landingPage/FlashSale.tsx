import React from "react";
import Image from "next/image";
import CountdownTimer from "@/components/shared/CountdownTimer";
import FlashSaleImage from "@/public/images/flash-sale.jpg";
import Tecno from "@/public/images/tecno.jpg";
import WaterDispenser from "@/public/images/water-dispenser.jpg";
import Samsung from "@/public/images/samsung.jpg";
import Sneaker from "@/public/images/sneaker.jpg";
import TecnoPop from "@/public/images/tecno-pop.jpg";
import Flash from "@/public/images/flash.png";
import FlashSaleProductCard from "@/components/landingPage/FlashSaleProductCard";
import { Button } from "@/components/ui/button";

const FlashSale: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#FFF0C8] via-[#FFC8C8] to-[#FFD8D8] py-14 rounded-lg flex flex-col items-center justify-between gap-y-14 overflow-hidden">
      <div className="grid lg:grid-cols-2 items-center w-full md:w-[80%] 2xl:w-[60%] lg:space-x-12 px-4 space-y-6 lg:space-y-0">
        <div className="flex items-center relative lg:h-[300px] overflow-hidden">
          <Image
            alt="flash sale main product"
            src={FlashSaleImage}
            className="object-cover rounded-lg"
          />
        </div>

        <div className="lg:space-y-5 space-y-6 w-full text-center lg:text-start">
          <div className="space-y-6 lg:space-y-0">
            <h1 className="text-[40px] font-bold flex justify-center lg:justify-start items-center space-x-2.5">
              <span>Flash Sales</span>
              <span role="img" aria-label="flash">
                <Image alt="flash" src={Flash} className="w-8 h-8" />
              </span>
            </h1>
            <p className="text-kaiglo_grey-base">
              Hurry and get discounts on all Brands Items up to 50%
            </p>
          </div>

          <CountdownTimer />

          <Button variant="primary" className="font-medium">
            Go Shopping
          </Button>
        </div>
      </div>

      <div className="flex justify-between w-full lg:px-8 xl:px-14 overflow-x-auto gap-x-4 px-8">
        <FlashSaleProductCard
          title="Tecno Phantom"
          price="₦780,580"
          oldPrice="₦880,580"
          rating={3}
          imageUrl={Tecno}
          id={"jhjk"}
        />
        <FlashSaleProductCard
          title="Water Dispenser"
          price="₦780,580"
          oldPrice="₦880,580"
          rating={3}
          imageUrl={WaterDispenser}
          id="kkjkl"
        />
        <FlashSaleProductCard
          title="Samsung Galaxy"
          price="₦780,580"
          oldPrice="₦880,580"
          rating={3}
          imageUrl={Samsung}
          id="jkljkl"
        />
        <FlashSaleProductCard
          title="Tecno Phantom"
          price="₦780,580"
          oldPrice="₦880,580"
          rating={3}
          imageUrl={TecnoPop}
          id="jhjkh"
        />
        <FlashSaleProductCard
          title="Running Sneaker"
          price="₦780,580"
          oldPrice="₦880,580"
          rating={3}
          imageUrl={Sneaker}
          id="jhjkhk"
        />
      </div>
    </div>
  );
};

export default FlashSale;
