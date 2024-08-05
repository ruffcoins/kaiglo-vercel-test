"use client";

import { useRouter } from "next/navigation";
import DesktopHeader from "../shared/headers/DesktopHeader";
import Link from "next/link";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

interface CartLayoutProps {
  children: React.ReactNode;
}

const CartLayout = ({ children }: CartLayoutProps) => (
  <main className="w-screen overflow-hidden">
    <DesktopHeader />
    <MobileHeader />
    <div className="relative lg:mt-40">{children}</div>
  </main>
);

export default CartLayout;

const MobileHeader = () => (
  <div className="lg:hidden">
    <SimpleHeader />
    <Breadcrumbs />
  </div>
);

const SimpleHeader = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between border-b-2 border-gray-200 py-4 px-5 bg-white">
      <ChevronLeftIcon
        className="w-6 h-6 cursor-pointer"
        onClick={() => router.back()}
      />
      <h1 className="text-xl font-medium text-center flex-1">Cart</h1>
      <div className="w-6 h-6"></div> {/* Placeholder to center the h1 */}
    </div>
  );
};

const Breadcrumbs = () => {
  const breadcrumbPaths = [
    { name: "Home", link: "/" },
    { name: "Women’s fashion", link: "/fashion" },
    { name: "Shoes", link: "/fashion/shoes" },
  ];

  return (
    <nav className="p-4 bg-white text-sm font-medium">
      <ul className="flex space-x-2">
        {breadcrumbPaths.map((path, index) => (
          <li key={index}>
            {index > 0 && <span className="text-gray-400">/ </span>}
            {index === breadcrumbPaths.length - 1 ? (
              <span>{path.name}</span>
            ) : (
              <Link href={path.link} className="text-gray-400 hover:underline">
                {path.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
