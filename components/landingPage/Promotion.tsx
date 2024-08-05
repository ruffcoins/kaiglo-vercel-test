import FirstPromotion from "@/public/images/first-promotion.jpg";
import SecondPromotion from "@/public/images/second-promotion.jpg";
import ThirdPromotion from "@/public/images/third-promotion.jpg";
import FourthPromotion from "@/public/images/fourth-promotion.jpg";
import Image from "next/image";
import MobileBanner from "@/public/images/Simple Modern Photo Collage Autumn Fashion Sale Banner 1.jpg";

const PromotionGrid = () => {
  return (
    <div className="flex flex-col">
      <div className="hidden lg:grid grid-cols-2 gap-5 lg:px-8 xl:px-14 pt-8">
        <div className="relative h-[460px] rounded-lg overflow-hidden">
          <Image
            src={FirstPromotion}
            alt="First Promotion"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative h-[460px] grid grid-rows-2 overflow-hidden gap-5">
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src={SecondPromotion}
              alt="Second Promotion"
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src={ThirdPromotion}
                alt="Third Promotion"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src={FourthPromotion}
                alt="Fourth Promotion"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <Image
          src={MobileBanner}
          alt="Mobile banner"
          height={340}
          width={400}
          className="block lg:hidden w-full h-[340px] object-cover"
        />
      </div>
    </div>
  );
};

export default PromotionGrid;
