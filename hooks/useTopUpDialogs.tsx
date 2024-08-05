"use client";

import { useState } from "react";

const useTopUpDialogs = () => {
  const [showFirstConfirmation, setShowFirstConfirmation] = useState(false);
  const [showTopUpDialog, setShowTopUpDialog] = useState(false);
  const [showSecondConfirmation, setShowSecondConfirmation] = useState(false);

  const handleTopUpClick = () => {
    setShowFirstConfirmation(true);
  };

  const handleFirstConfirmationClose = () => {
    setShowFirstConfirmation(false);
    setShowTopUpDialog(true);
  };

  const handleTopUpSubmit = () => {
    setShowTopUpDialog(false);
    setShowSecondConfirmation(true);
  };

  const handleSecondConfirmationClose = () => {
    setShowSecondConfirmation(false);
  };

  return {
    showFirstConfirmation,
    setShowFirstConfirmation,
    showTopUpDialog,
    setShowTopUpDialog,
    showSecondConfirmation,
    setShowSecondConfirmation,
    handleTopUpClick,
    handleFirstConfirmationClose,
    handleTopUpSubmit,
    handleSecondConfirmationClose,
  };
};

export default useTopUpDialogs;
