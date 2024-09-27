"use client";

import { useEffect, useState } from "react";

const useProductRowLength = () => {
  const [length, setLength] = useState(6);
  const [storeProductsLength, setStoreProductsLength] = useState(4);

  useEffect(() => {
    const updateLength = () => {
      if (window.innerWidth < 767) {
        setLength(2);
        setStoreProductsLength(2);
      } else if (window.innerWidth < 900) {
        setLength(4);
        setStoreProductsLength(4);
      } else {
        setLength(6);
        setStoreProductsLength(4);
      }
    };

    updateLength(); // Set initial length
    window.addEventListener("resize", updateLength);

    return () => {
      window.removeEventListener("resize", updateLength);
    };
  }, []);
  return {
    length,
    storeProductsLength,
  };
};
export default useProductRowLength;
