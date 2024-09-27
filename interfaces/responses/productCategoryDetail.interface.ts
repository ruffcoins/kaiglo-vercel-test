interface ColorCode {
  color: string;
  colorCode: string;
}

interface CategoryMeta {
  [index: number]: string;
}

interface ProductCategory {
  id: string;
  name: string;
  metaTagDescription: string;
  productCount: number;
  category: SubCategory[];
}

interface SubCategory {
  name: string;
  metaTagDescription: string;
  tag: string;
  inputTag: string;
  productCount: number;
  category: SubCategory[];
}

export interface ProductCategoryDetailResponse {
  productColorCode: ColorCode[];
  categoryMeta: CategoryMeta[];
  brands: string[];
  sales: string[];
  productCategory: ProductCategory;
}
