import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import OrderTracking from "./OrderTracking";

export function OrderTrackingBottomSheet({
  open,
  setOpen,
  orderNumber,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  orderNumber: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet key="bottom" open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-[20px]">
          <SheetHeader>
            <SheetTitle className="text-start">Order Tracking</SheetTitle>
          </SheetHeader>
          <OrderTracking orderNumber={orderNumber} />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default OrderTrackingBottomSheet;
