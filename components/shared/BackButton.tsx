"use client";

import { CaretLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <CaretLeftIcon
      className="w-6 h-6 lg:hidden cursor-pointer"
      onClick={() => router.back()}
    />
  );
};
export default BackButton;
