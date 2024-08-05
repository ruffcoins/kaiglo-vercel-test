import Image from "next/image";
import Shipping from "@/public/images/empty-state-shipping.svg";
import { Button } from "@/components/ui/button";
import { SetStateAction } from "react";

const AddressEmptyState = ({
  setOpenNewAddressDialog,
}: {
  setOpenNewAddressDialog: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="h-[calc(100vh-24rem)] col-span-full flex flex-col items-center justify-center space-y-4">
      <Image src={Shipping} alt="order box" className="w-14 h-14" />
      <p className="font-bold">You have not set up any address yet.</p>
      <Button
        variant="primary"
        className="w-48 font-medium rounded-full"
        onClick={() => setOpenNewAddressDialog(true)}
      >
        Add Address
      </Button>
    </div>
  );
};
export default AddressEmptyState;
