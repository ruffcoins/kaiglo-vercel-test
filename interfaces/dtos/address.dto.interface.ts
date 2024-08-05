/*********** ADD ADDRESS FORM DTO ***********/
export interface AddAddressFormDTO {
  city: string;
  defaultAddress: boolean;
  firstName: string;
  lastName: string;
  name: string;
  phoneNumber: string;
  state: string;
}

/*********** *************/
export interface UpdateAddressFormDTO {
  city: string;
  defaultAddress: boolean;
  firstName: string;
  lastName: string;
  name: string;
  phoneNumber: string;
  state: string;
  id: string;
}
