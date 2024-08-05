"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { SetStateAction, useState } from "react";
import Image from "next/image";
import { truncate } from "@/lib/utils";
import GreenSlide from "@/public/images/green-slide.jpg";
import InputRating from "../InputRating";

const ReviewOrder = ({
  open,
  setOpen,
  orderId,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  orderId: string;
}) => {
  const [qualityRating, setQualityRating] = useState<number>(0);
  const [communicationRating, setCommunicationRating] = useState<number>(0);
  const [speedRating, setSpeedRating] = useState<number>(0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[500px]">
        <DialogTitle>How did you feel about this product</DialogTitle>
        <div className="space-y-6 mt-4">
          <div className="flex items-center space-x-4">
            <Image
              src={GreenSlide}
              alt="Product Thumbnail"
              width={104}
              height={104}
              className="rounded-lg w-[104px] h-[104px]"
            />
            <div className="flex flex-col space-y-2">
              <h1>
                {truncate(
                  "Zend Exceed Man High Quality Comfortable Breathable Running Fashion Sneakers",
                  65,
                )}
              </h1>
              <p className="font-medium">₦780,580</p>
            </div>
          </div>

          <div className="w-[80%] space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="font-medium">Item Quality</h1>
              <InputRating
                rating={qualityRating}
                setRating={setQualityRating}
              />
            </div>
            <div className="flex items-center justify-between">
              <h1 className="font-medium">Sellers Communication</h1>
              <InputRating
                rating={communicationRating}
                setRating={setCommunicationRating}
              />
            </div>
            <div className="flex items-center justify-between">
              <h1 className="font-medium">Delivery Speed</h1>
              <InputRating rating={speedRating} setRating={setSpeedRating} />
            </div>
          </div>

          <textarea
            name=""
            id=""
            placeholder="Additional Information"
            rows={4}
            className="rounded-lg border p-2 w-full border-kaiglo_grey-500 focus:outline-red-500"
          />

          <DialogFooter>
            <Button
              variant="primary"
              className="rounded-full flex-1 h-12 font-medium"
              onClick={() => setOpen(false)}
            >
              Submit Review
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewOrder;
