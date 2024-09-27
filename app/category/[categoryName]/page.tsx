import InnerPageLayout from "@/components/layouts/InnerPageLayout";
import Loader from "@/components/shared/Loader";
import dynamic from "next/dynamic";
import Image from "next/image";
import DesktopCategoryBanner from "@/public/images/women-banner.svg";
import MobileCategoryBanner from "@/public/images/category-banner.png";

import { IProductDetailResponse } from "@/interfaces/responses/product.interface";
import { postRequest } from "@/utils/apiCaller";
import { ResolvingMetadata, Metadata } from "next";

type Props = {
  params: { categoryName: string };
};

// export async function generateMetadata(
//   { params }: Props,
//   parent: ResolvingMetadata,
// ): Promise<Metadata> {
//   const { categoryName } = params;

// const { response: product } = await postRequest<
//   { productId: string },
//   IProductDetailResponse
// >({
//   url: "/product/product-detail-v2",
//   payload: { productId },
// });

// // optionally access and extend (rather than replace) parent metadata
// const previousImages = (await parent).openGraph?.images || [];

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kaiglo.com";
// const productUrl = `${baseUrl}${product.productUrl}`;

// return {
//   title: `${product.name} | ${product.store.storeName} | Kaiglo Nigeria`,
//   description:
//     product.productDescriptionSummary ||
//     product.description?.slice(0, 160) ||
//     `${product.name} in ${product.category}`,
//   keywords: [
//     product.category,
//     product.subCategory,
//     product.secondSubCategory,
//     ...product.productColors.map((pc) => pc.color.color),
//     product.tag,
//     product.inputTag,
//   ].filter(
//     (keyword): keyword is string => keyword !== null && keyword !== undefined,
//   ),
//   openGraph: {
//     title: `${product.name} | ${product.store.storeName} | Kaiglo Nigeria`,
//     description:
//       product.productDescriptionSummary ||
//       product.description?.slice(0, 160) ||
//       `${product.name} in ${product.category}`,
//     url: `${baseUrl}/product/${slug}/${productId}`,
//     siteName: "Kaiglo Nigeria",
//     images: [
//       ...product.productViews.map((pv) => ({
//         url: pv.productUrl,
//         alt: `${product.name}`,
//       })),
//       ...previousImages,
//     ],
//     locale: "en_NG",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: `${product.name} | ${product.store.storeName} | Kaiglo Nigeria`,
//     description:
//       product.productDescriptionSummary ||
//       product.description?.slice(0, 160) ||
//       `${product.name} in ${product.category}`,
//     images: [
//       ...product.productViews.map((pv) => ({
//         url: pv.productUrl,
//         alt: `${product.name}`,
//       })),
//     ],
//     site: "@KaigloNGR",
//   },
//   other: {
//     "product:price:amount":
//       product.productColors[0]?.productPriceDetails[0]?.price.toString(),
//     "product:price:currency": "NGN",
//     "product:availability": product.productStatus.status,
//     "product:condition": "new",
//     "product:store": product.store.storeName,
//     "product:category": product.category,
//     "product:sku":
//       product.productColors[0]?.productPriceDetails[0]?.sku || "",
//   },
//   alternates: {
//     canonical: productUrl,
//   },
//   robots: {
//     index: !product.paused && !product.isDeleted,
//     follow: !product.paused && !product.isDeleted,
//     nocache: product.paused || product.isDeleted,
//   },
//   applicationName: "Kaiglo Nigeria",
//   creator: product.store.storeName,
//   publisher: "Kaiglo Nigeria",
//   category: product.category,
//   referrer: "origin-when-cross-origin",
//   formatDetection: {
//     email: false,
//     address: false,
//     telephone: false,
//   },
// };
// }

const SelectedForYou = dynamic(
  () => import("@/components/category/SelectedForYou"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-[200px] w-screen">
        <Loader />
      </div>
    ),
  },
);

const SubCategoriesList = dynamic(
  () => import("@/components/category/SubCategoriesList"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-[200px] w-screen">
        <Loader />
      </div>
    ),
  },
);

const Category = ({ params }: { params: { categoryName: string } }) => {
  const { categoryName } = params;

  return (
    <InnerPageLayout>
      <div className="space-y-4 lg:mb-80 mb-20 mt-20">
        <div className="lg:mx-8 rounded-lg space-y-6 lg:space-y-10 flex flex-col">
          <div className="border h-[200px] lg:h-[280px] relative">
            <Image
              src={DesktopCategoryBanner}
              alt="desktop category banner"
              className="w-full h-full object-cover object-center hidden lg:block rounded-lg"
              fill
              sizes="100vw"
              priority
            />
            <Image
              src={MobileCategoryBanner}
              alt="mobile category banner"
              className="w-full h-full object-cover object-center lg:hidden"
              fill
              sizes="100vw"
              priority
            />
          </div>

          <div className="mx-4 lg:mx-0">
            <SelectedForYou categoryName={categoryName} />

            <SubCategoriesList categoryName={categoryName} />
          </div>
        </div>
      </div>
    </InnerPageLayout>
  );
};
export default Category;
