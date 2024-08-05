"use client";

import { useEffect, useState } from "react";

const CountdownTimer = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const calculateTimeLeft = () => {
    const difference = +new Date("2024-07-15") - +new Date();
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
      <div className="flex items-center justify-center lg:justify-start mt-4 space-x-2 text-2xl">
        <div className="bg-black w-16 h-16 space-y-[1px] text-white text-2xl font-bold flex flex-col rounded-lg justify-center items-center">
          <span>{timeLeft.days}</span>
          <span className="text-[10px] font-normal leading-none">Days</span>
        </div>
        <span className="text-black font-bold text-xl">:</span>
        <div className="bg-black w-16 h-16 space-y-[1px] text-white text-2xl font-bold flex flex-col rounded-lg justify-center items-center">
          <span>{timeLeft.hours}</span>
          <span className="text-[10px] font-normal leading-none">Hr</span>
        </div>
        <span className="text-black font-bold text-xl">:</span>
        <div className="bg-black w-16 h-16 space-y-[1px] text-white text-2xl font-bold flex flex-col rounded-lg justify-center items-center">
          <span>{timeLeft.minutes}</span>
          <span className="text-[10px] font-normal leading-none">Min</span>
        </div>
        <span className="text-black font-bold text-xl">:</span>
        <div className="bg-black w-16 h-16 space-y-[1px] text-white text-2xl font-bold flex flex-col rounded-lg justify-center items-center">
          <span>{timeLeft.seconds}</span>
          <span className="text-[10px] font-normal leading-none">Sec</span>
        </div>
      </div>
    )
  );
};

export default CountdownTimer;
