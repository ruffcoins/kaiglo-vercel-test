import { IWalletHistory } from "../wallet.interface";
import { Pageable, Sort } from "./product.interface";

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
