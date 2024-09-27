import Image from "next/image";
import Smartphone from "@/public/images/smartphone-promo.jpg";
import Barcode from "@/public/images/barcode.svg";

const TertiaryPromotions = () => {
  return (
    <div className="bg-white grid lg:grid-cols-2 items-center lg:space-x-12 space-y-6 lg:space-y-0 lg:mx-8 mx-4 rounded-lg lg:py-20 px-6 py-10 lg:px-20 2xl:px-40">
      <div className="flex items-center overflow-hidden">
        <Image
          alt="flash sale main product"
          src={Smartphone}
          className="object-cover rounded-xl w-full h-auto"
          width={500}
          height={500}
        />
      </div>

      <div className="text-center lg:text-start space-y-8">
        <div className="space-y-2 lg:space-y-2">
          <h1 className="text-4xl xl:text-6xl font-medium flex justify-center lg:justify-start items-center space-x-2.5">
            SmartPhone Accessories
          </h1>
          <p className="text-kaiglo_grey-base">
            Personalize your Surface Pro with Microsoft branded accessories.{" "}
            <br /> In the presence of many colors for every taste.
          </p>
        </div>
        <div className="flex items-center gap-4 justify-center lg:justify-start flex-wrap">
          <div className="flex items-center space-x-2 bg-kaiglo_grey-100 rounded-md py-2 px-3 min-w-fit">
            <Image src={Barcode} alt="barcode" width={16} height={16} />
            <p className="text-kaiglo_grey-base">Charger</p>
          </div>
          <div className="flex items-center space-x-2 bg-kaiglo_grey-100 rounded-md py-2 px-3 min-w-fit">
            <Image src={Barcode} alt="barcode" width={16} height={16} />
            <p className="text-kaiglo_grey-base">Protective Glass</p>
          </div>
          <div className="flex items-center space-x-2 bg-kaiglo_grey-100 rounded-md py-2 px-3 min-w-fit">
            <Image src={Barcode} alt="barcode" width={16} height={16} />
            <p className="text-kaiglo_grey-base">Casing</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TertiaryPromotions;
