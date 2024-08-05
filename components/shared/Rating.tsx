import Image from "next/image";
import FilledStar from "@/public/images/filled-star.svg";
import EmptyStar from "@/public/images/empty-star.svg";
import { IRating } from "@/interfaces/rating.interface";
import { cn } from "@/lib/utils";

const Rating: React.FC<IRating> = ({ rating, starClassNames }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= Math.floor(rating) ? (
          <Image
            key={star}
            src={FilledStar}
            alt="filled star"
            width={16}
            height={16}
            className={cn("w-4 h-4", starClassNames)}
          />
        ) : star - 1 < rating ? (
          <div key={star} className={cn("relative w-4 h-4", starClassNames)}>
            <Image
              src={FilledStar}
              alt="filled star"
              width={16}
              height={16}
              className={cn("w-4 h-4 absolute", starClassNames)}
            />
            <Image
              src={EmptyStar}
              alt="empty star"
              className={cn("w-4 h-4", starClassNames)}
              width={16}
              height={16}
              style={{ clipPath: `inset(0 0 0 50%)` }}
            />
          </div>
        ) : (
          <Image
            key={star}
            src={EmptyStar}
            alt="empty star"
            width={16}
            height={16}
            className={cn("w-4 h-4", starClassNames)}
          />
        ),
      )}
    </div>
  );
};
export default Rating;
