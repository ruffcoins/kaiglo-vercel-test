import { IAddress } from "../address.interface";
import { IOrder, OrderItem } from "../orders/order.interface";
import { ProductPriceDetail } from "../product.interface";
import { BoughtItem, CartItem, WishListItem } from "./user.interface";

export interface OrderResponse {
  response: IOrder;
  string: string;
}

export interface IOrderTimeLineResponse {
  response: IOrderTimeLine;
  message: string;
}

interface IOrderTimeLine {
  id: string;
  orderId: string;
  orderNumber: string;
  orderDate: string;
  timeLines: TimeLine[];
}

export interface TimeLine {
  time: string;
  description: string;
  status: string;
}

export interface UserOrderResponse {
  message: string;
  response: UserOrder[];
}

export interface UserOrder {
  address: string;
  appliedCoupon: string;
  buyer: string;
  createdDate: string;
  email: string;
  id: string;
  issue: Issue;
  orderItem: OrderItem;
  orderNumber: string;
  orderRateStatus: boolean;
  orderStatus: string;
  paymentOption: string;
  platform: string;
  productPriceDetail: ProductPriceDetail;
  productType: string;
  shippingCost: string;
  storeId: string;
  storeName: string;
  txnReference: string;
  updatedDate: string;
  userId: string;
}

export interface Issue {
  createdDate: string;
  handler: Handler;
  id: string;
  issueAdditionstring: string;
  issueSubject: string;
  resolutionstring: string;
  resolutionTime: string;
  resolvedBy: Handler;
  status: string;
  store: IssueStore;
  transactionHistory: TransactionHistory;
  transactionRef: string;
}

export interface Handler {
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

export interface Role {
  createdDate: string;
  description: string;
  id: string;
  name: string;
  permissions?: Permission[];
  updateDate: string;
  userType: string;
}

export interface Permission {
  createdDate: string;
  description: string;
  id: string;
  name: string;
  updateDate: string;
  userType: string;
}

export interface IssueStore {
  bankDetails: BankDetails;
  bannerImage: string;
  bestSellingProducts: BestSellingProduct[];
  category: string;
  closestMarket: string;
  coupons: Coupon[];
  createdDate: string;
  description: string;
  id: string;
  isFollowingStore: boolean;
  location: string;
  newPhoneNumber: string;
  owner: Handler;
  pendingOrder: number;
  phoneNumber: string;
  profilePic: string;
  recentBuyers: RecentBuyer[];
  sales: number;
  stock: number;
  storeIdentity: StoreIdentity;
  storeName: string;
  storeRating: StoreRating;
  storeSummary: StoreSummary;
  storeUrl: string;
  updatedDate: string;
  visit: number;
}

export interface BankDetails {
  account_name: string;
  account_number: string;
  bank: Bank;
  id: string;
}

export interface Bank {
  code: string;
  id: string;
  logo: string;
  name: string;
  slug: string;
  ussd: string;
}

export interface BestSellingProduct {
  productName: string;
  productUrl: string;
  sold: number;
  totalSales: number;
}

export interface Coupon {
  active: boolean;
  admin: boolean;
  appliedToAll: number;
  expiresAt: string;
  id: string;
  name: string;
  productCoupons: ProductCoupon[];
  productIds: string[];
  store: IssueStore;
  stores: StoreElement[];
  type: string;
  value: number;
}

export interface ProductCoupon {
  id: string;
  name: string;
  url: string;
}

export interface RecentBuyer {
  pictureUrl: string;
  productName: string;
  userName: string;
}

export interface StoreIdentity {
  address: string;
  name: string;
  verificationDocument: VerificationDocument[];
}

export interface VerificationDocument {
  documentPic: string;
  documentType: string;
}

export interface StoreRating {
  comment: string;
  communicationRating: CommunicationRating;
  deliveryRating: DeliveryRating;
  qualityRating: QualityRating;
}

export interface CommunicationRating {
  communication: number;
  count: number;
  sum: number;
}

export interface DeliveryRating {
  count: number;
  delivery: number;
  sum: number;
}

export interface QualityRating {
  count: number;
  quality: number;
  sum: number;
}

export interface StoreSummary {
  followers: number;
  productCount: number;
  successfulSales: number;
}

export interface StoreElement {
  name: string;
  storeId: string;
}

export interface TransactionHistory {
  address: string;
  assignedTo: string;
  buyer: Handler;
  buyerEmail: string;
  buyerName: string;
  createdDate: string;
  gender: string;
  id: string;
  notes: Note[];
  orderItem: OrderItem;
  orderNumber: string;
  orderStatus: string;
  paymentOption: string;
  phoneNumber: string;
  platform: string;
  productType: string;
  resolved: boolean;
  resolvedNote: string;
  seller: Handler;
  sellerName: string;
  state: string;
  token: string;
  txnReference: string;
  updatedDate: string;
}

export interface Note {
  createdDate: string;
  id: string;
  noteText: string;
  updateDate: string;
  username: string;
}

export interface UpdateOrderStatusResponse {
  message: string;
  response: string;
}

export interface CreateOrderResponse {
  message: string;
  response: string;
}
