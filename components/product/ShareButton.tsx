import Image from "next/image";
import Share from "@/public/images/share.svg";
import { cn } from "@/lib/utils";

const ShareButton = ({ classNames }: { classNames?: string }) => {
  return (
    <div
      className={cn(
        "w-10 h-10 flex justify-center items-center rounded-full bg-white/80 border-[0.5px] border-white cursor-pointer",
        classNames,
      )}
      onClick={() => {}}
    >
      <Image
        src={Share}
        alt="share image"
        className="relative w-6 h-6 left-50"
      />
    </div>
  );
};

export default ShareButton;
