"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SetStateAction, useState } from "react";

const cancelReasons = [
  { label: "Changed my mind", value: "changed_mind" },
  { label: "Order created by mistake", value: "mistake" },
  { label: "Found a better price elsewhere", value: "better_price" },
  { label: "Item would not arrive on time", value: "late_delivery" },
  { label: "Shipping cost too high", value: "high_shipping_cost" },
  { label: "Other", value: "other" },
];

const CancelOrderDialog = ({
  open,
  setOpen,
  orderId,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  orderId: string;
}) => {
  const [selectedReason, setSelectedReason] = useState<string>("");

  const handleReasonChange = (reason: string) => {
    setSelectedReason(reason);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[400px]">
        <DialogTitle>Cancel Order</DialogTitle>
        <div className="space-y-8 mt-4">
          <Select onValueChange={handleReasonChange}>
            <SelectTrigger className="w-full h-12 border placeholder:text-kaiglo_grey-placeholder">
              <SelectValue placeholder="Reason for Cancelling" />
            </SelectTrigger>
            <SelectContent>
              {cancelReasons.map((reason) => (
                <SelectItem
                  key={reason.value}
                  value={reason.value}
                  className="cursor-pointer"
                >
                  {reason.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <textarea
            name=""
            id=""
            placeholder="Additional Information"
            rows={4}
            className="rounded-lg border p-2 w-full border-kaiglo_grey-500"
          />
          <DialogFooter>
            <Button
              variant="primary"
              className="rounded-full flex-1 h-12 font-medium"
              onClick={() => setOpen(false)}
            >
              Submit Request
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default CancelOrderDialog;
