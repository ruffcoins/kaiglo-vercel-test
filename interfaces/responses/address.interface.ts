import { IAddress } from "../address.interface";

/********** GET ALL ADDRESSES RESPONSES **********/
export interface IGetAllAddressesResponse {
  response: IAddress[];
  message: string;
}
