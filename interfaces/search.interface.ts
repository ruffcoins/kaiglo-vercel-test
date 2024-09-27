interface IGlobalProductSearch {
  id: string;
  productName: string;
  productId: string;
  productCategory: string | null;
  sku: string;
  storeName: string | null;
  productViews: string[];
}

export interface IGlobalProductSearchResponse {
  response: IGlobalProductSearch[];
  message: string;
}
