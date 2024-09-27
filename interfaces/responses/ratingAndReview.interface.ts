import { Pageable, Sort } from "./product.interface";

export interface IRatingAndReviewResponse {
  message: string;
  response: string;
}

export interface Review {
  comment: string;
  createdDate: string;
  fullName: string;
  id: string;
  profilePic: string;
  updatedDate: string;
  userRating: number;
}

export interface IReviewsResponse {
  content: Review[];
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

export interface IRatingAndReviewSummaryResponse {
  id: string;
  createdDate: string;
  updateDate: string;
  averageRating: number;
  totalNumberOfReviews: number;
  frequencyOfRatings: {
    [key: number]: number;
  };
  totalNumberOfRatings: number;
  productID: string;
  storeID: string;
}
