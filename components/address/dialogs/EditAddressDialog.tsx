import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SetStateAction } from "react";
import UpdateAddressForm from "@/components/forms/address/UpdateAddressForm";
import { IAddress } from "@/interfaces/address.interface";
import { useGetAllStatesAndCities } from "@/hooks/queries/address/getStatesAndCities";

const EditAddressDialog = ({
  open,
  setOpen,
  initialValues,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  initialValues: IAddress;
}) => {
  const { statesAndCities } = useGetAllStatesAndCities();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[361px] md:w-[563px]">
        <DialogHeader>
          <DialogTitle>Update Address</DialogTitle>
        </DialogHeader>
        <UpdateAddressForm
          stateAndCities={statesAndCities ?? []}
          setOpen={setOpen}
          initialValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  );
};
export default EditAddressDialog;
