"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface CountdownTimerProps {
  endDate: string;
  backgroundColor?: string;
  textColor?: string;
}

const CountdownTimer = ({
  endDate,
  backgroundColor,
  textColor,
}: CountdownTimerProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const calculateTimeLeft = () => {
    const difference = +new Date(endDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    isClient && (
      <div className="flex items-center justify-center lg:justify-start bg-transparent space-x-2 text-2xl">
        <div
          className={cn(
            "w-16 h-16 space-y-[1px] text-2xl font-bold flex flex-col rounded-lg justify-center items-center",
          )}
          style={{
            backgroundColor: backgroundColor ? backgroundColor : "#000000",
            color: textColor ? textColor : "#ffffff",
          }}
        >
          <span>{timeLeft.days}</span>
          <span className="text-[10px] font-normal leading-none">Days</span>
        </div>
        <span
          className="font-bold text-xl"
          style={{ color: textColor ? textColor : "#000000" }}
        >
          :
        </span>
        <div
          className={cn(
            "w-16 h-16 space-y-[1px] text-2xl font-bold flex flex-col rounded-lg justify-center items-center",
          )}
          style={{
            backgroundColor: backgroundColor ? backgroundColor : "#000000",
            color: textColor ? textColor : "#ffffff",
          }}
        >
          <span>{timeLeft.hours}</span>
          <span className="text-[10px] font-normal leading-none">Hr</span>
        </div>
        <span
          className="font-bold text-xl"
          style={{ color: textColor ? textColor : "#000000" }}
        >
          :
        </span>
        <div
          className={cn(
            "w-16 h-16 space-y-[1px] text-2xl font-bold flex flex-col rounded-lg justify-center items-center",
          )}
          style={{
            backgroundColor: backgroundColor ? backgroundColor : "#000000",
            color: textColor ? textColor : "#ffffff",
          }}
        >
          <span>{timeLeft.minutes}</span>
          <span className="text-[10px] font-normal leading-none">Min</span>
        </div>
        <span
          className="font-bold text-xl"
          style={{ color: textColor ? textColor : "#000000" }}
        >
          :
        </span>
        <div
          className={cn(
            "w-16 h-16 space-y-[1px] text-2xl font-bold flex flex-col rounded-lg justify-center items-center",
          )}
          style={{
            backgroundColor: backgroundColor ? backgroundColor : "#000000",
            color: textColor ? textColor : "#ffffff",
          }}
        >
          <span>{timeLeft.seconds}</span>
          <span className="text-[10px] font-normal leading-none">Sec</span>
        </div>
      </div>
    )
  );
};

export default CountdownTimer;
