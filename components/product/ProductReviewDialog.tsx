"use client";

import { truncate } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { IProduct } from "@/interfaces/product.interface";
import { getPriceRange } from "@/lib/utils";
import Rate from "../shared/Rate";
import { useState } from "react";
import useRateAndReviewProduct from "@/hooks/mutation/product/rateAndReviewProduct";
import useUpdateOrderStatus from "@/hooks/mutation/order/updateOrderStatus";
import Auth from "@/utils/auth";
import { orderStatusEnum } from "@/interfaces/dtos/order.dto.interface";

interface ProductReviewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: IProduct;
  prices: number[];
  orderId: string;
}

const ProductReviewDialog = ({
  open,
  setOpen,
  product,
  prices,
  orderId,
}: ProductReviewProps) => {
  const { rateAndReviewProductAsync, ratingAndReviewingProduct } =
    useRateAndReviewProduct(product.id as string);
  const { updateOrderStatusAsync, updatingOrderStatus } =
    useUpdateOrderStatus(orderId);

  const [qualityRating, setQualityRating] = useState<number>(0);
  const [communicationRating, setCommunicationRating] = useState<number>(0);
  const [deliveryRating, setDeliveryRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const handleQualityRatingChange = (newRating: number) => {
    setQualityRating(newRating);
  };
  const handleDeliveryRatingChange = (newRating: number) => {
    setDeliveryRating(newRating);
  };
  const handleCommunicationRatingChange = (newRating: number) => {
    setCommunicationRating(newRating);
  };

  const handleSubmitReview = () => {
    updateOrderStatusAsync({
      accessToken: Auth.getToken() as string,
      id: orderId,
      orderStatus: orderStatusEnum.FULFILLED,
      additionalMessage: "",
      reason: "",
    }).then(() => {
      setOpen(false);
      rateAndReviewProductAsync({
        comment,
        communication: communicationRating,
        delivery: deliveryRating,
        quality: qualityRating,
        productId: product.id,
        productRating: 0,
        storeId: product.store.id,
        orderLineId: orderId,
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="w-[488px] transition-all duration-500"
        data-testid="auth-dialog"
      >
        <div className="space-y-6">
          <DialogHeader>
            <DialogTitle>
              <h1 className="text-xl">How did you feel about this product</h1>
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <div className="flex items-center space-x-4">
            <Image
              src={product.productUrl}
              alt="Product Thumbnail"
              width={104}
              height={104}
              className="rounded-lg w-[104px] h-[104px]"
            />
            <div className="flex flex-col space-y-2">
              <h1>{truncate(product.name, 65)}</h1>
              <p className="font-medium">{getPriceRange(prices)}</p>
            </div>
          </div>

          <div className="w-[80%] space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="font-medium">Item Quality</h1>
              <Rate
                starClassNames="w-6 h-6"
                onChange={handleQualityRatingChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <h1 className="font-medium">Seller's Communication</h1>
              <Rate
                starClassNames="w-6 h-6"
                onChange={handleCommunicationRatingChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <h1 className="font-medium">Delivery Speed</h1>
              <Rate
                starClassNames="w-6 h-6"
                onChange={handleDeliveryRatingChange}
              />
            </div>
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full h-32 border border-kaiglo_grey-placeholder rounded-lg p-4 focus:outline-kaiglo_brand-base"
            placeholder="Write your review here"
            required={true}
          />

          <Button
            onClick={handleSubmitReview}
            variant="primary"
            className="h-12 px-8 font-medium rounded-full w-full disabled:cursor-not-allowed"
            disabled={
              qualityRating === 0 ||
              communicationRating === 0 ||
              deliveryRating === 0 ||
              comment.length === 0 ||
              ratingAndReviewingProduct ||
              updatingOrderStatus
            }
          >
            {ratingAndReviewingProduct || updatingOrderStatus
              ? "Please wait..."
              : "Submit Review"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ProductReviewDialog;
