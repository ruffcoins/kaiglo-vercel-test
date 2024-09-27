"use client";

import React, { useEffect, useState } from "react";
import Rating from "../shared/Rating";
import Image from "next/image";
import Avatar from "@/public/images/avatar.svg";
import VerifiedBadge from "@/public/images/verified-badge.svg";
import { Button } from "../ui/button";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import RatingIcon from "@/public/images/rating.svg";
import FilledStar from "@/public/images/filled-star.svg";
import { useProductReviews } from "@/hooks/queries/products/getProductReviews";
import { useGetRatingAndReviewSummary } from "@/hooks/queries/products/getRatingSummary";
import moment from "moment";

const formatDate = (date: string) => {
  const utcMoment = moment(date, "YYYY-MM-DDTHH:mm:ss.SSSZ");
  const formattedDate = utcMoment.format("DD-MMM-YYYY");
  return formattedDate;
};

const ProductReviews = ({ productId }: { productId: string }) => {
  const { productReviews } = useProductReviews(productId);
  const { ratingAndReviewSummary } = useGetRatingAndReviewSummary(productId);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState<number>(4);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setVisibleReviews(isMobile ? 2 : 4);
  }, [isMobile]);

  const toggleExpanded = () => {
    if (isExpanded) {
      setVisibleReviews(isMobile ? 2 : 4);
    } else {
      setVisibleReviews(isMobile ? 4 : 8);
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="lg:mx-8 lg:rounded-2xl lg:p-6 p-4 bg-white space-y-8">
        <div className="flex lg:flex-row flex-col lg:items-center lg:space-x-4 space-y-2">
          <h2 className="lg:text-3xl font-medium">
            Verified Customers Reviews (
            {ratingAndReviewSummary?.totalNumberOfReviews || 0})
          </h2>
          <Rating
            rating={ratingAndReviewSummary?.averageRating || 0}
            starClassNames="!w-6 !h-6"
          />
        </div>

        <div className="grid grid-cols-3 lg:gap-8 gap-4 items-center lg:w-fit bg-kaiglo_grey-50 rounded-lg pr-4 py-4">
          <div className="col-span-1 flex flex-col items-center space-y-1">
            <p className="font-medium text-sm text-kaiglo_grey-base">
              {ratingAndReviewSummary?.totalNumberOfRatings || 0} ratings
            </p>
            <Image
              src={RatingIcon}
              alt="Rating"
              className="w-16 h-16 rounded-full"
              width={64}
              height={64}
            />
            <p className="font-medium text-sm text-center text-kaiglo_grey-base text-wrap">
              Average rating
            </p>
            <p className="text-xl">
              <span className="font-bold">
                {ratingAndReviewSummary?.averageRating || 0}
              </span>{" "}
              / 5
            </p>
          </div>

          <div className="col-span-2 space-y-2 w-fit pr-4 lg:px-0">
            {ratingAndReviewSummary?.frequencyOfRatings === undefined
              ? Object.entries({
                  5: 0,
                  4: 0,
                  3: 0,
                  2: 0,
                  1: 0,
                })
                  .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
                  .map(([rating, count]) => {
                    return (
                      <div className="flex items-center space-x-2" key={rating}>
                        <p className="w-2">{rating}</p>
                        <Image
                          src={FilledStar}
                          alt="filled star"
                          className="w-4 h-4"
                        />
                        <div className="lg:w-56 w-40 h-3 bg-kaiglo_grey-disabled rounded-full">
                          <div
                            className="h-3 bg-kaiglo_accent-base rounded-full"
                            style={{
                              width: `${0}%`,
                            }}
                          ></div>
                        </div>
                        <p>{count}</p>
                      </div>
                    );
                  })
              : Object.entries(ratingAndReviewSummary.frequencyOfRatings)
                  .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
                  .map(([rating, count]) => (
                    <div className="flex items-center space-x-2" key={rating}>
                      <p className="w-2">{rating}</p>
                      <Image
                        src={FilledStar}
                        alt="filled star"
                        className="w-4 h-4"
                      />
                      <div className="w-56 h-3 bg-kaiglo_grey-disabled rounded-full">
                        <div
                          className="h-3 bg-kaiglo_accent-base rounded-full"
                          style={{
                            width: `${(count / (ratingAndReviewSummary?.totalNumberOfRatings ?? 1)) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
          </div>
          {/* </div> */}
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-8 gap-4">
          {productReviews?.slice(0, visibleReviews).map((review, index) => (
            <div key={index} className="p-4 rounded-md space-y-1">
              <div className="flex items-center space-x-2 space-y-1">
                <Image
                  src={review.profilePic || Avatar}
                  alt="reviewer"
                  className="w-6 h-6 rounded-full"
                  width={24}
                  height={24}
                />
                <span className="font-bold capitalize">{review.fullName}</span>
                <Rating rating={review.userRating} />
              </div>
              <div className="text-kaiglo_grey-base">{review.comment}</div>
              <div className="text-sm text-kaiglo_grey-base pt-2">
                Posted on {formatDate(review.createdDate)}
              </div>
              <div className="flex space-x-1">
                <Image
                  src={VerifiedBadge}
                  alt="verified badge"
                  width={24}
                  height={24}
                />
                <p className="text-sm text-kaiglo_brand-base">Verified Buyer</p>
              </div>
            </div>
          ))}
        </div>

        {productReviews && productReviews.length > visibleReviews && (
          <div className="flex justify-center">
            <Button
              variant="secondary"
              onClick={toggleExpanded}
              className="font-medium w-fit rounded-full"
            >
              {isExpanded ? "See Less" : "See More"}
              <span>{isExpanded ? <CaretUpIcon /> : <CaretDownIcon />}</span>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductReviews;
