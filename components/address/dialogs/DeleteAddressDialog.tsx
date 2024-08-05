import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useDeleteAddress from "@/hooks/mutation/address/deleteAddress";
import { SetStateAction } from "react";

const DeleteAddressDialog = ({
  open,
  setOpen,
  addressId,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  addressId: string;
}) => {
  const { deleteAddress } = useDeleteAddress();

  const handleDelete = () => {
    deleteAddress(addressId);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lg:w-[400px]">
        <DialogHeader>
          <DialogTitle>Delete Address</DialogTitle>
          <DialogDescription className="py-4">
            Do you want to delete this address?
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
            onClick={() => {
              handleDelete();
              setOpen(false);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteAddressDialog;
