"use client";

import { createContext, useContext, useState } from "react";

interface AuthModalContextType {
  openAuthModal: boolean;
  setOpenAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
  showOtpModal: boolean;
  setShowOtpModal: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  resetAuthModal: () => void;
}

interface AuthModalProviderProps {
  children: React.ReactNode;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined,
);

const AuthModalProvider: React.FC<AuthModalProviderProps> = ({ children }) => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const resetAuthModal = () => {
    setOpenAuthModal(false);
    setShowOtpModal(false);
    setEmail("");
    setPhone("");
  };

  return (
    <AuthModalContext.Provider
      value={{
        openAuthModal,
        setOpenAuthModal,
        showOtpModal,
        setShowOtpModal,
        email,
        setEmail,
        phone,
        setPhone,
        resetAuthModal,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

const useAuthModalContext = () => {
  const context = useContext(AuthModalContext);

  if (!context) {
    throw new Error(
      "useAuthModalContext must be used within an AuthModalProvider",
    );
  }

  return context;
};

export { AuthModalProvider, useAuthModalContext };
