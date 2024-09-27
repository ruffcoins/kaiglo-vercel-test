export type ISignUpResponse = {
  response: string;
  message: string;
};

export type ISignInResponse = {
  response: string;
  message: string;
};

export interface IVerifyOtpErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  path: string;
}

export interface IUpdateUserResponse {
  response: string;
  message: string;
}
