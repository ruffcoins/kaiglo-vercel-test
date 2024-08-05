export interface ICategoryDropdownTab {
  name: string;
  id: string;
  current: boolean;
  subCategories?: {
    id?: string;
    name: string;
    link: string;
    image: string;
    subSubCategories?: {
      id?: string;
      name: string;
      link: string;
      image: string;
      products?: {
        name: string;
        link: string;
        image: string;
      }[];
    }[];
  }[];
}
