import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import QueryClientProvider from "@/contexts/QueryClientProvider";
import { ToastProvider } from "@/contexts/ToastContext";
import { CartProvider } from "@/contexts/CartContext";
import { AuthModalProvider } from "@/contexts/AuthModalContext";

const gotham = localFont({
  src: [
    {
      path: "../fonts/Gotham-Thin.otf",
      weight: "100",
    },
    {
      path: "../fonts/Gotham-XLight.otf",
      weight: "200",
    },
    {
      path: "../fonts/Gotham-Light.otf",
      weight: "300",
    },
    {
      path: "../fonts/Gotham-Book.otf",
      weight: "400",
    },
    {
      path: "../fonts/Gotham-Medium.otf",
      weight: "500",
    },
    {
      path: "../fonts/Gotham-Bold.otf",
      weight: "700",
    },
    {
      path: "../fonts/Gotham-Black.otf",
      weight: "800",
    },
    {
      path: "../fonts/Gotham-Ultra.otf",
      weight: "900",
    },
  ],
});

export const metadata: Metadata = {
  title:
    "Kaiglo Nigeria | Online Shopping for Electronics, Fashion, Home, Beauty & Sport",
  description:
    "Kaiglo Nigeria the #1 of Online Shopping in Nigeria - Shop Online All Products : Smartphones, Appliances, Clothing... ✓ Top Brands :  Samsung, Xiaomi, Adidas... ✓ Best prices in Nigeria ✓ Order now and enjoy pay on delivery !",
  keywords:
    "online shopping, Nigeria, fashion, electronics, home appliances, gadgets, Kaiglo, daily deals, best prices, pay on delivery, group buy",
  authors: [{ name: "Kaiglo Nigeria", url: "https://kaiglo.com/about" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://kaiglo.com",
    siteName: "Kaiglo Nigeria",
    title:
      "Kaiglo Nigeria | Online Shopping for Electronics, Fashion, Home, Beauty & Sport",
    description:
      "Kaiglo Nigeria the #1 of Online Shopping in Nigeria - Shop Online All Products : Smartphones, Appliances, Clothing... ✓ Top Brands :  Samsung, Xiaomi, Adidas... ✓ Best prices in Nigeria ✓ Order now and enjoy pay on delivery !",
    images: [
      {
        url: "https://kg-s3-assets.s3.amazonaws.com/sidebanner/599412d4-3e59-442d-9435-f94fbd6aa7cb.jpeg",
        alt: "Kaiglo - Online Shopping in Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kaiglo",
    title: "Kaiglo Nigeria",
    description:
      "Kaiglo Nigeria the #1 of Online Shopping in Nigeria - Shop Online All Products : Smartphones, Appliances, Clothing... ✓ Top Brands :  Samsung, Xiaomi, Adidas... ✓ Best prices in Nigeria ✓ Order now and enjoy pay on delivery !",
    images: [
      "https://kg-s3-assets.s3.amazonaws.com/sidebanner/599412d4-3e59-442d-9435-f94fbd6aa7cb.jpeg",
    ],
  },
  icons: {
    icon: "/public/favicon/favicon.ico",
    apple: "/public/favicon/apple-touch-icon.png",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${gotham.className} bg-kaiglo_grey-100`}>
        <QueryClientProvider>
          <ToastProvider>
            <AuthModalProvider>
              <CartProvider>{children}</CartProvider>
            </AuthModalProvider>
          </ToastProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
