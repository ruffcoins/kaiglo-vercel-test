"use client";
import AddressCard from "@/components/address/AddressCard";
import DeleteAddressDialog from "@/components/address/dialogs/DeleteAddressDialog";
import EditAddressDialog from "@/components/address/dialogs/EditAddressDialog";
import NewAddressDialog from "@/components/address/dialogs/NewAddressDialog";
import AddressEmptyState from "@/components/emptyStates/AddressEmptyState";
import { Button } from "@/components/ui/button";
import { useGetAllAddresses } from "@/hooks/queries/address/getAllAddresses";
import { IAddress } from "@/interfaces/address.interface";
import { useState } from "react";

const Addresses = () => {
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

  const { addresses, fetchingAddresses } = useGetAllAddresses();

  const [localSelectedAddress, setLocalSelectedAddress] = useState<
    IAddress | undefined
  >(undefined);
  const handleSelectAddress = (address: IAddress) => {
    setLocalSelectedAddress(address);
  };

  return (
    <>
      <div className="space-y-4 overflow-hidden">
        <div className="flex justify-between">
          <p className="text-xl font-medium capitalize">Shipping Addresses</p>
          {addresses && addresses.length !== 0 && (
            <Button
              variant="primary"
              className="rounded-full font-medium"
              onClick={() => setOpenNewAddressDialog(true)}
            >
              Add New Address
            </Button>
          )}
        </div>
        {fetchingAddresses ? (
          <div className="grid grid-cols-2 gap-6">
            <div className="animate-pulse bg-gray-200 w-full h-40"></div>
            <div className="animate-pulse bg-gray-200 w-full h-40"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {addresses && addresses.length === 0 ? (
              <AddressEmptyState
                setOpenNewAddressDialog={setOpenNewAddressDialog}
              />
            ) : (
              addresses?.map((address, index) => (
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
                  onSelectClick={() => handleSelectAddress(address)}
                  isSelected={localSelectedAddress?.id === address.id}
                />
              ))
            )}
          </div>
        )}
      </div>

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
export default Addresses;
