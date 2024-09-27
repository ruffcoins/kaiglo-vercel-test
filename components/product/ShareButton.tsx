import Image from "next/image";
import Share from "@/public/images/share.svg";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ShareDialog from "../shared/ShareDialog";

const ShareButton = ({
  link,
  classNames,
}: {
  link: string;
  classNames?: string;
}) => {
  const [openShareModal, setOpenShareModal] = useState(false);

  return (
    <>
      <div
        className={cn(
          "w-10 h-10 flex justify-center items-center rounded-full bg-white/80 border-[0.5px] border-white cursor-pointer",
          classNames,
        )}
        onClick={() => setOpenShareModal(true)}
      >
        <Image
          src={Share}
          alt="share image"
          className="relative w-6 h-6 left-50"
          width={24}
          height={24}
        />
      </div>

      {openShareModal && (
        <ShareDialog
          open={openShareModal}
          setOpen={setOpenShareModal}
          title={"Share Product"}
          link={link}
        />
      )}
    </>
  );
};

export default ShareButton;
