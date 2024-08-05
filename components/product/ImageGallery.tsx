"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import AddToWishlistButton from "./AddToWishlistButton";
import ShareButton from "./ShareButton";
import { useFetchUserProfile } from "@/hooks/queries/userProfile";
import useIsProductInWishlist from "@/hooks/useIsProductInWishlist";

const ImageGallery = ({
  images,
  id,
  name,
  price,
}: {
  id: string;
  name: string;
  price: number;
  images: string[] | StaticImageData[];
}) => {
  const { user } = useFetchUserProfile();

  const { isOnMyWishList, setIsOnMyWishList } = useIsProductInWishlist(
    id,
    user?.wishListItems,
  );

  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  return (
    <div className="flex flex-col">
      {/* Main Image */}
      <div className="mb-4 relative">
        <Image
          src={selectedImage}
          alt={name}
          className="object-cover rounded-2xl relative w-full aspect-square bg-white max-h-[540px]"
          width={1000}
          height={1000}
        />
        <div className="absolute flex items-end justify-between xl:bottom-8 lg:bottom-4 bottom-2 xl:left-8 lg:left-4 left-2 xl:right-8 lg:right-4 right-2">
          <ShareButton />

          <div className="flex space-x-1 border rounded-full py-1 px-1.5">
            {images.map((image, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full border border-white ${selectedImage === image ? "bg-kaiglo_accent-base" : "bg-kaiglo_grey-placeholder"}`}
              ></div>
            ))}
          </div>

          <AddToWishlistButton
            isOnMyWishList={isOnMyWishList}
            setIsOnMyWishList={setIsOnMyWishList}
            id={id}
            name={name}
            price={price}
            imageUrl={images[0] as string}
          />
        </div>
      </div>

      {/* Thumbnail Carousel */}
      <div className="flex space-x-3 lg:space-x-4 overflow-x-auto">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`lg:w-24 lg:h-24 w-16 h-16 max-w-24 max-h-24 object-cover cursor-pointer bg-white rounded-2xl ${selectedImage === image ? "border-2 border-kaiglo_success-base" : ""}`}
            onClick={() => setSelectedImage(image)}
            width={100}
            height={100}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
