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

const returnReasons = [
  { label: "Item arrived damaged", value: "damaged" },
  { label: "Wrong item was sent", value: "wrong_item" },
  { label: "Item did not match description", value: "not_as_described" },
  { label: "Item is no longer needed", value: "no_longer_needed" },
  { label: "Found a better price elsewhere", value: "better_price" },
  { label: "Other", value: "other" },
];

const RequestReturn = ({
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
        <DialogTitle>Request Return</DialogTitle>
        <div className="space-y-8 mt-4">
          <Select onValueChange={() => {}}>
            <SelectTrigger className="w-full h-12 border placeholder:text-kaiglo_grey-placeholder">
              <SelectValue placeholder="Reason for Returning" />
            </SelectTrigger>
            <SelectContent>
              {returnReasons.map((reason) => (
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

export default RequestReturn;
