import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SetStateAction } from "react";
import { stateAndCities } from "@/constants/stateAndCities";
import UpdateAddressForm from "@/components/forms/address/UpdateAddressForm";
import { IAddress } from "@/interfaces/address.interface";

const EditAddressDialog = ({
  open,
  setOpen,
  initialValues,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  initialValues: IAddress;
}) => {
  const statesAndCities = stateAndCities;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[361px] md:w-[563px]">
        <DialogHeader>
          <DialogTitle>Update Address</DialogTitle>
        </DialogHeader>
        <UpdateAddressForm
          stateAndCities={statesAndCities}
          setOpen={setOpen}
          initialValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  );
};
export default EditAddressDialog;
