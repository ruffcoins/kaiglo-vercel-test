interface SalesData {
  id: string;
  name: string;
  description: string;
  pictureUrl: string;
  banners: {
    mobileHome: string;
    mobileSalesPage: string;
    desktopHome: string;
    desktopHome2: string;
    desktopSalesPage: string;
    background: string;
  };
  colors: {
    background: string;
    productCard: string;
    productName: string;
    priceContainer: string;
    priceText: string;
    slashedPriceText: string;
    itemCountBG: string;
    itemCountText: string;
  };
  enabled: boolean;
  startDate: string;
  endDate: string;
  createdDate: string;
  updatedDate: string;
}

export interface HomeSlider {
  image: string;
  createdAt: string | null;
  url: string | null;
  imageUrl: string;
  name: string | null;
  id: string;
  sliderType: string;
  sliderData: string;
  salesData: SalesData | null;
}

interface AdBanner {
  image: string;
  createdAt: string | null;
  url: string | null;
  imageUrl: string | null;
  name: string | null;
  id: string;
  sliderType: string | null;
  sliderData: string | null;
  salesData: string | null;
}

interface TopBrand {
  image: string;
  createdAt: string | null;
  url: string;
  imageUrl: string | null;
  name: string;
  id: string;
  sliderType: string | null;
  sliderData: string | null;
  salesData: SalesData | null;
}

interface HomeContentBanner {
  homeSliders: HomeSlider[];
  adBanners: AdBanner[];
  topBrands: TopBrand[];
}

export interface HomeContentBannerResponse {
  response: HomeContentBanner;
  message: string;
}
