import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import Loader from "../shared/Loader";
import { SetStateAction, useEffect } from "react";

const Processing = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    console.log("Processing");
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }, []);

  return (
    <Dialog open={open}>
      <DialogContent
        aria-describedby="processing-payment"
        className="lg:w-[500px]"
      >
        <DialogHeader>
          <DialogTitle>Processing Payment</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4 my-4">
          <div className="text-center">
            Please wait while we process your payment...
          </div>
          <Loader />
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default Processing;
