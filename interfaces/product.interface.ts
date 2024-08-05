export interface ProductPriceDetail {
  id: string;
  quantity: string;
  price: number;
  newPrice?: number;
  size?: string;
  ramSize?: string;
  storage?: string;
  discount: number;
  sku?: string;
}

interface Color {
  color: string;
  colorCode: string | null;
}

export interface ProductColor {
  color: Color;
  productPriceDetails: ProductPriceDetail[];
  colorUrl: string;
}

interface ProductView {
  productUrl: string;
  colorCode: string | null;
}

interface Specification {
  name: string;
  option: string | null;
}

interface ProductStatus {
  status: string;
  updatedDate: string;
  approvedBy: string;
  note: string | null;
}

interface ProductRating {
  [key: string]: number;
}

interface StoreSummary {
  successfulSales: number;
  productCount: number;
  followers: number;
}

interface Owner {
  id: string;
  pictureUrl: string | null;
}

interface Store {
  id: string;
  storeName: string;
  storeSummary: StoreSummary;
  isFollowingStore: boolean;
  phoneNumber: string;
  owner: Owner;
  profilePic: string | null;
}

export interface IProduct {
  id: string;
  name: string;
  productUrl: string;
  productColors: ProductColor[];
  productViews: ProductView[];
  specifications: Specification[];
  category: string;
  description: string | null;
  productDescriptionSummary: string | null;
  subCategory: string;
  secondSubCategory: string | null | "";
  views: number;
  sold: number;
  sales: boolean;
  freeShipping: boolean;
  kaigloSale: string | null;
  productStatus: ProductStatus;
  productRating: ProductRating;
  paused: boolean;
  isDeleted: boolean;
  tag: string;
  inputTag: string;
  store: Store;
  createdDate: string;
  updatedDate: string;
  featured: boolean;
}
