"use client";

import React from "react";
import Rating from "../shared/Rating";
import Image from "next/image";
import Thumbnail1 from "@/public/images/product-thumbnail.jpg";
import Thumbnail2 from "@/public/images/product-thumbnail-1.jpg";
import Thumbnail3 from "@/public/images/product-thumbnail-2.jpg";
import Avatar from "@/public/images/avatar.svg";
import VerifiedBadge from "@/public/images/verified-badge.svg";
import { Button } from "../ui/button";
import { CaretDownIcon } from "@radix-ui/react-icons";
import RatingIcon from "@/public/images/rating.svg";
import FilledStar from "@/public/images/filled-star.svg";
import ProductReviewDialog from "./ProductReviewDialog";

const reviews = [
  {
    name: "Eugene",
    rating: 4,
    date: "17/05/2024",
    review:
      "I've honestly been wanting a pair of these for a long time now. I had a pair similar but a different brand yrs ago but they had the velcro straps and I am not a van. these are much better! my feet don't end up sliding off the front of them at all. they actually don't always slide in all the way 🤣 which I'd definitely prefer.",
    images: [Thumbnail1, Thumbnail2, Thumbnail3],
  },
  {
    name: "Michael Pro",
    rating: 4,
    date: "17/05/2024",
    review: "These are super comfy! I work at an indoor pool...",
  },
  {
    name: "Ayodeji",
    rating: 3,
    date: "17/05/2024",
    review:
      "I bought the pink and black ones. I like the looks of them but not the comfort.",
  },
  {
    name: "Emmanuel",
    rating: 3,
    date: "17/05/2024",
    review: "My mom loved the slippers! They were very comfortable for her...",
  },
];

const ProductReviews = () => {
  const [openReviewDialog, setOpenReviewDialog] = React.useState(false);

  return (
    <>
      <div className="lg:mx-8 xl:mx-14 mx-4 rounded-2xl p-6 bg-white space-y-8">
        <div className="flex items-center space-x-4">
          <h2 className="text-3xl font-medium">
            Verified Customers Reviews (30)
          </h2>
          <Rating rating={3.5} starClassNames="!w-6 !h-6" />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="col-span-1 flex bg-kaiglo_grey-50 p-6 rounded-lg gap-8 w-fit">
            <div className="flex flex-col items-center space-y-1">
              <p className="font-medium text-sm text-kaiglo_grey-base">
                30 ratings
              </p>
              <Image
                src={RatingIcon}
                alt="Rating"
                className="w-16 h-16 rounded-full"
              />
              <p className="font-medium text-sm text-kaiglo_grey-base">
                Average rating
              </p>
              <p className="text-xl">
                <span className="font-bold">3.5</span> / 5
              </p>
            </div>
            <div className="space-y-2">
              {[
                { rating: 5, percentage: 68 },
                { rating: 4, percentage: 29 },
                { rating: 3, percentage: 15 },
                { rating: 2, percentage: 8 },
                { rating: 1, percentage: 51 },
              ].map((item, index) => (
                <div className="flex items-center space-x-2" key={index}>
                  <p className="w-2">{item.rating}</p>
                  <Image
                    src={FilledStar}
                    alt="filled star"
                    className="w-4 h-4"
                  />
                  <div className="w-56 h-3 bg-kaiglo_grey-disabled rounded-full">
                    <div
                      className="h-3 bg-kaiglo_accent-base rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1 flex flex-col justify-center items-center space-y-4 mx-auto">
            <p className="w-96 text-center">
              Having recently purchased this product, could you kindly provide
              us with your feedback?
            </p>
            <Button
              variant="primary"
              className="rounded-full font-semibold px-8 py-3"
              onClick={() => setOpenReviewDialog(true)}
            >
              Write A Review
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="p-4 rounded-md space-y-1">
              <div className="flex items-center space-x-2 space-y-1">
                <Image
                  src={Avatar}
                  alt="reviewer"
                  className="w-6 h-6 rounded-full"
                />
                <span className="font-bold">{review.name}</span>
                <Rating rating={review.rating} />
              </div>
              <div className="text-kaiglo_grey-base">{review.review}</div>
              {review.images && (
                <div className="flex space-x-1.5 border rounded-lg p-2">
                  {review.images.map((image, idx) => (
                    <Image
                      key={idx}
                      src={image}
                      alt="review"
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  ))}
                </div>
              )}
              <div className="text-sm text-kaiglo_grey-base pt-2">
                Posted on {review.date}
              </div>
              <div className="flex space-x-1">
                <Image src={VerifiedBadge} alt="verified badge" />
                <p className="text-sm text-kaiglo_brand-base">Verified Buyer</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            variant="secondary"
            // onClick={toggleExpanded}
            className="font-medium w-fit rounded-full"
          >
            See More <CaretDownIcon />
            {/* {isExpanded ? "See Less" : "See More"}
        <span>{isExpanded ? <CaretUpIcon /> : <CaretDownIcon />}</span> */}
          </Button>
        </div>
      </div>

      {openReviewDialog && (
        <ProductReviewDialog
          open={openReviewDialog}
          setOpen={setOpenReviewDialog}
        />
      )}
    </>
  );
};

export default ProductReviews;
