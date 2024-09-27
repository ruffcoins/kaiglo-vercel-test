import { IWalletHistory, UserWallet } from "../wallet.interface";
import { Pageable, Sort } from "./product.interface";
import { UserResponse } from "./user.interface";

export interface IWalletHistoryResponse {
  content: IWalletHistory[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface IUserWalletResponse {
  response: UserWallet;
  message: string;
}

export interface IFundWalletResponse {
  response: FundWallet;
  message: string;
}

export interface IDebitWalletResponse {
  response: DebitWallet;
  message: string;
}

interface FundWallet {
  active: boolean;
  amount: number;
  createdDate: string;
  id: string;
  updatedDate: string;
  user: UserResponse;
}

interface DebitWallet {
  active: boolean;
  amount: number;
  createdDate: string;
  id: string;
  updatedDate: string;
  user: UserResponse;
}
