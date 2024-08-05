// import useAddItemToCart, { IAddToCartDTO } from "./addItemToCart";
// import { useFetchUserProfile } from "@/hooks/queries/userProfile";
// import {
//   clearCartCookies,
//   getCartFromCookies,
//   saveCartToCookies,
// } from "@/lib/cookieUtils";

// export const useCart = () => {
//   const { user } = useFetchUserProfile();
//   const { addItemToCart } = useAddItemToCart();

//   const addToCart = (item: IAddToCartDTO) => {
//     const dto: IAddToCartDTO = {
//       color: item.color,
//       platform: item.platform,
//       price: item.price,
//       productId: item.productId,
//       productUrl: item.productUrl,
//       quantity: item.quantity.toString(),
//       ramSize: item.ramSize,
//       size: item.size,
//       storage: item.storage,
//       userId: user?.id || "",
//     };

//     if (user) {
//       addItemToCart(dto);
//     } else {
//       const tempCart = getCartFromCookies();
//       tempCart.push(item);
//       saveCartToCookies(tempCart);
//     }
//   };

//   const mergeCarts = () => {
//     if (user) {
//       const tempCart = getCartFromCookies();
//       tempCart.forEach((item) => {
//         const dto: IAddToCartDTO = {
//           color: item.color,
//           platform: item.platform,
//           price: item.price,
//           productId: item.productId,
//           productUrl: item.productUrl,
//           quantity: item.quantity.toString(),
//           ramSize: item.ramSize,
//           size: item.size,
//           storage: item.storage,
//           userId: user.id,
//         };
//         addItemToCart(dto);
//       });
//       clearCartCookies();
//     }
//   };

//   return { addToCart, mergeCarts };
// };
