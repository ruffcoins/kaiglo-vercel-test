"use client";

import { ReactNode } from "react";
import DesktopHeader from "../shared/headers/DesktopHeader";
import Footer from "./Homepage/Footer";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const InnerPageLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const breadcrumbPaths = [
    { name: "Home", link: "/" },
    { name: "Women’s fashion", link: "/fashion" },
    { name: "Shoes", link: "/fashion/shoes" },
  ];

  return (
    <main className="w-screen overflow-hidden">
      <DesktopHeader />

      <div className="lg:hidden flex items-center justify-between border-b-2 border-kaiglo_grey-disabled py-4 px-5 bg-white">
        <ChevronLeftIcon className="w-6 h-6" onClick={() => router.back()} />
        <h1 className="text-xl font-medium text-center flex-1">
          Product details
        </h1>
        <div className="w-6 h-6"></div> {/* Placeholder to center the h1 */}
      </div>

      <nav className="p-4 bg-white text-sm font-medium">
        <ul className="flex space-x-2">
          {breadcrumbPaths.map((path, index) => (
            <li key={index}>
              {index > 0 && (
                <span className="text-kaiglo_grey-placeholder">/ </span>
              )}
              {index === breadcrumbPaths.length - 1 ? (
                <span className="">{path.name}</span>
              ) : (
                <Link
                  href={path.link}
                  className="text-kaiglo_grey-placeholder hover:underline"
                >
                  {path.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative lg:mt-40">{children}</div>

      <Footer allowCTA={true} />
    </main>
  );
};
export default InnerPageLayout;
