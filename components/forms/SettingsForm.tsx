"use client";

import ControlledModifiedInput from "@/components/ControlledElements/ControlledModifiedInput";
import ModifiedButton from "@/components/shared/ModifiedButton";
import { useUpdateUser } from "@/hooks/mutation/auth/updateUser";
import { useFetchUserProfile } from "@/hooks/queries/userProfile";
import { UpdateUserFormDTO } from "@/interfaces/dtos/updateUser.dto.interface";
import { updateUserResolver } from "@/lib/validations/resolvers";
import { PersonIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const SettingsForm = () => {
  const { user, fetchingUser } = useFetchUserProfile();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserFormDTO>({
    defaultValues: {
      firstName,
      lastName,
      phone,
    },
    resolver: updateUserResolver,
  });

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhone(user.phone);
    }
  }, [user]);

  const { updateUser, updatingUser } = useUpdateUser();

  const onSubmit = (values: UpdateUserFormDTO) => {
    updateUser(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="w-full grid gap-4 lg:grid-cols-12 col-span-1 px-4 lg:px-0">
        <div className="flex lg:justify-center items-center col-span-1">
          <span className="border rounded-full p-8">
            <PersonIcon className="min-w-6 min-h-6" />
          </span>
        </div>

        <div className="grid lg:grid-cols-2 lg:col-span-11 lg:gap-6 gap-4 lg:ml-6">
          <ControlledModifiedInput
            name="firstName"
            control={control}
            placeholder={firstName || "First Name"}
            type="text"
            error={errors.firstName}
            isRequired={false}
            classNames=""
            rules={{ required: false }}
            data-testid="firstName"
          />

          <ControlledModifiedInput
            name="lastName"
            control={control}
            placeholder={lastName || "Last Name"}
            type="text"
            error={errors.lastName}
            isRequired={false}
            classNames=""
            rules={{ required: false }}
            data-testid="lastName"
          />

          <div className="relative">
            <span className="absolute bg-kaiglo_grey-disabled text-base w-[72px] rounded-l-lg ml-[1px] h-[46px] flex justify-center items-center border-0 mt-[1px]">
              +234
            </span>
            <ControlledModifiedInput
              name="phone"
              control={control}
              rules={{ required: true }}
              placeholder={phone || "Phone Number"}
              type="tel"
              error={errors.phone}
              isRequired={true}
              classNames="pl-20"
              data-testid="phone"
            />
          </div>
        </div>

        <ModifiedButton
          variant="primary"
          disabled={updatingUser || fetchingUser}
          className="lg:w-fit font-medium rounded-full px-8 py-3 lg:ml-32 mt-10"
          value="Update Profile"
          type="submit"
        />
      </div>
    </form>
  );
};
export default SettingsForm;
