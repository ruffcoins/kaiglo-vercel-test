import { useMemo, useState } from "react";
import { useProductDetails } from "./queries/products/useProductDetails";

const useProductDetail = (productId: string) => {
  const [openProductSelectionDialog, setOpenProductSelectionDialog] =
    useState(false);
  const { data } = useProductDetails(productId);

  const images = useMemo(() => {
    return data?.response.productViews.map((view) => view.productUrl) || [];
  }, [data]);

  const colors = useMemo(() => {
    return data?.response.productColors.map((color) => color) || [];
  }, [data]);

  const prices = useMemo(() => {
    let prices: number[] = [];
    data?.response.productColors.forEach((color) => {
      color.productPriceDetails.forEach((priceDetail) => {
        prices.push(priceDetail.price);
      });
    });
    return prices;
  }, [data]);

  const newPrices = useMemo(() => {
    let newPrices: number[] = [];
    data?.response.productColors.forEach((color) => {
      color.productPriceDetails.forEach((priceDetail) => {
        newPrices.push(priceDetail?.newPrice as number);
      });
    });
    return newPrices.filter((price) => price !== undefined);
  }, [data]);

  const toggleProductSelectionDialog = () => {
    setOpenProductSelectionDialog((prev) => !prev);
  };

  return {
    openProductSelectionDialog,
    setOpenProductSelectionDialog,
    toggleProductSelectionDialog,
    images,
    colors,
    prices,
    newPrices,
    data,
  };
};
export default useProductDetail;
