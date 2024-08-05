"use client";

import { ToastOptions, useToastContext } from "@/contexts/ToastContext";
import { useCallback } from "react";

const useShowToast = () => {
  const { triggerToast } = useToastContext();

  const showToast = useCallback(
    ({
      altText,
      title,
      description,
      variant,
      actionExists,
      actionTitle,
    }: ToastOptions) => {
      triggerToast({
        variant: variant,
        title: title,
        description: description,
        altText: altText,
        actionExists: actionExists,
        className: "capitalize",
        actionTitle: actionTitle,
      });
    },
    [triggerToast],
  );

  return showToast;
};

export default useShowToast;
