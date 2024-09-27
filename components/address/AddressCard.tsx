import Image from "next/image";
import { Button } from "@/components/ui/button";
import Shipping from "@/public/images/shipping-white.svg";
import { Badge } from "@/components/ui/badge";
import Trash from "@/public/images/trash.svg";
import { truncate } from "@/lib/utils";
import useMakeAddressDefault from "@/hooks/mutation/address/makeAddressDefault";
import { UpdateAddressFormDTO } from "@/interfaces/dtos/address.dto.interface";

const AddressCard = ({
  id,
  firstName,
  lastName,
  address,
  city,
  state,
  defaultAddress,
  phoneNumber,
  index,
  onEditClick,
  onDeleteClick,
  isSelected,
  onSelectClick,
}: {
  id: string;
  index: number;
  defaultAddress: boolean;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  onEditClick: () => void;
  onDeleteClick: () => void;
  isSelected: boolean;
  onSelectClick: () => void;
}) => {
  const { makeAddressDefault, makingAddressDefault } = useMakeAddressDefault();

  const onSubmit = (values: UpdateAddressFormDTO) => {
    makeAddressDefault(values);
  };

  return (
    <>
      <div className="p-2 flex flex-col space-y-4 border rounded-lg">
        <div className="flex flex-row items-center border justify-between p-2 rounded bg-kaiglo_grey-100">
          <div className="flex space-x-2 items-center mb-0">
            <input
              type="radio"
              id={`address-${id}`}
              name="selected-address"
              checked={isSelected}
              onChange={onSelectClick}
              className="bg-kaiglo_critical-base checked:bg-kaiglo_critical-base"
            />
            <label
              htmlFor={`address-${id}`}
              className="flex-grow cursor-pointer"
            />
            <p className="text-sm font-medium text-kaiglo_grey-base">
              Address {index}
            </p>
          </div>

          {defaultAddress ? (
            <Badge
              variant="attention_solid"
              className="h-7 px-3 py-1 flex space-x-2 text-white rounded-lg font-medium text-sm"
            >
              <Image
                src={Shipping}
                width={16}
                height={16}
                className="w-4 h-4"
                alt="shipping icon"
              />
              <span>Default</span>
            </Badge>
          ) : (
            <Button
              variant="link"
              className="h-7 px-3 py-1 flex space-x-2 rounded-lg font-medium"
              onClick={() =>
                onSubmit({
                  id,
                  city,
                  state,
                  defaultAddress,
                  firstName,
                  lastName,
                  name: address,
                  phoneNumber,
                })
              }
              disabled={makingAddressDefault}
            >
              Set as Default
            </Button>
          )}
        </div>

        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col items-start space-y-0.5">
              <p className="font-medium text-xs text-kaiglo_grey-500">
                Full Name
              </p>
              <p className="text-sm">{firstName + " " + lastName}</p>
            </div>
            <div className="flex flex-col items-start space-y-0.5">
              <p className="font-medium text-xs text-kaiglo_grey-500">
                Phone Number
              </p>
              <p className="text-sm">{phoneNumber}</p>
            </div>
            <div className="flex flex-col items-start space-y-0.5 h-12 overflow-hidden">
              <p className="font-medium text-xs text-kaiglo_grey-500">
                Address
              </p>
              <p className="text-sm break-words">{truncate(address, 30)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col items-start space-y-0.5">
              <p className="font-medium text-xs text-kaiglo_grey-500">City</p>
              <p className="text-sm">{city}</p>
            </div>
            <div className="flex flex-col items-start space-y-0.5">
              <p className="font-medium text-xs text-kaiglo_grey-500">State</p>
              <p className="text-sm">{state}</p>
            </div>
            <div className="flex space-x-3 justify-start lg:justify-end mt-2 lg:mt-0">
              <Button
                variant="secondary"
                className="py-2 px-4 font-medium"
                onClick={onEditClick}
              >
                Edit
              </Button>
              <Button
                variant="critical"
                className="p-2"
                onClick={onDeleteClick}
              >
                <Image
                  src={Trash}
                  alt="trash icon"
                  className="w-6 h-6"
                  width={24}
                  height={24}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddressCard;
