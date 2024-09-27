import { IAddress } from "../address.interface";
import { IProduct } from "../product.interface";
import { StoreRating, StoreSummary } from "./order.interface";
import { Pageable, Sort } from "./product.interface";
import { BoughtItem, CartItem, WishListItem } from "./user.interface";

interface Role {
  createdDate: string;
  description: string;
  id: string;
  name: string;
  permissions: {
    createdDate: string;
    description: string;
    id: string;
    name: string;
    updateDate: string;
    userType: string;
  }[];
  updateDate: string;
  userType: string;
}

interface Owner {
  active: boolean;
  address: IAddress[];
  boughtItems: BoughtItem[];
  cart: CartItem[];
  cartItemSize: number;
  createdDate: string;
  currentOtp: string;
  day: number;
  dob: string;
  email: string;
  emailCountDown: number;
  firebaseToken: string;
  firstName: string;
  fullName: string;
  gender: string;
  id: string;
  lastLoggedIn: string;
  lastName: string;
  month: number;
  newUser: boolean;
  phone: string;
  pictureUrl: string;
  platform: string;
  provider: string;
  receivedDailyReward: boolean;
  role: Role;
  roles: string[];
  updatedDate: string;
  week: number;
  wishListItems: WishListItem[];
  year: number;
}

interface Store {
  // bankDetails: {
  //   account_name: string;
  //   account_number: string;
  //   bank: {
  //     code: string;
  //     id: string;
  //     logo: string;
  //     name: string;
  //     slug: string;
  //     ussd: string;
  //   };
  //   id: string;
  // };
  // bannerImage: string;
  // bestSellingProducts: {
  //   productName: string;
  //   productUrl: string;
  //   sold: number;
  //   totalSales: number;
  // }[];
  // category: string;
  // closestMarket: string;
  // coupons: {
  //   active: boolean;
  //   admin: boolean;
  //   appliedToAll: number;
  //   expiresAt: string;
  //   id: string;
  //   name: string;
  //   productCoupons: {
  //     id: string;
  //     name: string;
  //     url: string;
  //   }[];
  //   productIds: string[];
  //   stores: {
  //     name: string;
  //     storeId: string;
  //   }[];
  //   type: string;
  //   value: number;
  // }[];
  // createdDate: string;
  // description: string;
  // id: string;
  // isFollowingStore: boolean;
  // location: string;
  // newPhoneNumber: string;
  // owner: Owner;
  // pendingOrder: number;
  // phoneNumber: string;
  // profilePic: string;
  // recentBuyers: {
  //   pictureUrl: string;
  //   productName: string;
  //   userName: string;
  // }[];
  // sales: number;
  // stock: number;
  // storeIdentity: {
  //   address: string;
  //   name: string;
  //   verificationDocument: {
  //     documentPic: string;
  //     documentType: string;
  //   }[];
  // };
  // storeName: string;
  // storeRating: {
  //   comment: string;
  //   communicationRating: {
  //     communication: number;
  //     count: number;
  //     sum: number;
  //   };
  //   deliveryRating: {
  //     count: number;
  //     delivery: number;
  //     sum: number;
  //   };
  //   qualityRating: {
  //     count: number;
  //     quality: number;
  //     sum: number;
  //   };
  // };
  // storeSummary: {
  //   followers: number;
  //   productCount: number;
  //   successfulSales: number;
  // };
  // storeUrl: string;
  // updatedDate: string;
  // visit: number;
  products: IProduct[];
  id: string;
  storeName: string;
  storeUrl: string;
  location: string;
  closestMarket: string;
  phoneNumber: string;
  category: string;
  description: string;
  storeSummary: StoreSummary;
  storeRating: StoreRating;
  advertMoney: any | null;
  visit: any | null;
  pendingOrder: any | null;
  stock: any | null;
  sales: number;
  profilePic: string;
  bannerImage: string;
  owner: Owner;
  followingStore: boolean;
}

export interface IStoreDetailsResponse {
  message: string;
  response: Store;
}

export interface IStoreProductsResponse {
  content: IProduct[];
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

export interface IFollowStoreResponse {
  response: boolean;
  message: string;
}

export interface IUnfollowStoreResponse {
  response: boolean;
  message: string;
}
