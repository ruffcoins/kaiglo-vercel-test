import { IProduct } from "../product.interface";

/********** FEATURED PRODUCTS **********/
export interface IFeaturedProductResponse {
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

/********** TOP SELLING PRODUCTS **********/
export interface ITopSellingProductResponse {
  response: IProduct[];
  message: string | null;
}

/********** NEW ARRIVALS **********/
export interface INewArrivalsProductResponse {
  response: IProduct[];
  message: string | null;
}

/********** GROUP BUY PRODUCTS **********/
export interface IGroupBuyProductResponse {
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

/********** RECOMMENDED PRODUCTS **********/
export interface IRecommendedProductResponse {
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

/********** RELATED PRODUCTS **********/
export interface IRelatedProductResponse {
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

/********** APP DEALS PRODUCTS **********/
export interface IAppDealsProductResponse {
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

/********** PRODUCT DETAIL **********/
export interface IProductDetailResponse {
  response: IProduct;
  message: string | null;
}

/********** PRODUCT DETAIL ERROR RESPONSE **********/
export interface IProductDetailErrorResponse {
  error: string;
  message: string;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

/********** PRODUCT DESCRIPTION **********/
export interface IProductDescriptionResponse {
  response: string;
  message: string;
}
