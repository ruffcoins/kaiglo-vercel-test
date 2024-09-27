import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useRemoveFromWishlist from "@/hooks/mutation/wishlist/removeFromWishlist";
import { SetStateAction } from "react";

const RemoveFromWishlistDialog = ({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  id: string;
}) => {
  const { removeItemFromWishlist } = useRemoveFromWishlist();

  const handleRemoveFromWishlist = () => {
    removeItemFromWishlist(id);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lg:w-[400px]">
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription />
          <DialogDescription className="py-4">
            Do you want to delete this product from your wishlist?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            className="rounded-full py-3 px-8 h-12 mt-2 lg:mt-0"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="critical_solid"
            className="rounded-full flex-1 min-h-12"
            onClick={handleRemoveFromWishlist}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default RemoveFromWishlistDialog;
