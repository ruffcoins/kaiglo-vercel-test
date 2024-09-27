"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SetStateAction, useState } from "react";

const DeleteCartItemsDialog = ({
  open,
  setOpen,
  deleteCartItems,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  deleteCartItems: () => Promise<void>;
}) => {
  const [removingItem, setRemovingItem] = useState(false);
  const handleDelete = () => {
    setRemovingItem(true);
    deleteCartItems().then(() => {
      setRemovingItem(false);
      setOpen(false);
    });
  };

  return (
    <Dialog open={open}>
      <DialogContent className="lg:w-[400px]">
        <DialogHeader>
          <DialogTitle>Delete Cart Items</DialogTitle>
          <DialogDescription />
          <DialogDescription className="py-4">
            Do you want to delete the selected item(s) from your cart?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            className="rounded-full py-3 px-8 min-h-12 mt-2 lg:mt-0"
            onClick={() => setOpen(false)}
            disabled={removingItem}
          >
            Cancel
          </Button>
          <Button
            variant="critical_solid"
            className="rounded-full flex-1 min-h-12"
            onClick={handleDelete}
            disabled={removingItem}
          >
            {removingItem ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteCartItemsDialog;
