"use client";

import { cn } from "@/lib/utils";
import Placeholder from "@/public/images/product-image-placeholder.png";
import { StaticImageData } from "next/image";
import { useState } from "react";

const ProductImage = ({
  image,
  classNames,
}: {
  image: string | StaticImageData;
  classNames: string;
}) => {
  const [imgSrc, setImgSrc] = useState(image || Placeholder);

  const handleError = () => {
    setImgSrc(Placeholder);
  };

  return (
    <img
      src={imgSrc as string}
      alt="Product"
      className={cn("rounded object-cover", classNames)}
      width={100}
      height={100}
      onError={handleError}
    />
  );
};

export default ProductImage;
