import React, { useState } from "react";
import Image from "next/image";
import FilledStar from "@/public/images/filled-star.svg";
import EmptyStar from "@/public/images/empty-star.svg";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface IRate {
  onChange: (rating: number) => void;
  starClassNames?: string;
}

const Rate: React.FC<IRate> = ({ onChange, starClassNames }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleClick = (value: number) => {
    setRating(value);
    onChange(value);
  };

  const handleMouseEnter = (value: number) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          className="focus:outline-none cursor-pointer"
        >
          <Image
            src={star <= (hoverRating || rating) ? FilledStar : EmptyStar}
            alt={star <= (hoverRating || rating) ? "filled star" : "empty star"}
            width={16}
            height={16}
            className={cn("w-4 h-4", starClassNames)}
          />
        </div>
      ))}
    </div>
  );
};

export default Rate;
