"use client";

import Image from "next/image";
import useHomeContentBanner from "@/hooks/queries/homePage/getHomeContentBanner";
import { useEffect, useState } from "react";
import Link from "next/link";

const PromotionGrid = () => {
  const { homeContentBanner, fetchingHomeContentBanner } =
    useHomeContentBanner();

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (homeContentBanner && homeContentBanner.homeSliders.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide(
          (prevSlide) => (prevSlide + 1) % homeContentBanner.homeSliders.length,
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [homeContentBanner, currentSlide]);

  if (fetchingHomeContentBanner) {
    return (
      <div className="grid grid-cols-12 h-[460px] lg:px-8 xl:px-14 pt-8 gap-5">
        <div className="col-span-12 lg:col-span-8 h-full">
          <div className="relative h-[460px] lg:rounded-lg overflow-hidden bg-slate-300 animate-pulse"></div>
        </div>
        <div className="lg:col-span-4 hidden h-full lg:grid grid-cols-12 grid-rows-2 gap-5">
          <div className="relative rounded-lg overflow-hidden col-span-12 bg-slate-300 animate-pulse"></div>
          <div className="relative rounded-lg overflow-hidden col-span-12 bg-slate-300 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 lg:mx-8 pt-5 lg:pt-0 gap-5">
      <div className="lg:col-span-8 col-span-12 relative h-[10rem] border lg:h-[460px] lg:rounded-lg overflow-hidden">
        {homeContentBanner?.homeSliders?.map((slider, index) => (
          <Link
            href={slider.imageUrl}
            key={slider.id}
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: index === currentSlide ? 1 : 0,
              zIndex: index === currentSlide ? 1 : 0,
            }}
          >
            <Image
              src={slider.image as string}
              alt={"Promotion banner"}
              fill
              className="object-cover"
            />
          </Link>
        ))}

        <div className="absolute bottom-4 lg:bottom-10 z-10 left-1/2 -translate-x-[50%]">
          <div className="flex space-x-1 border rounded-full py-1 px-1.5">
            {homeContentBanner?.homeSliders?.map((image, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full border border-white cursor-pointer ${
                  currentSlide === index
                    ? "bg-kaiglo_accent-base"
                    : "bg-kaiglo_grey-placeholder"
                }`}
                onClick={() => setCurrentSlide(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden lg:col-span-4 relative h-[460px] rounded-lg overflow-hidden lg:flex flex-col space-y-5">
        <div className="relative rounded-lg h-full overflow-hidden">
          <Image
            src={homeContentBanner?.adBanners[0]?.image as string}
            alt={"Promotion banner"}
            fill
            className="object-cover"
          />
        </div>
        <div className="relative rounded-lg h-full overflow-hidden">
          <Image
            src={homeContentBanner?.adBanners[1]?.image as string}
            alt={"Promotion banner"}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PromotionGrid;
