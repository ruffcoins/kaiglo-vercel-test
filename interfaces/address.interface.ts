export interface IAddress {
  city: string;
  defaultAddress: boolean;
  firstName: string;
  lastName: string;
  name: string;
  phoneNumber: string;
  state: string;
  id: string;
}

export interface ILocalGovt {
  name: string | null;
  price: string | null;
  paidOnDelivery: boolean;
}

export interface IState {
  id: string;
  name: string;
  localGovts: ILocalGovt[];
  createdDate: string;
  updateDate: string;
}
