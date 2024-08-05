import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SetStateAction } from "react";

const DeleteCartItemsDialog = ({
  open,
  setOpen,
  deleteCartItems,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  deleteCartItems: () => void;
}) => {
  const handleDelete = () => {
    deleteCartItems();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lg:w-[400px]">
        <DialogHeader>
          <DialogTitle>Delete Cart Items</DialogTitle>
          <DialogDescription className="py-4">
            Do you want to delete the selected item(s) from your cart?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            className="rounded-full py-3 px-8 min-h-12 mt-2 lg:mt-0"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="critical_solid"
            className="rounded-full flex-1 min-h-12"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteCartItemsDialog;
