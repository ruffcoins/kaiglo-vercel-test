import {
  IOtpFormDTO,
  ISignInFormDTO,
  ISignUpFormDTO,
} from "@/interfaces/dtos/auth.dto.interface";

/*********** SIGN UP FORM DEFAULTS ***********/
export const signUpDefaultValues: ISignUpFormDTO = {
  email: "",
  firstName: "",
  phone: "",
  otpChannel: "ALL",
  platform: "WEB",
  referralCode: "",
};

/*********** SIGN IN FORM DEFAULTS ***********/
export const signInDefaultValues: ISignInFormDTO = {
  email: "",
  phone: "",
  otpChannel: "ALL",
};

/*********** OTP FORM DEFAULTS ***********/
export const otpDefaultValues: IOtpFormDTO = {
  email: "",
  phone: "",
  otp: "",
};

/*********** ADD ADDRESS FORM DEFAULTS ***********/
export const addAddressDefaultValues = {
  city: "",
  defaultAddress: false,
  firstName: "",
  lastName: "",
  name: "",
  phoneNumber: "",
  state: "",
};

/*********** UPDATE ADDRESS FORM DEFAULTS ***********/
export const updateAddressDefaultValues = {
  city: "",
  defaultAddress: false,
  firstName: "",
  lastName: "",
  name: "",
  phoneNumber: "",
  state: "",
  id: "",
};

export const updateOrderStatusDefaultValues = {
  accessToken: "",
  additionalMessage: "",
  id: "",
  orderStatus: "PENDING",
  reason: "",
};
