// import { ProductStatus } from "@/types/app.type";
// import { ButtonVariants } from "@/types/element.type";
import { OrderStatus } from "@/enums/orderStatus.enum";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { IAddress, IState } from "./address.interface";

/********** MODIFIED BADGE PROPS ***********/
export interface ModifiedBadgeProps {
  status?: OrderStatus;
  className?: string;
}

/********** MODIFIED BUTTON PROPS ***********/
export interface ModifiedButtonProps {
  type: "button" | "submit" | "reset";
  value: string | ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "critical"
    | "critical_solid"
    | "outline"
    | "attention"
    | "attention_solid"
    | "purple"
    | "purple_solid"
    | "info"
    | "info_solid"
    | "ghost"
    | "link"
    | "accent";
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/********** MODIFIED TOAST PROPS ***********/
export interface ModifiedToastProps {
  variant: "default" | "destructive" | null | undefined;
  title?: string | undefined;
  description?: string | undefined;
  altText: string;
  actionTitle?: string;
  actionExists: boolean;
  className: string;
}

/*********** MODIFIED INPUT PROPS ***********/
export interface ModifiedInputProps {
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  classNames?: string;
  onValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.ForwardedRef<HTMLInputElement>;
  label?: string;
  labelClassNames?: string;
  isRequired?: boolean;
}

/*********** MODIFIED TEXT AREA PROPS *********/
export interface ModifiedTextAreaProps {
  id: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  classNames?: string;
  required?: boolean;
  rows: number;
}

/*********** AUTH DIALOG PROPS ***********/
export interface AuthDialogProps {
  openAuthModal: boolean;
  setOpenAuthModal: Dispatch<SetStateAction<boolean>>;
  setShowOtpModal: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setPhone: Dispatch<SetStateAction<string>>;
}

/*********** AUTH FORM PROPS ***********/
export interface AuthFormProps {
  showLogin: boolean;
  showReferraInput: boolean;
  setShowReferralInput: Dispatch<SetStateAction<boolean>>;
  setShowOtpModal?: Dispatch<SetStateAction<boolean>>;
  setOpenAuthModal?: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setPhone: Dispatch<SetStateAction<string>>;
}

/****************** MODIFIED DROPDOWN ******************/
export interface ModifiedDropdownProps {
  trigger: string | ReactNode;
  triggerClassName?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  data: any[];
  itemClassName?: string;
  contentClassName?: string;
  hasLabel?: boolean;
  label?: string;
  labelClassName?: string;
  type?: "notification" | "user";
  notificationCount?: number;
  onOpenChange?: (open: boolean) => void;
}

/****************** USER DROPDOWN MENU PROPS ******************/
export interface UserDropdownMenuProps {
  title: string;
  description?: string;
  icon?: string | ReactNode;
  onItemClick?: () => void;
  itemClassName?: string;
}

/*********** ADD ADDRESS FORM PROPS ***********/
export interface AddAddressFormProps {
  stateAndCities: IState[];
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

/*********** UPDATE ADDRESS FORM PROPS ***********/
export interface UpdateAddressFormProps {
  stateAndCities: IState[];
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  initialValues: IAddress;
}
