import Image from "next/image";
import Philip from "@/public/images/philip.jpg";
import Oppo from "@/public/images/oppo.jpg";
import Camel from "@/public/images/camel.jpg";
import Chen from "@/public/images/chen.jpg";
import Variety from "@/public/images/variety.jpg";
import Trifone from "@/public/images/trifone.jpg";
import Adidas from "@/public/images/adidas.jpg";

const TopBrands = () => {
  return (
    <div className="hidden lg:block lg:px-8 xl:px-14 space-y-5">
      <h1 className="font-medium text-[32px]">Top Brands</h1>

      <div className="flex justify-between">
        <Image src={Philip} alt="Philip" className="w-36 h-36 rounded-full" />
        <Image src={Oppo} alt="Oppo" className="w-36 h-36 rounded-full" />
        <Image src={Camel} alt="Camel" className="w-36 h-36 rounded-full" />
        <Image src={Chen} alt="Chen" className="w-36 h-36 rounded-full" />
        <Image src={Variety} alt="Variety" className="w-36 h-36 rounded-full" />
        <Image src={Trifone} alt="Trifone" className="w-36 h-36 rounded-full" />
        <Image src={Adidas} alt="Adidas" className="w-36 h-36 rounded-full" />
      </div>
    </div>
  );
};

export default TopBrands;
