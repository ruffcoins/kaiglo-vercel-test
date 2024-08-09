import { UserResponse } from "./responses/user.interface";

export interface IWalletHistory {
  amount: string;
  channel: string;
  createDate: string;
  debitId: string;
  description: string;
  email: string;
  fullName: string;
  id: string;
  productName: string;
  reference: string;
  tranType: string;
  transactionId: string;
  user: UserResponse;
}

export interface UserWallet {
  id: string;
  amount: number;
  active: boolean;
  user: UserResponse;
  createdDate: string;
  updatedDate: string;
}
