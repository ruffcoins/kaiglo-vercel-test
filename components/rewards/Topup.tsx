"use client";

import { SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import Image from "next/image";
import Delete from "@/public/images/delete.svg";
import { useFetchUserProfile } from "@/hooks/queries/userProfile";
import dynamic from "next/dynamic";

const Pay = dynamic(() => import("../shared/Pay"), { ssr: false });

const Topup = ({
  open,
  setOpen,
  setIsProcessing,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  handleSubmit: () => void;
  setIsProcessing: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useFetchUserProfile();
  const [balance, setBalance] = useState<string>("0");

  const handleButtonClick = (value: string) => {
    if (value === "backspace") {
      setBalance((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else {
      setBalance((prev) => (prev === "0" ? value : prev + value));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lg:w-[500px]">
        <DialogHeader>
          <DialogTitle>Topup Balance</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className=" flex items-center px-6 my-6 bg-kaiglo_grey-50 h-20 rounded-2xl">
          <div className="text-3xl font-bold">
            ₦ {Number(balance).toLocaleString()}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "00",
            "0",
            "backspace",
          ].map((item) => (
            <button
              key={item}
              onClick={() => handleButtonClick(item)}
              className="p-4 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
            >
              {item === "backspace" ? (
                <Image
                  src={Delete}
                  alt="delete"
                  width={32}
                  height={32}
                  className="w-8 h-8 mx-auto"
                />
              ) : (
                item
              )}
            </button>
          ))}
        </div>
        <Pay
          amount={Number(balance) * 100}
          email={user?.email}
          referrer={""}
          classNames={
            "bg-kaiglo_brand-base h-12 w-full rounded-full text-white font-medium uppercase"
          }
          userId={user?.id}
          setOpen={setOpen}
          setIsProcessing={setIsProcessing}
          setBalance={setBalance}
          action="topup"
        />
      </DialogContent>
    </Dialog>
  );
};
export default Topup;
