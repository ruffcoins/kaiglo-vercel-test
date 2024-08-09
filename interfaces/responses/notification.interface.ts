import { NotificationContent } from "../notification.interface";
import { Pageable, Sort } from "./product.interface";

interface ResponseContent {
  content: NotificationContent[];
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

export interface INotificationsResponse {
  response: ResponseContent;
  message: string;
}
