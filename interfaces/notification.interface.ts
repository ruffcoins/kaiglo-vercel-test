interface NotificationData {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}

export interface NotificationContent {
  createdDate: string;
  data: NotificationData;
  description: string;
  header: string;
  image: string;
  isRead: boolean;
  notificationId: string;
  type:
    | "BIRTHDAY_REMINDER"
    | "CART_REMINDER"
    | "CATEGORY_NOTIFICATION"
    | "CUSTOM_CATEGORY"
    | "CUSTOM_NOTIFICATION"
    | "GROUPBUY_REFUND_REMINDER"
    | "GROUPBUY_REMINDER"
    | "PRODUCT_DISCOUNT_NOTIFICATION"
    | "PRODUCT_NOTIFICATION"
    | "PROFILE_UPDATE"
    | "SALE_NOTIFICATION"
    | "SECTION_NOTIFICATION"
    | "SELLER_ORDER"
    | "SIGNUP_NOTIFICATION"
    | "VIEW_MORE_NOTIFICATION"
    | "WISHLIST_REMINDER";
  userId: string;
}
