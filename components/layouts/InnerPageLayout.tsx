"use client";

import { ReactNode } from "react";
import DesktopHeader from "../shared/headers/DesktopHeader";
import Footer from "./Homepage/Footer";
import { CaretLeftIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import Breadcrumb from "../shared/Breadcrumb";
import GlobalSearch from "../shared/headers/GlobalSearch";

const InnerPageLayout = ({
  children,
  allowCTA = false,
  breadcrumbItems,
  productId,
}: {
  children: ReactNode;
  allowCTA?: boolean;
  breadcrumbItems?: {
    label: string;
    href?: string | undefined;
  }[];
  productId?: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <main className="w-screen overflow-hidden">
      <DesktopHeader showCallToOrder={false} />

      <div className="lg:hidden fixed top-0 left-0 w-full z-10 flex items-center justify-between border-b-2 border-kaiglo_grey-disabled py-4 px-4 bg-white">
        {pathname.includes("/product") && (
          <>
            <ChevronLeftIcon
              className="w-6 h-6"
              onClick={() => router.back()}
            />
            {pathname === "/category" && (
              <h1 className="text-xl font-medium text-center flex-1">
                Category
              </h1>
            )}
            {pathname === "/product/featured" ? (
              <h1 className="text-xl font-medium text-center flex-1">
                Featured Sales
              </h1>
            ) : pathname === "/product/new-arrivals" ? (
              <h1 className="text-xl font-medium text-center flex-1">
                New Arrivals
              </h1>
            ) : pathname === "/product/group-buy" ? (
              <h1 className="text-xl font-medium text-center flex-1">
                Group Buy
              </h1>
            ) : pathname === "/product/top-selling" ? (
              <h1 className="text-xl font-medium text-center flex-1">
                Top Selling
              </h1>
            ) : (
              pathname.includes("/product") && (
                <h1 className="text-xl font-medium text-center flex-1">
                  Product details
                </h1>
              )
            )}
            <div className="w-6 h-6"></div> {/* Placeholder to center the h1 */}
          </>
        )}
        {pathname.includes("/category") && (
          <div className="lg:hidden w-full flex items-center space-x-2">
            <CaretLeftIcon className="w-7 h-7" onClick={() => router.back()} />
            <GlobalSearch />
          </div>
        )}
      </div>

      <div className="lg:hidden mt-16">
        {breadcrumbItems && <Breadcrumb items={breadcrumbItems} />}
      </div>

      <div className="relative lg:mt-40">{children}</div>

      <Footer allowCTA={allowCTA} productId={productId} />
    </main>
  );
};

export default InnerPageLayout;
