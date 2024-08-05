"use client";

import { IProductDetailResponse } from "@/interfaces/responses/product.interface";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
const ProductDetail = () => {
  const { productId } = useParams();
  const queryClient = useQueryClient();

  const cachedData = queryClient.getQueryData<IProductDetailResponse>([
    "product",
    productId as string,
  ]);
  let data: IProductDetailResponse | undefined = cachedData;

  console.log(data?.response);

  return <div>ProductDetail {data?.response.id}</div>;
};
export default ProductDetail;
