import { yupResolver } from "@hookform/resolvers/yup";
import {
  signUpSchema,
  signInSchema,
  otpSchema,
  addAddressSchema,
  updateAddressSchema,
} from "@/lib/validations/schemas";

/*********** SIGN UP FORM RESOLVER ***********/
export const signUpResolver = yupResolver(signUpSchema);

/*********** SIGN IN FORM RESOLVER ***********/
export const signInResolver = yupResolver(signInSchema);

/*********** OTP FORM RESOLVER ***********/
export const otpResolver = yupResolver(otpSchema);

/*********** ADD ADDRESS FORM RESOLVER ***********/
export const addAddressResolver = yupResolver(addAddressSchema);

/*********** UPDATE ADDRESS FORM RESOLVER ***********/
export const updateAddressResolver = yupResolver(updateAddressSchema);
