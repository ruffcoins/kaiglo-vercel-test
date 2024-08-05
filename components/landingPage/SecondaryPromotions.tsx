import Image from "next/image";

import FifthPromotion from "@/public/images/fifth-promotion.jpg";
import SixthPromotion from "@/public/images/sixth-promotion.jpg";

const SecondaryPromotionGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:px-8 xl:px-14 px-4">
      <div className="relative h-[190px] md:h-80 lg:h-[360px] rounded-lg overflow-hidden">
        <Image
          src={FifthPromotion}
          alt="Fifth Promotion"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative h-[190px] md:h-80 lg:h-[360px] rounded-lg overflow-hidden">
        <Image
          src={SixthPromotion}
          alt="Sixth Promotion"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};
export default SecondaryPromotionGrid;
