import {
  IProductDetailErrorResponse,
  IProductDetailResponse,
} from "@/interfaces/responses/product.interface";
import { postRequest } from "@/utils/apiCaller";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useShowToast from "../useShowToast";
import { AxiosError } from "axios";

interface IFetchProductDTO {
  productId: string;
  userId?: string;
}

export const useFetchProduct = () => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  const fetchProductMutation = async (payload: IFetchProductDTO) => {
    return postRequest<IFetchProductDTO, IProductDetailResponse>({
      url: "/product/product-detail",
      payload,
    });
  };

  const { mutate, isLoading, ...rest } = useMutation({
    mutationFn: fetchProductMutation,
    onSuccess: (data, variables) => {
      const queryKey = ["product", variables.productId];
      queryClient.setQueryDefaults(queryKey, { staleTime: 1000 * 60 * 60 });
      queryClient.setQueryData(queryKey, data);
    },
    onError: (error: AxiosError<IProductDetailErrorResponse | undefined>) => {
      showToast({
        altText: "Fetch products error",
        title: "Something went wrong!",
        description:
          "An error occurred while fetching product details. Please try again.",
        variant: "destructive",
        actionExists: false,
      });
      console.error("Error Fetching product - ", error.response?.data?.message);
    },
  });

  return { fetchProduct: mutate, fetchingProduct: isLoading, ...rest };
};
