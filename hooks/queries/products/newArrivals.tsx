import { getRequest } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";
import { INewArrivalsProductResponse } from "@/interfaces/responses/product.interface";
import { IProduct } from "@/interfaces/product.interface";

export const useNewArrivalsProducts = () => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["new-arrivals-products"],
      () =>
        getRequest<INewArrivalsProductResponse>({
          url: "home-page/home-content-new-arrival",
        }),
      {
        staleTime: 1000 * 60 * 60,
      },
    );

  return {
    newArrivalsProducts: data?.response as IProduct[],
    fetchingNewArrivalsProducts: isFetching,
    newArrivalsProductsSuccess: isSuccess,
    newArrivalsProductsPaused: isPaused,
    newArrivalsProductsError: isError,
    refetchNewArrivalsProducts: refetch,
    removeNewArrivalsProducts: remove,
  };
};
