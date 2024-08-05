import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import FilledStar from "@/public/images/filled-star.svg";
import EmptyStar from "@/public/images/empty-star.svg";
import { cn } from "@/lib/utils";

const Star = ({
  filled,
  onClick,
}: {
  filled: boolean;
  onClick: () => void;
}) => {
  return (
    <Image
      src={filled ? FilledStar : EmptyStar}
      alt={filled ? "filled star" : "empty star"}
      width={16}
      height={16}
      className={cn("w-6 h-6 cursor-pointer")}
      onClick={onClick}
    />
  );
};

const InputRating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
}) => {
  const maxRating = 5;

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          filled={index < rating}
          onClick={() => handleRatingChange(index + 1)}
        />
      ))}
    </div>
  );
};
export default InputRating;
