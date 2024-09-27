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

interface FlashSales {
  imageUrl: string;
  name: string;
  description: string | null;
  banners: Banners;
  colors: Colors;
  startDate: string;
  endDate: string;
}

export interface FlashSalesResponse {
  response: FlashSales;
  message: string;
}
