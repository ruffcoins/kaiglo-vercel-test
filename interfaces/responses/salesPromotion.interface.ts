import { IProduct } from "../product.interface";
import { Pageable, Sort } from "./product.interface";

interface Banners {
  mobileHome: string;
  mobileSalesPage: string;
  desktopHome: string;
  desktopHome2: string;
  desktopSalesPage: string;
  background: string;
}

interface Colors {
  background: string;
  productCard: string;
  productName: string;
  priceContainer: string;
  priceText: string;
  slashedPriceText: string;
  itemCountBG: string;
  itemCountText: string;
}

interface Sales {
  imageUrl: string;
  name: string;
  description: string | null;
  banners: Banners;
  colors: Colors;
  startDate: string;
  endDate: string;
}

export interface SalesResponse {
  response: Sales;
  message: string;
}

export interface SalesPromotionProductResponse {
  content: IProduct[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
