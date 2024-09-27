export interface Category {
  name: string;
  productUrl?: string;
  productCount: number;
  category: Category[];
}

export interface CategoryView {
  id: string;
  name: string;
  productUrl?: string;
  productCount: number;
  category: Category[];
}

export interface AllCategoryResponse {
  response: CategoryView[];
  message: string;
}
