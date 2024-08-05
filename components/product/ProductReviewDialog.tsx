import { truncate } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import GreenSlide from "@/public/images/green-slide.jpg";
import Image from "next/image";
import EmptyStar from "@/public/images/empty-star.svg";
import Rating from "../shared/Rating";
import { Button } from "../ui/button";

interface ProductReviewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ProductReviewDialog = ({ open, setOpen }: ProductReviewProps) => {
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
          </DialogHeader>

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
              <Rating rating={0} starClassNames="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between">
              <h1 className="font-medium">Sellers Communication</h1>
              <Rating rating={0} starClassNames="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between">
              <h1 className="font-medium">Delivery Speed</h1>
              <Rating rating={0} starClassNames="w-6 h-6" />
            </div>
          </div>

          <textarea
            className="w-full h-32 border border-kaiglo_grey-placeholder rounded-lg p-4 focus:outline-kaiglo_brand-base"
            placeholder="Write your review here"
          />

          <Button
            variant="primary"
            className="h-12 px-8 font-medium rounded-full"
          >
            Submit Review{" "}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ProductReviewDialog;
