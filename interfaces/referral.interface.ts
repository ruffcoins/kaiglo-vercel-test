import { UserResponse } from "./responses/user.interface";

export interface IReferral {
  id: string;
  referralBonus: number;
  referralCode: string;
  referredBy: ReferralObject;
  referredList: ReferralObject[];
  updateDate: string;
  user: UserResponse;
  createDate: string;
}

export interface ReferralObject {
  amount: number;
  dateReferred: string;
  email: string;
  name: string;
  paid: boolean;
  userId: string;
}
