import { IAddress, IState } from "../address.interface";

/********** GET ALL ADDRESSES RESPONSES **********/
export interface IGetAllAddressesResponse {
  response: IAddress[];
  message: string;
}

export interface IGetStatesAndCitiesResponse {
  response: IState[];
  message: string;
}
