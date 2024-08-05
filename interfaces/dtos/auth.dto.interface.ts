/*********** SIGN UP FORM DTO ***********/
export interface ISignUpFormDTO {
  firstName: string;
  email: string;
  phone: string;
  otpChannel: string;
  platform: string;
  referralCode?: string;
}

/*********** SIGN IN FORM DTO ***********/
export interface ISignInFormDTO {
  email: string;
  phone: string;
  otpChannel: string;
}

/*********** COMMON AUTH FORM DTO ***********/
export interface CommonAuthFormDTO {
  firstName?: string;
  email: string;
  phone: string;
  otpChannel: string;
  platform?: string;
  referralCode?: string;
}

/*********** OTP FORM DTO ***********/
export interface IOtpFormDTO {
  email: string;
  phone: string;
  otp: string;
}
