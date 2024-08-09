"use client";

import { useEffect, useState } from "react";

const useProductRowLength = () => {
  const [length, setLength] = useState(6);

  useEffect(() => {
    const updateLength = () => {
      if (window.innerWidth <= 768) {
        setLength(2);
      } else if (window.innerWidth < 900) {
        setLength(4);
      } else {
        setLength(6);
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
  };
};
export default useProductRowLength;
