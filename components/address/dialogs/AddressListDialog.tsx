import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetAllAddresses } from "@/hooks/queries/address/getAllAddresses";
import { SetStateAction, useState } from "react";
import AddressCard from "../AddressCard";
import ModifiedButton from "@/components/shared/ModifiedButton";
import NewAddressDialog from "./NewAddressDialog";
import { IAddress } from "@/interfaces/address.interface";
import EditAddressDialog from "./EditAddressDialog";
import DeleteAddressDialog from "./DeleteAddressDialog";

const AddressListDialog = ({
  open,
  setOpen,
  setCheckoutAddress,
  currentSelectedAddress,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  setCheckoutAddress: (address: IAddress) => void;
  currentSelectedAddress?: IAddress;
}) => {
  const { addresses } = useGetAllAddresses();
  const [localSelectedAddress, setLocalSelectedAddress] = useState<
    IAddress | undefined
  >(currentSelectedAddress);
  const [openNewAddressDialog, setOpenNewAddressDialog] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState<{
    address: IAddress | undefined;
    dialogType: "edit" | "delete" | null;
  }>({ address: undefined, dialogType: null });

  const handleEditAddress = (address: IAddress) => {
    setSelectedAddress({ address, dialogType: "edit" });
  };

  const handleDeleteAddress = (address: IAddress) => {
    setSelectedAddress({ address, dialogType: "delete" });
  };

  const handleSelectAddress = (address: IAddress) => {
    setLocalSelectedAddress(address);
  };

  const handleConfirm = () => {
    if (localSelectedAddress) {
      setCheckoutAddress(localSelectedAddress);
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-10/12 xl:w-7/12">
          <DialogHeader>
            <DialogTitle className="h-8">Address Book</DialogTitle>
            {addresses && addresses.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-8 max-h-[400px] overflow-y-auto">
                {addresses.map((address, index) => (
                  <AddressCard
                    id={address.id}
                    key={index}
                    index={index + 1}
                    defaultAddress={address.defaultAddress}
                    firstName={address.firstName}
                    lastName={address.lastName}
                    phoneNumber={address.phoneNumber}
                    address={address.name}
                    city={address.city}
                    state={address.state}
                    onEditClick={() => handleEditAddress(address)}
                    onDeleteClick={() => handleDeleteAddress(address)}
                    isSelected={localSelectedAddress?.id === address.id}
                    onSelectClick={() => handleSelectAddress(address)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-20 my-4">
                <p>No addresses found</p>
              </div>
            )}

            <div className="flex justify-between space-x-4 py-4">
              <ModifiedButton
                type="button"
                variant="secondary"
                value="Add New Address"
                className="rounded-full w-96 py-3 px-8"
                onClick={() => {
                  setOpenNewAddressDialog(true);
                }}
              />

              <ModifiedButton
                type="button"
                variant="primary"
                value="Confirm"
                onClick={handleConfirm}
                disabled={!localSelectedAddress}
                className="rounded-full w-96 py-3 px-8"
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {openNewAddressDialog && (
        <NewAddressDialog
          open={openNewAddressDialog}
          setOpen={setOpenNewAddressDialog}
        />
      )}

      {selectedAddress.dialogType === "edit" && (
        <EditAddressDialog
          open={true}
          setOpen={() =>
            setSelectedAddress({ address: undefined, dialogType: null })
          }
          initialValues={selectedAddress.address as IAddress}
        />
      )}

      {selectedAddress.dialogType === "delete" && (
        <DeleteAddressDialog
          open={true}
          setOpen={() =>
            setSelectedAddress({ address: undefined, dialogType: null })
          }
          addressId={selectedAddress.address?.id as string}
        />
      )}
    </>
  );
};
export default AddressListDialog;
