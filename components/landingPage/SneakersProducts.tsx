"use client";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const sneakers = [
  {
    id: "60ea9d4a15b615739ec9c2e6",
    name: "Black long heel boot with curved style",
    productUrl:
      "https://kaistore.s3.amazonaws.com/subfolder/5bbc72c2-683c-4731-8546-11d0b3c8515b.jpeg",
    productColors: [
      {
        color: { color: "green", colorCode: "#4535" },
        productPriceDetails: [
          {
            id: "11a359f6-f6bd-4bc1-b2c9-29d68ed41006",
            quantity: "2",
            price: 12000,
            size: "31.5",
            sku: "KG-000001003",
            discount: 0,
          },
        ],
      },
      {
        color: { color: "red", colorCode: "#4566" },
        productPriceDetails: [
          {
            id: "8f6c3854-035a-488c-875e-be56e9fd394f",
            quantity: "2",
            price: 1200,
            size: "30.5",
            sku: "KG-000001005",
            discount: 0,
          },
        ],
      },
    ],
    productViews: [
      {
        productUrl:
          "https://kaistore.s3.amazonaws.com/subfolder/d6e4a43d-be91-49ab-8096-0e22454b56c7.jpeg",
        colorCode: "#4535",
      },
      {
        productUrl:
          "https://kaistore.s3.amazonaws.com/subfolder/82191cbd-f228-4d4e-8a3b-bc5b5e5f8ec5.jpeg",
        colorCode: "#4566",
      },
    ],
    specifications: [
      { name: "Brand", option: "Brand" },
      { name: "Material", option: "Material" },
      { name: "Condition", option: "Condition" },
      { name: "Season", option: "Season" },
      { name: "Pattern type", option: "Pattern type" },
    ],
    category: "WOMEN",
    subCategory: "SHOES",
    secondSubCategory: "BOOTS",
    tag: "footwear",
    inputTag: "footwear",
    sales: false,
    featured: false,
    kaigloSale: "GROUP_BUY",
    freeShipping: false,
    productStatus: {
      status: "APPROVED",
      updatedDate: "2024-06-28T20:14:48.240Z",
      approvedBy: "Chidera",
      note: "testing the pause feature.",
    },
    paused: true,
    isDeleted: false,
    store: {
      id: "60ea986115b615739ec9c2e5",
      storeName: "Chuks",
      profilePic: null,
      owner: {
        id: "60ea97f015b615739ec9c2e4",
        lastLoggedIn: "2024-02-09T15:37:01.157Z",
      },
      createdDate: null,
    },
    createdDate: "2021-07-11T07:27:06.508Z",
    views: 0,
    sold: 100,
  },
  {
    id: "60f05d0b6d6f684c3523ca85",
    name: "gvsbfbfbfbgb",
    productUrl:
      "https://kaistore.s3.amazonaws.com/subfolder/74c19c84-9f79-4700-8fc3-0586fb405e2b.jpeg",
    productColors: [
      {
        color: { color: "green", colorCode: "#4535" },
        productPriceDetails: [
          {
            id: "87404194-611d-49a4-a077-8553ca6d432e",
            quantity: "0",
            price: 25000,
            size: "32.5",
            sku: "KG-000001008",
            discount: 0,
          },
        ],
      },
      {
        color: { color: "red", colorCode: "#4566" },
        productPriceDetails: [
          {
            id: "0763c845-e6f5-4b7a-aef6-7f9ec1d4480d",
            quantity: "7",
            price: 3000,
            size: "30",
            sku: "KG-000001017",
            discount: 0,
          },
        ],
      },
    ],
    productViews: [
      {
        productUrl:
          "https://kaistore.s3.amazonaws.com/subfolder/74c19c84-9f79-4700-8fc3-0586fb405e2b.jpeg",
        colorCode: "#4535",
      },
      {
        productUrl:
          "https://kaistore.s3.amazonaws.com/subfolder/08cca017-3f65-44ca-8cbb-f9b76bd38765.jpeg",
        colorCode: "#4566",
      },
    ],
    specifications: [],
    category: "WOMEN",
    subCategory: "SHOES",
    secondSubCategory: "BOOTS",
    tag: "footwear",
    inputTag: "footwear",
    sales: false,
    featured: false,
    kaigloSale: null,
    freeShipping: false,
    productStatus: {
      status: "APPROVED",
      updatedDate: "2024-06-28T11:22:24.897Z",
      approvedBy: "chidera test",
      note: "overall change intitated",
    },
    paused: false,
    isDeleted: false,
    store: {
      id: "611b7ab78ab8a803389ad109",
      storeName: "Variety Store",
      profilePic:
        "https://kaistore.s3.amazonaws.com/store_media/profile-pics/66e70462-61c8-41b0-92f1-ad317868daee.jpeg",
      owner: {
        id: "611b7a188ab8a803389ad108",
        lastLoggedIn: "2024-03-20T13:58:23.100Z",
      },
      createdDate: "2021-08-17T09:00:39.280Z",
    },
    createdDate: "2021-07-15T16:06:35.918Z",
    views: 0,
    sold: 20,
  },
  {
    id: "6138d193f16d9f22a503765c",
    name: "PumaMenBrandedTeeShirt",
    productUrl:
      "https://kaistore.s3.amazonaws.com/subfolder/e947a083-117b-4d7c-87ea-a178ec9ce15a.jpeg",
    productColors: [
      {
        color: { color: "black", colorCode: "#000000" },
        productPriceDetails: [
          {
            id: "0e550ee1-e51a-4e6e-8a1a-d2b43b77800d",
            quantity: "10",
            price: 3500,
            newPrice: 2500,
            size: "L",
            sku: "KG-000001070",
            discount: 28.57142857142857,
          },
          {
            id: "95815915-c3bd-40d7-92b9-c9618d26a7ac",
            quantity: "10",
            price: 3500,
            newPrice: 2500,
            size: "XL",
            sku: "KG-000001080",
            discount: 28.57142857142857,
          },
          {
            id: "01f961d8-50c1-47eb-b035-d0ab6cb67ec8",
            quantity: "10",
            price: 3500,
            newPrice: 2500,
            size: "XXL",
            sku: "KG-000001090",
            discount: 28.57142857142857,
          },
          {
            id: "8310746d-3fe5-47f5-a2fc-b8ba1f58da0b",
            quantity: "10",
            price: 3500,
            newPrice: 2500,
            size: "XXXL",
            sku: "KG-000001100",
            discount: 28.57142857142857,
          },
        ],
      },
      {
        color: { color: "white", colorCode: "#FFFFFF" },
        productPriceDetails: [
          {
            id: "c44fa8ab-5751-4379-8dc9-31181f05e77b",
            quantity: "10",
            price: 3500,
            newPrice: 2500,
            size: "L",
            sku: "KG-000001110",
            discount: 28.57142857142857,
          },
          {
            id: "604adbbd-b22e-425f-912a-ddba44b99498",
            quantity: "10",
            price: 3500,
            newPrice: 2500,
            size: "XL",
            sku: "KG-000001120",
            discount: 28.57142857142857,
          },
          {
            id: "30c7475d-e7b7-47f2-8798-c51d1afa61b4",
            quantity: "10",
            price: 3500,
            newPrice: 2500,
            size: "XXL",
            sku: "KG-000001130",
            discount: 28.57142857142857,
          },
          {
            id: "65ebb96b-0193-4f21-96aa-62a69c6e15a1",
            quantity: "10",
            price: 3500,
            newPrice: 2500,
            size: "XXXL",
            sku: "KG-000001140",
            discount: 28.57142857142857,
          },
        ],
      },
    ],
    productViews: [
      {
        productUrl:
          "https://kaistore.s3.amazonaws.com/subfolder/743a19de-a920-426e-8954-088419ec25d1.jpeg",
        colorCode: null,
      },
      {
        productUrl:
          "https://kaistore.s3.amazonaws.com/subfolder/8d2fc1f9-2dba-4cc1-b11e-87aa7ec7cad5.jpeg",
        colorCode: "#FFFFFF",
      },
      {
        productUrl:
          "https://kaistore.s3.amazonaws.com/subfolder/32f05dfe-d766-475e-a7ab-4a0915b35256.jpeg",
        colorCode: "#000000",
      },
    ],
    specifications: [
      { name: "Brand", option: "PUMA" },
      { name: "Style", option: "o-neck" },
      { name: "pattern", option: "printed" },
      { name: "material", option: "cotton" },
      { name: "condition", option: "new" },
      { name: "Gender", option: "male" },
      { name: "season", option: "season" },
      { name: "Age", option: "Age" },
    ],
    category: "MEN'S FASHION",
    subCategory: "SHIRTS",
    secondSubCategory: null,
    tag: "Shirt",
    inputTag: "Clothing",
    sales: false,
    featured: false,
    kaigloSale: "GROUP_BUY",
    freeShipping: false,
    productStatus: {
      status: "APPROVED",
      updatedDate: "2024-05-09T05:43:47.803Z",
      approvedBy: "chidera test",
      note: "overall change intitated",
    },
    paused: true,
    isDeleted: false,
    store: {
      id: "611b7ab78ab8a803389ad109",
      storeName: "Variety Store",
      profilePic:
        "https://kaistore.s3.amazonaws.com/store_media/profile-pics/66e70462-61c8-41b0-92f1-ad317868daee.jpeg",
      owner: {
        id: "611b7a188ab8a803389ad108",
        lastLoggedIn: "2024-03-20T13:58:23.100Z",
      },
      createdDate: "2021-08-17T09:00:39.280Z",
    },
    createdDate: "2021-09-08T15:06:59.707Z",
    views: 0,
    sold: 10,
  },
  {
    id: "60ea9d4a15b615739ec9c2e6",
    name: "Black long heel boot with curved style",
    productUrl:
      "https://kaistore.s3.amazonaws.com/subfolder/5bbc72c2-683c-4731-8546-11d0b3c8515b.jpeg",
    productColors: [
      {
        color: { color: "green", colorCode: "#4535" },
        productPriceDetails: [
          {
            id: "11a359f6-f6bd-4bc1-b2c9-29d68ed41006",
            quantity: "2",
            price: 12000,
            size: "31.5",
            sku: "KG-000001003",
            discount: 0,
          },
        ],
      },
      {
        color: { color: "red", colorCode: "#4566" },
        productPriceDetails: [
          {
            id: "8f6c3854-035a-488c-875e-be56e9fd394f",
            quantity: "2",
            price: 1200,
            size: "30.5",
            sku: "KG-000001005",
            discount: 0,
          },
        ],
      },
    ],
    productViews: [
      {
        productUrl:
          "https://kaistore.s3.amazonaws.com/subfolder/d6e4a43d-be91-49ab-8096-0e22454b56c7.jpeg",
        colorCode: "#4535",
      },
      {
        productUrl:
          "https://kaistore.s3.amazonaws.com/subfolder/82191cbd-f228-4d4e-8a3b-bc5b5e5f8ec5.jpeg",
        colorCode: "#4566",
      },
    ],
    specifications: [
      { name: "Brand", option: "Brand" },
      { name: "Material", option: "Material" },
      { name: "Condition", option: "Condition" },
      { name: "Season", option: "Season" },
      { name: "Pattern type", option: "Pattern type" },
    ],
    category: "WOMEN",
    subCategory: "SHOES",
    secondSubCategory: "BOOTS",
    tag: "footwear",
    inputTag: "footwear",
    sales: false,
    featured: false,
    kaigloSale: "GROUP_BUY",
    freeShipping: false,
    productStatus: {
      status: "APPROVED",
      updatedDate: "2024-06-28T20:14:48.240Z",
      approvedBy: "Chidera",
      note: "testing the pause feature.",
    },
    paused: true,
    isDeleted: false,
    store: {
      id: "60ea986115b615739ec9c2e5",
      storeName: "Chuks",
      profilePic: null,
      owner: {
        id: "60ea97f015b615739ec9c2e4",
        lastLoggedIn: "2024-02-09T15:37:01.157Z",
      },
      createdDate: null,
    },
    createdDate: "2021-07-11T07:27:06.508Z",
    views: 0,
    sold: 100,
  },
  {
    id: "60f05d0b6d6f684c3523ca85",
    name: "gvsbfbfbfbgb",
    productUrl:
      "https://kaistore.s3.amazonaws.com/subfolder/74c19c84-9f79-4700-8fc3-0586fb405e2b.jpeg",
    productColors: [
      {
        color: { color: "green", colorCode: "#4535" },
        productPriceDetails: [
          {
            id: "87404194-611d-49a4-a077-8553ca6d432e",
            quantity: "0",
            price: 25000,
            size: "32.5",
            sku: "KG-000001008",
            discount: 0,
          },
        ],
      },
      {
        color: { color: "red", colorCode: "#4566" },
        productPriceDetails: [
          {
            id: "0763c845-e6f5-4b7a-aef6-7f9ec1d4480d",
            quantity: "7",
            price: 3000,
            size: "30",
            sku: "KG-000001017",
            discount: 0,
          },
        ],
      },
    ],
    productViews: [
      {
        productUrl:
          "https://kaistore.s3.amazonaws.com/subfolder/74c19c84-9f79-4700-8fc3-0586fb405e2b.jpeg",
        colorCode: "#4535",
      },
      {
        productUrl:
          "https://kaistore.s3.amazonaws.com/subfolder/08cca017-3f65-44ca-8cbb-f9b76bd38765.jpeg",
        colorCode: "#4566",
      },
    ],
    specifications: [],
    category: "WOMEN",
    subCategory: "SHOES",
    secondSubCategory: "BOOTS",
    tag: "footwear",
    inputTag: "footwear",
    sales: false,
    featured: false,
    kaigloSale: null,
    freeShipping: false,
    productStatus: {
      status: "APPROVED",
      updatedDate: "2024-06-28T11:22:24.897Z",
      approvedBy: "chidera test",
      note: "overall change intitated",
    },
    paused: false,
    isDeleted: false,
    store: {
      id: "611b7ab78ab8a803389ad109",
      storeName: "Variety Store",
      profilePic:
        "https://kaistore.s3.amazonaws.com/store_media/profile-pics/66e70462-61c8-41b0-92f1-ad317868daee.jpeg",
      owner: {
        id: "611b7a188ab8a803389ad108",
        lastLoggedIn: "2024-03-20T13:58:23.100Z",
      },
      createdDate: "2021-08-17T09:00:39.280Z",
    },
    createdDate: "2021-07-15T16:06:35.918Z",
    views: 0,
    sold: 20,
  },
  {
    id: "6138d193f16d9f22a503765c",
    name: "PumaMenBrandedTeeShirt",
    productUrl:
      "https://kaistore.s3.amazonaws.com/subfolder/e947a083-117b-4d7c-87ea-a178ec9ce15a.jpeg",
    productColors: [
      {
        color: { color: "black", colorCode: "#000000" },
        productPriceDetails: [
          {
            id: "0e550ee1-e51a-4e6e-8a1a-d2b43b77800d",
            quantity: "10",
            price: 3500,
            newPrice: 2500,
            size: "L",
            sku: "KG-000001070",
            discount: 28.57142857142857,
          },
          {
            id: "95815915-c3bd-40d7-92b9-c9618d26a7ac",
            quantity: "10",
            price: 3500,
            newPrice: 2500,
            size: "XL",
            sku: "KG-000001080",
            discount: 28.57142857142857,
          },
          {
            id: "01f961d8-50c1-47eb-b035-d0ab6cb67ec8",
            quantity: "10",
            price: 3500,
            newPrice: 2500,
            size: "XXL",
            sku: "KG-000001090",
            discount: 28.57142857142857,
          },
          {
            id: "8310746d-3fe5-47f5-a2fc-b8ba1f58da0b",
            quantity: "10",
            price: 3500,
            newPrice: 2500,
            size: "XXXL",
            sku: "KG-000001100",
            discount: 28.57142857142857,
          },
        ],
      },
      {
        color: { color: "white", colorCode: "#FFFFFF" },
        productPriceDetails: [
          {
            id: "c44fa8ab-5751-4379-8dc9-31181f05e77b",
            quantity: "10",
            price: 3500,
            newPrice: 2500,
            size: "L",
            sku: "KG-000001110",
            discount: 28.57142857142857,
          },
          {
            id: "604adbbd-b22e-425f-912a-ddba44b99498",
            quantity: "10",
            price: 3500,
            newPrice: 2500,
            size: "XL",
            sku: "KG-000001120",
            discount: 28.57142857142857,
          },
          {
            id: "30c7475d-e7b7-47f2-8798-c51d1afa61b4",
            quantity: "10",
            price: 3500,
            newPrice: 2500,
            size: "XXL",
            sku: "KG-000001130",
            discount: 28.57142857142857,
          },
          {
            id: "65ebb96b-0193-4f21-96aa-62a69c6e15a1",
            quantity: "10",
            price: 3500,
            newPrice: 2500,
            size: "XXXL",
            sku: "KG-000001140",
            discount: 28.57142857142857,
          },
        ],
      },
    ],
    productViews: [
      {
        productUrl:
          "https://kaistore.s3.amazonaws.com/subfolder/743a19de-a920-426e-8954-088419ec25d1.jpeg",
        colorCode: null,
      },
      {
        productUrl:
          "https://kaistore.s3.amazonaws.com/subfolder/8d2fc1f9-2dba-4cc1-b11e-87aa7ec7cad5.jpeg",
        colorCode: "#FFFFFF",
      },
      {
        productUrl:
          "https://kaistore.s3.amazonaws.com/subfolder/32f05dfe-d766-475e-a7ab-4a0915b35256.jpeg",
        colorCode: "#000000",
      },
    ],
    specifications: [
      { name: "Brand", option: "PUMA" },
      { name: "Style", option: "o-neck" },
      { name: "pattern", option: "printed" },
      { name: "material", option: "cotton" },
      { name: "condition", option: "new" },
      { name: "Gender", option: "male" },
      { name: "season", option: "season" },
      { name: "Age", option: "Age" },
    ],
    category: "MEN'S FASHION",
    subCategory: "SHIRTS",
    secondSubCategory: null,
    tag: "Shirt",
    inputTag: "Clothing",
    sales: false,
    featured: false,
    kaigloSale: "GROUP_BUY",
    freeShipping: false,
    productStatus: {
      status: "APPROVED",
      updatedDate: "2024-05-09T05:43:47.803Z",
      approvedBy: "chidera test",
      note: "overall change intitated",
    },
    paused: true,
    isDeleted: false,
    store: {
      id: "611b7ab78ab8a803389ad109",
      storeName: "Variety Store",
      profilePic:
        "https://kaistore.s3.amazonaws.com/store_media/profile-pics/66e70462-61c8-41b0-92f1-ad317868daee.jpeg",
      owner: {
        id: "611b7a188ab8a803389ad108",
        lastLoggedIn: "2024-03-20T13:58:23.100Z",
      },
      createdDate: "2021-08-17T09:00:39.280Z",
    },
    createdDate: "2021-09-08T15:06:59.707Z",
    views: 0,
    sold: 10,
  },
];

