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
  title: "Kaiglo - Your Online Marketplace",
  description:
    "Discover top-quality Women's & Men's Fashion, Phones, Electronics, Home Decor, Office Supplies & Beauty products at Kaiglo. Enjoy secure shopping, fast delivery, and unbeatable prices. Find everything you need at Kaiglo - Your trusted online marketplace.",
  keywords: "online shopping, marketplace, electronics, fashion, deals, Kaiglo",
  authors: [{ name: "Kaiglo Stores Limited", url: "https://kaiglo.com" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kaiglo.com",
    siteName: "Kaiglo",
    title: "Kaiglo - Your Trusted Online Marketplace",
    description:
      "Shop top-quality Fashion, Electronics, Home Decor & more. Secure shopping, fast delivery, unbeatable prices at Kaiglo.",
    images: [
      {
        url: "https://kg-s3-assets.s3.amazonaws.com/sidebanner/599412d4-3e59-442d-9435-f94fbd6aa7cb.jpeg",
        alt: "Kaiglo Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kaiglo",
    title: "Kaiglo - Your Trusted Online Marketplace",
    description:
      "Shop top-quality Fashion, Electronics, Home Decor & more. Secure shopping, fast delivery, unbeatable prices at Kaiglo.",
    images: [
      "https://kg-s3-assets.s3.amazonaws.com/sidebanner/599412d4-3e59-442d-9435-f94fbd6aa7cb.jpeg",
    ],
  },
  icons: {
    icon: "/public/favicon/favicon.ico",
    apple: "/public/favicon/apple-touch-icon.png",
  },
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
