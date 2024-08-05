"use client";

import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";
import Image from "next/image";
import Phone from "@/public/images/phone.svg";
import { cn } from "@/lib/utils";

interface CallToOrderHoverCardProps {
  classNames?: string;
}

const CallToOrderHoverCard = ({ classNames }: CallToOrderHoverCardProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className={cn(
            "items-center justify-center rounded-full cursor-pointer flex xl:hidden lg:bg-kaiglo_grey-100",
            classNames,
          )}
        >
          <Image src={Phone} alt="phone icon" className="" />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-40 p-2 bg-white opacity-100 z-10 shadow">
        <div className="flex-col">
          <p className="text-sm font-bold">Call to place order</p>
          <p className="text-sm text-kaiglo_attention-base">
            +234 915 449 1603
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
export default CallToOrderHoverCard;
