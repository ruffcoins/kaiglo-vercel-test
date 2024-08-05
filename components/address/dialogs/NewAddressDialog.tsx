import AddAddressForm from "@/components/forms/address/AddAddressForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { stateAndCities } from "@/constants/stateAndCities";
import { SetStateAction } from "react";

const NewAddressDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const statesAndCities = stateAndCities;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[361px] md:w-[563px]">
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
        </DialogHeader>
        <AddAddressForm stateAndCities={statesAndCities} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
export default NewAddressDialog;
