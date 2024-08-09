"use client";

import ControlledModifiedSelect from "@/components/ControlledElements/ControlledModifiedSelect";
import ControlledModifiedTextArea from "@/components/ControlledElements/ControlledModifiedTextArea";
import ModifiedButton from "@/components/shared/ModifiedButton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import useUpdateOrderStatus from "@/hooks/mutation/order/updateOrderStatus";
import {
  IUpdateOrderStatusDTO,
  orderStatusEnum,
} from "@/interfaces/dtos/order.dto.interface";
import { updateOrderStatusDefaultValues } from "@/lib/validations/defaults";
import { updateOrderStatusResolver } from "@/lib/validations/resolvers";
import Auth from "@/utils/auth";
import { SetStateAction, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";

const cancelReasons = [
  { label: "Changed my mind", value: "changed_mind" },
  { label: "Order created by mistake", value: "mistake" },
  { label: "Found a better price elsewhere", value: "better_price" },
  { label: "Item would not arrive on time", value: "late_delivery" },
  { label: "Shipping cost too high", value: "high_shipping_cost" },
  { label: "Other", value: "other" },
];

const CancelOrderDialog = ({
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
        orderStatus: orderStatusEnum.CANCELLED_ORDER,
        reason: values.reason,
        additionalMessage: values.additionalMessage,
      };
      await updateOrderStatusAsync(request);
      setOpen(false);
    },
    [orderId, updateOrderStatusAsync],
  );

  const cancelReasonOptions = useMemo(
    () => cancelReasons.map((reason) => reason.label),
    [],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[400px]">
        <DialogTitle>Cancel Order</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 space-y-4 mt-4">
            <ControlledModifiedSelect
              name="reason"
              control={control}
              rules={{ required: true }}
              placeholder={"Reason for Cancelling"}
              error={errors.reason}
              options={cancelReasonOptions}
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
              value={updatingOrderStatus ? "Please wait..." : "Cancel Order"}
              disabled={updatingOrderStatus || Object.keys(errors).length > 0}
              className="rounded-full w-full h-12 font-medium"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default CancelOrderDialog;