const SneakersProducts = () => {
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );
  const [numberOfProducts, setNumberOfProducts] = useState(0);

  const handleResize = () => setScreenWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const determineNumberOfProducts = () => {
      if (screenWidth < 640) return 2;
      if (screenWidth >= 768 && screenWidth < 1280) return 4;
      if (screenWidth >= 1280 && screenWidth <= 1440) return 5;
      return 6;
    };
    setNumberOfProducts(determineNumberOfProducts());
  }, [screenWidth]);

  const renderProducts = () => {
    return sneakers.map((product, index) => (
      <ProductCard
        id={product.id}
        key={index}
        sales={product.sales}
        name={product.name}
        price={product.productColors[0].productPriceDetails[0].price}
        rating={5}
        imageUrl={product.productUrl}
        sold={product.sold}
        category={product.category}
        discount={product.productColors[0].productPriceDetails[0].discount}
        kaigloSale={product.kaigloSale as string}
        featured={product.featured}
      />
    ));
  };

  return (
    <div className="lg:px-8 xl:px-14 px-4 space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-base lg:text-[32px]">Sneakers</h1>
        <Button
          variant="secondary"
          disabled
          className="rounded-full font-medium disabled:cursor-wait"
        >
          More Products <ChevronRightIcon className="w-5 h-5 hidden lg:block" />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {renderProducts()}
      </div>
    </div>
  );
};

export default SneakersProducts;
