"use client";

import { useResendOtp } from "@/hooks/mutation/auth/resendOtp";
import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface OtpTimerProps {
  email: string;
  phone: string;
}

const OtpTimer: React.FC<OtpTimerProps> = ({ email, phone }) => {
  const initialTime = 60;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const { resend } = useResendOtp();

  useEffect(() => {
    if (timeLeft === 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleResendOtp = () => {
    if (timeLeft > 0) return;
    resend({ email, phone, otpChannel: "ALL" });
    setTimeLeft(initialTime);
  };

  return (
    <div className="flex flex-col items-center space-y-1.5">
      <div className="w-16">
        <CircularProgressbar
          value={timeLeft}
          maxValue={initialTime}
          text={`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
          styles={buildStyles({
            pathColor: `green`,
            textColor: "black",
            trailColor: "#d6d6d6",
          })}
        />
      </div>

      <p className="space-x-2 text-base font-normal">
        <span>Did not get any code?</span>
        <span
          className={`${timeLeft > 0 ? "text-kaiglo_grey-placeholder cursor-not-allowed" : "text-kaiglo_brand-base cursor-pointer"} font-bold`}
          onClick={handleResendOtp}
        >
          Resend OTP
        </span>
      </p>
    </div>
  );
};

export default OtpTimer;
