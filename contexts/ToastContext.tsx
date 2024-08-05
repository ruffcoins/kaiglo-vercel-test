"use client";

import React, { createContext, ReactNode, useContext } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

export interface ToastOptions {
  variant: "default" | "destructive" | "success" | null | undefined;
  title?: string | undefined;
  description?: string | undefined;
  altText: string;
  actionTitle?: string;
  actionExists: boolean;
  className?: string;
}

interface ToastContextType {
  triggerToast: (options: ToastOptions) => void;
}

const defaultContextValue: ToastContextType = {
  triggerToast: () => {},
};

const ToastContext = createContext<ToastContextType>(defaultContextValue);

const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();

  const triggerToast = (options: ToastOptions) => {
    const {
      variant,
      title,
      description,
      actionExists,
      altText,
      actionTitle,
      className,
    } = options;

    toast({
      variant,
      title,
      description,
      action: actionExists ? (
        <ToastAction altText={altText} className={cn(className)}>
          {actionTitle}
        </ToastAction>
      ) : undefined,
      className: cn(className),
    });
  };

  return (
    <ToastContext.Provider value={{ triggerToast }}>
      {children}
      <Toaster data-testid="toast" />
    </ToastContext.Provider>
  );
};

const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
};

export { ToastProvider, useToastContext };
