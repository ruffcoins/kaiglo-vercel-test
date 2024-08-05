import * as yup from "yup";

/*********** SIGN UP FORM SCHEMA ***********/
export const signUpSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup.string().required("Phone Number is required"),
  otpChannel: yup.string().required("OTP Channel is required"),
  platform: yup.string().required("Platform is required"),
  referralCode: yup.string(),
});

/*********** SIGN IN FORM SCHEMA ***********/
export const signInSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup.string().required("Phone Number is required"),
  otpChannel: yup.string().required("OTP Channel is required"),
});

/*********** OTP FORM SCHEMA ***********/
export const otpSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup.string().required("Phone Number is required"),
  otp: yup.string().required("OTP is required"),
});

/*********** ADD ADDRESS FORM SCHEMA ***********/
export const addAddressSchema = yup.object({
  name: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  defaultAddress: yup.boolean().required("Default Address is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
});

/*********** UPDATE ADDRESS FORM SCHEMA ***********/
export const updateAddressSchema = yup.object({
  name: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  defaultAddress: yup.boolean().required("Default Address is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  id: yup.string().required("Address ID is required"),
});
