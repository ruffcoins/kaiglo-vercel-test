import dynamic from "next/dynamic";
import ProductDescription from "@/components/product/ProductDescription";
import ProductReviews from "@/components/product/ProductReview";
import RelatedProducts from "@/components/product/RelatedProducts";
import InnerPageLayout from "@/components/layouts/InnerPageLayout";
import ProductDetailsIntroductionSkeletonLoader from "@/components/product/skeletons/ProductDetailsIntroductionSkeletonLoader";
import ProductStoreSkeleton from "@/components/product/skeletons/ProductStore";
import { postRequest } from "@/utils/apiCaller";
import { IProductDetailResponse } from "@/interfaces/responses/product.interface";
import { capitalizeFirstLetterOfEachWord } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next/types";

type Props = {
  params: { slug: string; productId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { productId, slug } = params;
  const { response: product } = await postRequest<
    { productId: string },
    IProductDetailResponse
  >({
    url: "/product/product-detail-v2",
    payload: { productId },
  });

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kaiglo.com";
  const productUrl = `${baseUrl}${product.productUrl}`;

  return {
    title: `${product.name} | ${product.store.storeName} | Kaiglo Nigeria`,
    description:
      product.productDescriptionSummary ||
      product.description?.slice(0, 160) ||
      `${product.name} in ${product.category}`,
    keywords: [
      product.category,
      product.subCategory,
      product.secondSubCategory,
      ...product.productColors.map((pc) => pc.color.color),
      product.tag,
      product.inputTag,
    ].filter(
      (keyword): keyword is string => keyword !== null && keyword !== undefined,
    ),
    openGraph: {
      title: `${product.name} | ${product.store.storeName} | Kaiglo Nigeria`,
      description:
        product.productDescriptionSummary ||
        product.description?.slice(0, 160) ||
        `${product.name} in ${product.category}`,
      url: `${baseUrl}/product/${slug}/${productId}`,
      siteName: "Kaiglo Nigeria",
      images: [
        ...product.productViews.map((pv) => ({
          url: pv.productUrl,
          alt: `${product.name}`,
        })),
        ...previousImages,
      ],
      locale: "en_NG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${product.store.storeName} | Kaiglo Nigeria`,
      description:
        product.productDescriptionSummary ||
        product.description?.slice(0, 160) ||
        `${product.name} in ${product.category}`,
      images: [
        ...product.productViews.map((pv) => ({
          url: pv.productUrl,
          alt: `${product.name}`,
        })),
      ],
      site: "@KaigloNGR",
    },
    other: {
      "product:price:amount":
        product.productColors[0]?.productPriceDetails[0]?.price.toString(),
      "product:price:currency": "NGN",
      "product:availability": product.productStatus.status,
      "product:condition": "new",
      "product:store": product.store.storeName,
      "product:category": product.category,
      "product:sku":
        product.productColors[0]?.productPriceDetails[0]?.sku || "",
    },
    alternates: {
      canonical: productUrl,
    },
    robots: {
      index: !product.paused && !product.isDeleted,
      follow: !product.paused && !product.isDeleted,
      nocache: product.paused || product.isDeleted,
    },
    applicationName: "Kaiglo Nigeria",
    creator: product.store.storeName,
    publisher: "Kaiglo Nigeria",
    category: product.category,
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

const ProductDetailsIntroduction = dynamic(
  () => import("@/components/product/ProductDetailsIntroduction"),
  {
    ssr: false,
    loading: () => <ProductDetailsIntroductionSkeletonLoader />,
  },
);

const ProductStore = dynamic(
  () => import("@/components/product/ProductStore"),
  {
    ssr: false,
    loading: () => <ProductStoreSkeleton />,
  },
);

export default async function Product({
  params,
}: {
  params: { slug: string; productId: string };
}) {
  const { productId } = params;
  const { response } = await postRequest<
    { productId: string },
    IProductDetailResponse
  >({
    url: "/product/product-detail-v2",
    payload: { productId },
  });

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    {
      label: capitalizeFirstLetterOfEachWord(response.category),
      href: `/category/${response.category}`,
    },
    { label: capitalizeFirstLetterOfEachWord(response.subCategory) },
  ];

  return (
    <InnerPageLayout
      allowCTA
      breadcrumbItems={breadcrumbItems}
      productId={productId}
    >
      <div className="lg:space-y-5 space-y-1 lg:my-4 my-6">
        <ProductDetailsIntroduction productId={productId} />

        <div className="hidden lg:block">
          <ProductStore productId={productId} />
        </div>

        <ProductDescription productId={productId} />

        <ProductReviews productId={productId} />

        <div className="lg:hidden block">
          <ProductStore productId={productId} />
        </div>

        <div className="lg:mx-8 lg:rounded-2xl p-6 bg-white lg:space-y-8 space-y-4">
          <h2 className="lg:text-3xl font-medium">
            Seller’s Warranty + Return Policy
          </h2>
          <p>
            We offer free return within 7 days of purchase.{" "}
            <span className="text-kaiglo_info-base">Learn more</span>
          </p>
        </div>

        <RelatedProducts productId={productId} />
      </div>
    </InnerPageLayout>
  );
}
