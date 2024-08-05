import Image from "next/image";
import Loading from "@/public/images/loader.svg";
import { cn } from "@/lib/utils";

const Loader = ({ classNames }: { classNames?: string }) => {
  return (
    <Image
      src={Loading}
      alt="loading"
      className={cn("animate-spin", classNames)}
    />
  );
};
export default Loader;
