"use client";

import ControlledModifiedSelect from "@/components/ControlledElements/ControlledModifiedSelect";
import ControlledModifiedTextArea from "@/components/ControlledElements/ControlledModifiedTextArea";
import ModifiedButton from "@/components/shared/ModifiedButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import useUpdateOrderStatus from "@/hooks/mutation/order/updateOrderStatus";
import {
  IUpdateOrderStatusDTO,
  orderStatusEnum,
} from "@/interfaces/dtos/order.dto.interface";
import { updateOrderStatusDefaultValues } from "@/lib/validations/defaults";
import { updateOrderStatusResolver } from "@/lib/validations/resolvers";
import Auth from "@/utils/auth";
import { SetStateAction, useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const returnReasons = [
  { label: "Item arrived damaged", value: "damaged" },
  { label: "Wrong item was sent", value: "wrong_item" },
  { label: "Item did not match description", value: "not_as_described" },
  { label: "Item is no longer needed", value: "no_longer_needed" },
  { label: "Found a better price elsewhere", value: "better_price" },
  { label: "Other", value: "other" },
];

const RequestReturn = ({
  open,
  setOpen,
  orderId,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  orderId: string;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateOrderStatusDTO>({
    defaultValues: {
      ...updateOrderStatusDefaultValues,
      accessToken: Auth.getToken() as string,
      id: orderId,
    },
    resolver: updateOrderStatusResolver,
  });

  const { updateOrderStatusAsync, updatingOrderStatus } =
    useUpdateOrderStatus(orderId);

  const onSubmit = useCallback(
    async (values: IUpdateOrderStatusDTO) => {
      const request: IUpdateOrderStatusDTO = {
        accessToken: Auth.getToken() as string,
        id: orderId,
        orderStatus: orderStatusEnum.RETURNED,
        reason: values.reason,
        additionalMessage: values.additionalMessage,
      };
      await updateOrderStatusAsync(request);
      setOpen(false);
    },
    [orderId, updateOrderStatusAsync],
  );

  const returnReasonsOptions = useMemo(
    () => returnReasons.map((reason) => reason.label),
    [],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lg:w-[400px]">
        <DialogTitle>Request Return</DialogTitle>
        <DialogDescription />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 space-y-4 mt-4">
            <ControlledModifiedSelect
              name="reason"
              control={control}
              rules={{ required: true }}
              placeholder={"Reason for Returning"}
              error={errors.reason}
              options={returnReasonsOptions}
              required={true}
            />

            <ControlledModifiedTextArea
              name="additionalMessage"
              control={control}
              rules={{ required: true }}
              placeholder="Additional Information"
              error={errors.additionalMessage}
              rows={4}
              required={true}
            />

            <ModifiedButton
              type={"submit"}
              value={updatingOrderStatus ? "Please wait..." : "Return Order"}
              disabled={updatingOrderStatus || Object.keys(errors).length > 0}
              className="rounded-full w-full h-12 font-medium"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestReturn;
