import ControlledModifiedInput from "@/components/ControlledElements/ControlledModifiedInput";
import { addAddressDefaultValues } from "@/lib/validations/defaults";
import { addAddressResolver } from "@/lib/validations/resolvers";
import { useForm } from "react-hook-form";
import { AddAddressFormDTO } from "@/interfaces/dtos/address.dto.interface";
import ControlledModifiedSelect from "@/components/ControlledElements/ControlledModifiedSelect";
import { useEffect, useState } from "react";
import useAddAddress from "@/hooks/mutation/address/addAddress";
import ModifiedButton from "@/components/shared/ModifiedButton";
import { AddAddressFormProps } from "@/interfaces/elements.interface";

const AddAddressForm = ({ stateAndCities, setOpen }: AddAddressFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<AddAddressFormDTO>({
    defaultValues: addAddressDefaultValues,
    resolver: addAddressResolver,
  });

  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  const { addAddress, addingAddress } = useAddAddress();

  const onSubmit = (values: AddAddressFormDTO) => {
    addAddress(values);
    reset();
    setOpen(false);
  };

  const state = watch("state");

  useEffect(() => {
    if (state && state.length > 0) {
      const selectedStateData = stateAndCities.find(
        (stateItem) => stateItem.name === state,
      );
      setFilteredCities(selectedStateData ? selectedStateData.cities : []);
    } else {
      setFilteredCities([]);
    }
  }, [state, stateAndCities]);

  return (
    <div className="pt-6 transition-all duration-300 ease-in-out">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 space-y-4">
          <ControlledModifiedInput
            name="firstName"
            control={control}
            rules={{ required: true }}
            placeholder="First name"
            type="text"
            error={errors.firstName}
            isRequired={true}
            data-testid="firstName"
          />

          <ControlledModifiedInput
            name="lastName"
            control={control}
            rules={{ required: true }}
            placeholder="Last name"
            type="text"
            error={errors.lastName}
            isRequired={true}
            data-testid="lastName"
          />

          <ControlledModifiedInput
            name="name"
            control={control}
            rules={{ required: true }}
            placeholder="Enter Address e.g 11 Southwest Avenue"
            type="text"
            error={errors.name}
            isRequired={true}
            data-testid="name"
          />

          <ControlledModifiedSelect
            name="state"
            control={control}
            rules={{ required: true }}
            placeholder="Select State"
            error={errors.state}
            options={stateAndCities.map((state) => state.name)}
            data-testid="state"
          />

          <ControlledModifiedSelect
            options={filteredCities}
            name="city"
            control={control}
            rules={{ required: true }}
            placeholder="Select City"
            error={errors.city}
            data-testid="city"
          />

          <div className="relative">
            <span className="absolute bg-kaiglo_grey-disabled text-base w-[72px] rounded-l-lg ml-[1px] h-[46px] flex justify-center items-center border-0 mt-[1px]">
              +234
            </span>
            <ControlledModifiedInput
              name="phoneNumber"
              control={control}
              rules={{ required: true }}
              placeholder="e.g (08062355589)"
              type="tel"
              error={errors.phoneNumber}
              isRequired={true}
              classNames="pl-20"
              data-testid="phone"
            />
          </div>

          <ModifiedButton
            type={"submit"}
            value={addingAddress ? "Please wait..." : "Add Address"}
            disabled={addingAddress || Object.keys(errors).length > 0}
            className="rounded-full w-full h-12 font-medium"
          />
        </div>
      </form>
    </div>
  );
};
export default AddAddressForm;
