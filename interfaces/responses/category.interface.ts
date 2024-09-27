export interface Category {
  category: string;
  image: string;
}

export interface HomeCategoryResponse {
  response: Category[];
  message: string;
}
